<script setup lang="ts">
interface Project {
  id: number
  nombre: string
  descripcion: string
  estado: string
  fechaLimite: string
  userId: number
  createdAt: string
}

interface Props {
  project: Project
  taskCount?: number
}

defineProps<Props>()

defineEmits<{
  view: [id: number]
  edit: [project: Project]
  delete: [id: number]
}>()

const formatStatus = (status: string) => {
  const statusMap: { [key: string]: string } = {
    'pendiente': 'Pendiente',
    'en_progreso': 'En Progreso',
    'completado': 'Completado'
  }
  return statusMap[status] || status
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}
</script>

<style scoped lang="scss">
.project-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
}

.card-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.25rem;
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

.card-body {
  padding: 1.5rem;

  .description {
    color: #6c757d;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
}

.project-info {
  .info-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    color: #6c757d;
    font-size: 0.875rem;

    i {
      margin-right: 0.5rem;
      width: 20px;
    }
  }
}

.card-actions {
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;

  .btn {
    padding: 0.375rem 0.75rem;
  }

  .mb-2 {
    margin-right: .3rem;
  }
}
</style>

<template>
  <div class="project-card">
    <div class="card-header">
      <h3>{{ project.nombre }}</h3>
      <span :class="'status-badge ' + project.estado">
        {{ formatStatus(project.estado) }}
      </span>
    </div>

    <div class="card-body">
      <p class="description">{{ project.descripcion }}</p>

      <div class="project-info">
        <div class="info-item">
          <i class="fas fa-calendar"></i>
          <span>Fecha límite: {{ formatDate(project.fechaLimite) }}</span>
        </div>
        <div class="info-item">
          <i class="fas fa-tasks"></i>
          <span>{{ taskCount }} tareas</span>
        </div>
      </div>
    </div>

    <div class="card-actions">
      <button class="btn btn-sm btn-info" @click="$emit('view', project.id)">
        <i class="bi bi-eye mb-2"></i>Ir a Tareas
      </button>
      <button class="btn btn-sm btn-warning" @click="$emit('edit', project)">
        <i class="bi bi-pencil mb-2"></i>Editar
      </button>
      <button class="btn btn-sm btn-danger" @click="$emit('delete', project.id)">
        <i class="bi bi-trash mb-2"></i>Eliminar
      </button>
    </div>
  </div>
</template>