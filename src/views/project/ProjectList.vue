<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {
  createProject,
  deleteProject as deleteProjectService,
  getProjects,
  updateProject
} from '@/services/projectService.js'
import {getTasksByProject} from '@/services/taskService.js'
import ProjectModal from '@/components/project/management/ProjectModal.vue'
import ProjectFilters from '@/components/project/management/ProjectFilters.vue'
import ProjectCard from '@/components/project/management/ProjectCard.vue'

interface Project {
  id: number
  nombre: string
  descripcion: string
  estado: string
  fechaLimite: string
  userId: number
  createdAt: string
}

const router = useRouter()

const projects = ref<Project[]>([])
const filteredProjectsFromService = ref<Project[]>([])
const taskCounts = ref<{ [key: number]: number }>({})
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingProject = ref<Project | null>(null)

const filteredProjects = computed(() => {
  let baseProjects: Project[]

  if (statusFilter.value) {
    baseProjects = [...filteredProjectsFromService.value]
  } else {
    baseProjects = [...projects.value]
  }

  if (searchQuery.value) {
    baseProjects = baseProjects.filter(project =>
        project.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.descripcion.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  baseProjects.sort((a, b) => {
    if (sortBy.value === 'nombre') {
      return a.nombre.localeCompare(b.nombre)
    } else if (sortBy.value === 'fechaLimite') {
      return new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime()
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return baseProjects
})

const loadProjects = async () => {
  try {
    loading.value = true
    projects.value = await getProjects()

    for (const project of projects.value) {
      try {
        const tasks = await getTasksByProject(project.id)
        taskCounts.value[project.id] = tasks.length
      } catch (error) {
        console.error(`Error al cargar tareas del proyecto ${project.id}:`, error)
        taskCounts.value[project.id] = 0
      }
    }
  } catch (error) {
    console.error('Error al cargar proyectos:', error)
  } finally {
    loading.value = false
  }
}

const getTaskCount = (projectId: number) => {
  return taskCounts.value[projectId] || 0
}

const handleProjectsFiltered = async (filteredProjects: Project[]) => {
  filteredProjectsFromService.value = filteredProjects

  if (filteredProjects.length > 0) {
    for (const project of filteredProjects) {
      if (!(project.id in taskCounts.value)) {
        try {
          const tasks = await getTasksByProject(project.id)
          taskCounts.value[project.id] = tasks.length
        } catch (error) {
          console.error(`Error al cargar tareas del proyecto ${project.id}:`, error)
          taskCounts.value[project.id] = 0
        }
      }
    }
  }
}


const viewProject = (projectId: number) => {
  router.push(`/proyecto/${projectId}`)
}

const editProject = (project: Project) => {
  editingProject.value = {...project}
  showEditModal.value = true
}

const deleteProject = async (projectId: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
    try {
      await deleteProjectService(projectId)
      await loadProjects()
    } catch (error) {
      console.error('Error al eliminar proyecto:', error)
    }
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingProject.value = null
}

const saveProject = async (projectData: Partial<Project>) => {
  try {
    if (showEditModal.value && editingProject.value) {
      await updateProject(editingProject.value.id, projectData)
    } else {
      await createProject(projectData)
    }
    await loadProjects()
    closeModal()
  } catch (error) {
    console.error('Error al guardar proyecto:', error)
  }
}


onMounted(() => {
  loadProjects()
})
</script>

<style scoped lang="scss">
.project-list {
  padding: 2rem 0;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    margin: 0;
    color: #2c3e50;
  }

  .mb-2 {
    margin-right: .5rem;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;

    .btn {
      width: 100%;
    }
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<template>
  <div class="project-list">
    <div class="header-section">
      <h1>Gestión de Proyectos</h1>
      <button class="btn btn-primary" @click="showCreateModal = true">
        <i class="bi bi-plus-circle-fill mb-2"></i>Nuevo Proyecto
      </button>
    </div>

    <ProjectFilters
        v-model:searchQuery="searchQuery"
        v-model:statusFilter="statusFilter"
        v-model:sortBy="sortBy"
        @projectsFiltered="handleProjectsFiltered">
    </ProjectFilters>

    <div class="projects-grid" v-if="!loading && filteredProjects.length > 0">
      <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          :task-count="getTaskCount(project.id)"
          @view="viewProject"
          @edit="editProject"
          @delete="deleteProject">
      </ProjectCard>
    </div>

    <div v-if="!loading && filteredProjects.length === 0" class="text-center py-5">
      <i class="fas fa-folder-open fa-3x text-muted mb-3"></i>
      <h4>No se encontraron proyectos</h4>
      <p class="text-muted">Intenta ajustar los filtros o crea un nuevo proyecto.</p>
    </div>

  </div>

  <ProjectModal
      v-if="showCreateModal || showEditModal"
      :project="editingProject"
      :is-edit="showEditModal"
      @close="closeModal"
      @save="saveProject">
  </ProjectModal>
</template>