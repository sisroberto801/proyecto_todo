<template>
  <div class="task-list">
    <TaskHeader @create-task="showCreateModal = true" />

    <TaskFilters
      :search-query="searchQuery"
      :status-filter="statusFilter"
      :priority-filter="priorityFilter"
      :project-filter="projectFilter"
      :sort-by="sortBy"
      :projects="projects"
      @update:search-query="searchQuery = $event"
      @update:status-filter="statusFilter = $event"
      @update:priority-filter="priorityFilter = $event"
      @update:project-filter="projectFilter = $event"
      @update:sort-by="sortBy = $event"
      @search="searchTasks"
      @filter="filterTasks"
      @sort="sortTasks"
    />

    <TaskStats :stats="taskStats" />

    <div class="tasks-container" v-if="!loading && filteredTasks.length > 0">
      <TaskCard
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        :projects="projects"
        @view="viewTask"
        @edit="editTask"
        @delete="deleteTask"
      />
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-if="!loading && filteredTasks.length === 0" class="text-center py-5">
      <i class="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
      <h4>No se encontraron tareas</h4>
      <p class="text-muted">Intenta ajustar los filtros o crea una nueva tarea.</p>
    </div>

    <TaskModal 
      v-if="showCreateModal || showEditModal"
      :task="editingTask"
      :is-edit="showEditModal"
      @close="closeModal"
      @save="saveTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask as deleteTaskService,
  searchTasks as searchTasksService,
  getTasksByStatus,
  getTasksByPriority
} from '@/services/taskService'
import { getProjects } from '@/services/projectService'
import TaskModal from '@/components/task/TaskModal.vue'
import TaskHeader from '@/components/task/TaskHeader.vue'
import TaskFilters from '@/components/task/TaskFilters.vue'
import TaskStats from '@/components/task/TaskStats.vue'
import TaskCard from '@/components/task/TaskCard.vue'

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

interface Project {
  id: number
  nombre: string
}

const router = useRouter()

// Estado
const tasks = ref<Task[]>([])
const projects = ref<Project[]>([])
const loading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')
const projectFilter = ref('')
const sortBy = ref('createdAt')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingTask = ref<Task | null>(null)

// Computados
const filteredTasks = computed(() => {
  let filtered = [...tasks.value]
  
  // Aplicar filtro de búsqueda
  if (searchQuery.value) {
    filtered = filtered.filter(task => 
      task.titulo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.descripcion.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  // Aplicar filtro de estado
  if (statusFilter.value) {
    filtered = filtered.filter(task => task.estado === statusFilter.value)
  }
  
  // Aplicar filtro de prioridad
  if (priorityFilter.value) {
    filtered = filtered.filter(task => task.prioridad === priorityFilter.value)
  }
  
  // Aplicar filtro de proyecto
  if (projectFilter.value) {
    filtered = filtered.filter(task => task.proyectoId === Number(projectFilter.value))
  }
  
  // Aplicar ordenamiento
  filtered.sort((a, b) => {
    if (sortBy.value === 'titulo') {
      return a.titulo.localeCompare(b.titulo)
    } else if (sortBy.value === 'prioridad') {
      const priorityOrder: { [key: string]: number } = { alta: 3, media: 2, baja: 1 }
      return (priorityOrder[b.prioridad] || 0) - (priorityOrder[a.prioridad] || 0)
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })
  
  return filtered
})

const taskStats = computed(() => {
  const stats = {
    total: tasks.value.length,
    completed: tasks.value.filter(t => t.estado === 'completado').length,
    inProgress: tasks.value.filter(t => t.estado === 'en_progreso').length,
    pending: tasks.value.filter(t => t.estado === 'pendiente').length
  }
  return stats
})

// Métodos
const loadData = async () => {
  try {
    loading.value = true
    const [tasksData, projectsData] = await Promise.all([
      getTasks(),
      getProjects()
    ])
    tasks.value = tasksData
    projects.value = projectsData
  } catch (error) {
    console.error('Error al cargar datos:', error)
  } finally {
    loading.value = false
  }
}

const viewTask = (taskId: number) => {
  router.push(`/tarea/${taskId}`)
}

const editTask = (task: Task) => {
  editingTask.value = { ...task }
  showEditModal.value = true
}

const deleteTask = async (taskId: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
    try {
      await deleteTaskService(taskId)
      await loadData()
    } catch (error) {
      console.error('Error al eliminar tarea:', error)
    }
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingTask.value = null
}

const saveTask = async (taskData: Partial<Task>) => {
  try {
    if (showEditModal.value && editingTask.value) {
      await updateTask(editingTask.value.id, taskData)
    } else {
      await createTask(taskData)
    }
    await loadData()
    closeModal()
  } catch (error) {
    console.error('Error al guardar tarea:', error)
  }
}

const searchTasks = () => {
  // La búsqueda se maneja con el computado
}

const filterTasks = () => {
  // Los filtros se manejan con el computado
}

const sortTasks = () => {
  // El ordenamiento se maneja con el computado
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
.task-list {
  padding: 2rem 0;
}

.tasks-container {
  display: grid;
  gap: 1rem;
}
</style>
