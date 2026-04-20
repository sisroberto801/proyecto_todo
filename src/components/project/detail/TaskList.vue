<script setup lang="ts">
import TaskCard from './TaskCard.vue'

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
  tasks: Task[]
  currentFilter: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'edit-task': [task: Task]
  'delete-task': [taskId: number]
  'new-task': []
}>()

</script>

<style scoped lang="scss">
.tasks-section {
  .tasks-list {
    display: grid;
    gap: 1rem;
  }
}

.no-tasks {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .mb-2 {
    margin-right: .5rem;
  }
}
</style>

<template>
  <div class="tasks-section">
    <div v-if="tasks.length > 0" class="tasks-list">
      <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @edit-task="$emit('edit-task', $event)"
          @delete-task="$emit('delete-task', $event)"
      />
    </div>

    <div v-else class="no-tasks">
      <i class="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
      <h4>No hay tareas</h4>
      <p class="text-muted">
        {{
          currentFilter === 'all'
              ? 'Este proyecto aún no tiene tareas. ¡Crea la primera!'
              : 'No hay tareas con este estado.'
        }}
      </p>
      <button v-if="currentFilter === 'all'" class="btn btn-primary" @click="$emit('new-task')">
        <i class="bi bi-plus-circle-fill mb-2"></i>Crear Primera Tarea
      </button>
    </div>
  </div>
</template>