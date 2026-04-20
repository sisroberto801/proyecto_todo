<script setup lang="ts">

interface Project {
  id: number
  nombre: string
}

interface Props {
  searchQuery: string
  statusFilter: string
  priorityFilter: string
  projectFilter: string
  sortBy: string
  projects: Project[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:statusFilter': [value: string]
  'update:priorityFilter': [value: string]
  'update:projectFilter': [value: string]
  'update:sortBy': [value: string]
  'search': []
  'filter': []
  'sort': []
}>()

const handleSearch = () => {
  emit('search')
}

const handleFilter = () => {
  emit('filter')
}

const handleSort = () => {
  emit('sort')
}
</script>

<style scoped lang="scss">
.filters-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;

  .row {
    display: flex;
    gap: 1rem;
    margin: 0 -0.5rem;

    > div {
      padding: 0 0.5rem;
    }
  }
}

@media (max-width: 768px) {
  .filters-section .row {
    flex-direction: column;
    gap: 0;

    > div {
      margin-bottom: 1rem;
    }
  }
}
</style>

<template>
  <div class="filters-section">
    <div class="row">
      <div class="col-md-3">
        <input
            type="text"
            class="form-control"
            placeholder="Buscar tareas..."
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            @keyup.enter="handleSearch"
        >
      </div>
      <div class="col-md-2">
        <select class="form-select" :value="statusFilter"
                @change="$emit('update:statusFilter', $event.target.value); handleFilter()">
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En Progreso</option>
          <option value="completado">Completado</option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-select" :value="priorityFilter"
                @change="$emit('update:priorityFilter', $event.target.value); handleFilter()">
          <option value="">Todas las prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
      <div class="col-md-3">
        <select class="form-select" :value="projectFilter"
                @change="$emit('update:projectFilter', $event.target.value); handleFilter()">
          <option value="">Todos los proyectos</option>
          <option v-for="project in projects" :key="project.id" :value="project.id">
            {{ project.nombre }}
          </option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-select" :value="sortBy" @change="$emit('update:sortBy', $event.target.value); handleSort()">
          <option value="createdAt">Fecha de Creación</option>
          <option value="titulo">Título</option>
          <option value="prioridad">Prioridad</option>
        </select>
      </div>
    </div>
  </div>
</template>