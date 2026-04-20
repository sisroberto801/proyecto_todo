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

interface Props {
  task: Task
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'edit-task': [task: Task]
  'delete-task': [taskId: number]
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

const handleEdit = () => {
  emit('edit-task', props.task)
}

const handleDelete = () => {
  emit('delete-task', props.task.id)
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
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .task-title {
    flex: 1;

    h4 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
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

.task-content {
  padding: 1rem 1.5rem;

  p {
    margin: 0 0 0.5rem 0;
    color: #6c757d;
  }

  .task-meta {
    .date {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #6c757d;
      font-size: 0.875rem;
    }
  }
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;

  &.pendiente {
    background: #ffc107;
    color: #856404;
  }

  &.en_progreso {
    background: #17a2b8;
    color: white;
  }

  &.completado {
    background: #28a745;
    color: white;
  }
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;

  &.baja {
    background: #d4edda;
    color: #155724;
  }

  &.media {
    background: #fff3cd;
    color: #856404;
  }

  &.alta {
    background: #f8d7da;
    color: #721c24;
  }
}

@media (max-width: 768px) {
  .task-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
}
</style>

<template>
  <div class="task-card" :class="'priority-' + task.prioridad">
    <div class="task-header">
      <div class="task-title">
        <h4>{{ task.titulo }}</h4>
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
        <button class="btn btn-sm btn-outline-primary" @click="handleEdit">
          <i class="bi bi-pencil mb-2"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" @click="handleDelete">
          <i class="bi bi-trash mb-2"></i>
        </button>
      </div>
    </div>
    <div class="task-content">
      <p>{{ task.descripcion }}</p>
      <div class="task-meta">
        <span class="date">
          <i class="fas fa-calendar"></i>
          {{ formatDate(task.createdAt) }}
        </span>
      </div>
    </div>
  </div>
</template>