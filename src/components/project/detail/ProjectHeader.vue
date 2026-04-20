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
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'go-back': []
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
.project-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    .mb-2 {
      margin-right: .5rem;
    }
  }

  .project-info {
    flex: 1;

    h1 {
      margin: 0 0 0.5rem 0;
      font-size: 2rem;
    }

    .project-meta {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      align-items: center;

      .date-info {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        opacity: 0.9;
      }
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

@media (max-width: 768px) {
  .project-header .header-content {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>

<template>
  <div class="project-header">
    <div class="header-content">
      <button type="button" class="btn btn-secondary" @click="$emit('go-back')">
        <i class="bi bi-arrow-left mb-2"></i>Volver
      </button>

      <div class="project-info">
        <h1>{{ project.nombre }}</h1>
        <div class="project-meta">
          <span :class="'status-badge ' + project.estado">
            {{ formatStatus(project.estado) }}
          </span>
          <span class="date-info">
            <i class="fas fa-calendar"></i>
            Creado: {{ formatDate(project.createdAt) }}
          </span>
          <span class="date-info">
            <i class="fas fa-clock"></i>
            Límite: {{ formatDate(project.fechaLimite) }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>