<script setup lang="ts">
interface Props {
  onCreateTask: () => void
}

defineProps<Props>()

const emit = defineEmits<{
  createTask: []
}>()

const handleCreateTask = () => {
  emit('createTask')
}
</script>

<style scoped lang="scss">
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    margin: 0;
    color: #2c3e50;
  }
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
}
</style>

<template>
  <div class="header-section">
    <h1>Gestión de Tareas</h1>
    <button class="btn btn-primary" @click="handleCreateTask">
      <i class="fas fa-plus"></i> Nueva Tarea
    </button>
  </div>
</template>