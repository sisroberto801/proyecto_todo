<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {getProjectById} from '@/services/projectService.js'
import {
  createTask,
  deleteTask as deleteTaskService,
  getTaskCountersByProject,
  getTasksByProject,
  updateTask
} from '@/services/taskService.js'
import TaskModal from '@/components/task/TaskModal.vue'
import ProjectHeader from '@/components/project/detail/ProjectHeader.vue'
import TaskFilters from '@/components/project/detail/TaskFilters.vue'
import TaskList from '@/components/project/detail/TaskList.vue'

interface Project {
  id: number
  nombre: string
  descripcion: string
  estado: string
  fechaLimite: string
  userId: number
  createdAt: string
}

interface Task {
  id: number
  titulo: string
  descripcion: string
  estado: string
  prioridad: string
  proyectoId: number
  userId: number
  createdAt: string
}

interface TaskStats {
  total: number
  completed: number
  inProgress: number
  pending: number
}

const router = useRouter()
const route = useRoute()

// Estado
const project = ref<Project | null>(null)
const tasks = ref<Task[]>([])
const loading = ref(true)
const taskFilter = ref('all')
const showTaskModal = ref(false)
const editingTask = ref<Task | null>(null)

const filteredTasks = computed(() => {
  if (taskFilter.value === 'all') {
    return tasks.value
  }
  return tasks.value.filter(task => task.estado === taskFilter.value)
})

const taskStats = ref<TaskStats>({
  total: 0,
  completed: 0,
  inProgress: 0,
  pending: 0
})

// Métodos
const loadProject = async () => {
  try {
    const projectId = Number(route.params.id)
    project.value = await getProjectById(projectId)
    await loadTasks(projectId)
  } catch (error) {
    console.error('Error al cargar proyecto:', error)
    router.push('/proyectos')
  } finally {
    loading.value = false
  }
}

const loadTasks = async (projectId: number) => {
  try {
    tasks.value = await getTasksByProject(projectId)
    taskStats.value = await getTaskCountersByProject(projectId)
  } catch (error) {
    console.error('Error al cargar tareas:', error)
  }
}


const goBack = () => {
  router.push('/proyectos')
}

const editTask = (task: Task) => {
  editingTask.value = {...task}
  showTaskModal.value = true
}

const deleteTask = async (taskId: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
    try {
      await deleteTaskService(taskId)
      await loadTasks(project.value!.id)
    } catch (error) {
      console.error('Error al eliminar tarea:', error)
    }
  }
}

const closeTaskModal = () => {
  showTaskModal.value = false
  editingTask.value = null
}

const updateTasks = (updatedTasks: Task[]) => {
  tasks.value = updatedTasks
}

const saveTask = async (taskData: Partial<Task>) => {
  try {
    if (editingTask.value) {
      await updateTask(editingTask.value.id, taskData)
    } else {
      await createTask(taskData)
    }
    await loadTasks(project.value!.id)
    closeTaskModal()
  } catch (error) {
    console.error('Error al guardar tarea:', error)
  }
}

onMounted(() => {
  loadProject()
})
</script>

<style scoped lang="scss">
.project-detail {
  padding: 2rem 0;
}

.project-container {
  max-width: 1200px;
  margin: 0 auto;
}

.project-description {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h2 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
  }

  p {
    margin: 0;
    line-height: 1.6;
    color: #6c757d;
  }
}
</style>

<template>
  <div class="project-detail">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="project" class="project-container">
      <ProjectHeader
          :project="project"
          @go-back="goBack">
      </ProjectHeader>

      <div class="project-description">
        <h2>Descripción</h2>
        <p>{{ project.descripcion }}</p>
      </div>

      <TaskFilters
          :task-stats="taskStats"
          :current-filter="taskFilter"
          :project-id="project.id"
          @filter-change="taskFilter = $event"
          @tasks-updated="updateTasks"
          @new-task="showTaskModal = true">
      </TaskFilters>

      <TaskList
          :tasks="filteredTasks"
          :current-filter="taskFilter"
          @edit-task="editTask"
          @delete-task="deleteTask"
          @new-task="showTaskModal = true">
      </TaskList>
    </div>

    <TaskModal
        v-if="showTaskModal"
        :task="editingTask"
        :project-id="project?.id"
        :is-edit="!!editingTask"
        @close="closeTaskModal"
        @save="saveTask"
    />
  </div>
</template>