<script setup lang="ts">
import {getTasksByProject, getTasksByProjectAndStatus} from '@/services/taskService.js'

interface TaskStats {
  total: number
  completed: number
  inProgress: number
  pending: number
}

interface Props {
  taskStats: TaskStats
  currentFilter: string
  projectId: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'filter-change': [filter: string]
  'tasks-updated': [tasks: any[]]
  'new-task': []
}>()

const handleFilterClick = async (filter: string) => {
  try {
    let tasks = []

    if (filter === 'all') {
      tasks = await getTasksByProject(props.projectId)
    } else {
      tasks = await getTasksByProjectAndStatus(props.projectId, filter)
    }
    emit('tasks-updated', tasks)
    emit('filter-change', filter)
  } catch (error) {
    console.error('Error al cargar tareas:', error)
    emit('tasks-updated', [])
  }
}
</script>

<style scoped lang="scss">
.task-filters {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    color: #2c3e50;
  }

  .filter-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .filter-buttons-container {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .task-button-container {
    display: flex;
    justify-content: flex-end;

    .mb-2 {
      margin-right: .5rem;
    }
  }
}

@media (max-width: 768px) {
  .task-filters .filter-buttons {
    flex-direction: column;
  }
}
</style>

<template>
  <div class="task-filters">
    <h3>Tareas del Proyecto</h3>
    <div class="filter-buttons">
      <div class="filter-buttons-container">
        <button
            class="btn"
            :class="currentFilter === 'all' ? 'btn-primary' : 'btn-outline-secondary'"
            @click="handleFilterClick('all')">
          Todas ({{ taskStats.total }})
        </button>
        <button
            class="btn"
            :class="currentFilter === 'pendiente' ? 'btn-warning' : 'btn-outline-secondary'"
            @click="handleFilterClick('pendiente')">
          Pendientes ({{ taskStats.pending }})
        </button>
        <button
            class="btn"
            :class="currentFilter === 'en_progreso' ? 'btn-info' : 'btn-outline-secondary'"
            @click="handleFilterClick('en_progreso')">
          En Progreso ({{ taskStats.inProgress }})
        </button>
        <button
            class="btn"
            :class="currentFilter === 'completado' ? 'btn-success' : 'btn-outline-secondary'"
            @click="handleFilterClick('completado')">
          Completadas ({{ taskStats.completed }})
        </button>
      </div>
      <div class="task-button-container">
        <button class="btn btn-primary" @click="$emit('new-task')">
          <i class="bi bi-plus-circle-fill mb-2"></i>Nueva Tarea
        </button>
      </div>
    </div>
  </div>
</template>