<script setup lang="ts">
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

interface Props {
  task: Task
  projects: Project[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  view: [taskId: number]
  edit: [task: Task]
  delete: [taskId: number]
}>()

const formatStatus = (status: string) => {
  const statusMap: { [key: string]: string } = {
    'pendiente': 'Pendiente',
    'en_progreso': 'En Progreso',
    'completado': 'Completado'
  }
  return statusMap[status] || status
}

const formatPriority = (priority: string) => {
  const priorityMap: { [key: string]: string } = {
    'baja': 'Baja',
    'media': 'Media',
    'alta': 'Alta'
  }
  return priorityMap[priority] || priority
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}

const getProjectName = (projectId: number) => {
  const project = props.projects.find(p => p.id === projectId)
  return project ? project.nombre : 'Sin proyecto'
}

const getUserName = (userId: number) => {
  const userMap: { [key: number]: string } = {
    1: 'Sergio',
    2: 'Pedro Arze'
  }
  return userMap[userId] || 'Sin asignar'
}

const handleView = () => {
  emit('view', props.task.id)
}

const handleEdit = () => {
  emit('edit', props.task)
}

const handleDelete = () => {
  emit('delete', props.task.id)
}
</script>

<style scoped lang="scss">
.task-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &.priority-alta {
    border-left: 4px solid #dc3545;
  }

  &.priority-media {
    border-left: 4px solid #ffc107;
  }

  &.priority-baja {
    border-left: 4px solid #28a745;
  }
}

.task-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .task-info {
    flex: 1;

    h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
    }

    .task-badges {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
  }

  .task-actions {
    display: flex;
    gap: 0.5rem;
  }
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;

  &.alta {
    background: #dc3545;
    color: white;
  }

  &.media {
    background: #ffc107;
    color: #856404;
  }

  &.baja {
    background: #28a745;
    color: white;
  }
}

.task-body {
  padding: 1.5rem;

  .description {
    color: #6c757d;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
}

.task-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #6c757d;
    font-size: 0.875rem;

    i {
      width: 16px;
    }
  }
}

@media (max-width: 768px) {
  .task-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;

    .task-actions {
      justify-content: flex-end;
    }
  }

  .task-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

<template>
  <div
      class="task-card"
      :class="'priority-' + task.prioridad"
  >
    <div class="task-header">
      <div class="task-info">
        <h3>{{ task.titulo }}</h3>
        <div class="task-badges">
          <span :class="'status-badge ' + task.estado">
            {{ formatStatus(task.estado) }}
          </span>
          <span :class="'priority-badge ' + task.prioridad">
            {{ formatPriority(task.prioridad) }}
          </span>
        </div>
      </div>
      <div class="task-actions">
        <button class="btn btn-sm btn-info" @click="handleView">
          <i class="fas fa-eye"></i> Ver
        </button>
        <button class="btn btn-sm btn-warning" @click="handleEdit">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn btn-sm btn-danger" @click="handleDelete">
          <i class="fas fa-trash"></i> Eliminar
        </button>
      </div>
    </div>

    <div class="task-body">
      <p class="description">{{ task.descripcion }}</p>

      <div class="task-meta">
        <div class="meta-item">
          <i class="fas fa-project-diagram"></i>
          <span>{{ getProjectName(task.proyectoId) }}</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-calendar"></i>
          <span>{{ formatDate(task.createdAt) }}</span>
        </div>
        <div class="meta-item">
          <i class="fas fa-user"></i>
          <span>{{ getUserName(task.userId) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>