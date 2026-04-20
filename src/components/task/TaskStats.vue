<script setup lang="ts">
interface TaskStats {
  total: number
  completed: number
  inProgress: number
  pending: number
}

interface Props {
  stats: TaskStats
}

defineProps<Props>()
</script>

<template>
  <div class="stats-section">
    <div class="stat-card">
      <div class="stat-number">{{ stats.total }}</div>
      <div class="stat-label">Total Tareas</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ stats.completed }}</div>
      <div class="stat-label">Completadas</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ stats.inProgress }}</div>
      <div class="stat-label">En Progreso</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">{{ stats.pending }}</div>
      <div class="stat-label">Pendientes</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: center;

    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #28a745;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #6c757d;
      font-size: 0.875rem;
    }
  }
}

@media (max-width: 768px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
