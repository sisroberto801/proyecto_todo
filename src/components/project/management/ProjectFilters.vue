<script setup lang="ts">
import {ref} from 'vue'
import {getProjects, searchProjectsByStatusAndQuery} from '@/services/projectService.js'

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
  searchQuery: string
  statusFilter: string
  sortBy: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:statusFilter': [value: string]
  'update:sortBy': [value: string]
  'projectsFiltered': [projects: Project[]]
  'search': []
  'reset': []
}>()

const loading = ref(false)

const localSearchQuery = ref(props.searchQuery)
const localStatusFilter = ref(props.statusFilter)
const localSortBy = ref(props.sortBy)

const handleSearch = async () => {
  try {
    loading.value = true
    emit('search')

    emit('update:searchQuery', localSearchQuery.value)
    emit('update:statusFilter', localStatusFilter.value)
    emit('update:sortBy', localSortBy.value)

    if (!localStatusFilter.value && !localSearchQuery.value.trim()) {
      const projects = await getProjects()
      emit('projectsFiltered', projects)
    } else {
      const projects = await searchProjectsByStatusAndQuery(
          localStatusFilter.value,
          localSearchQuery.value,
          localSortBy.value
      )
      emit('projectsFiltered', projects)
    }
  } catch (error) {
    console.error('Error al buscar proyectos:', error)
    emit('projectsFiltered', [])
  } finally {
    loading.value = false
  }
}

const handleReset = async () => {
  try {
    loading.value = true
    emit('reset')

    localSearchQuery.value = ''
    localStatusFilter.value = ''
    localSortBy.value = ''

    emit('update:searchQuery', '')
    emit('update:statusFilter', '')
    emit('update:sortBy', '')

    const projects = await getProjects()
    emit('projectsFiltered', projects)
  } catch (error) {
    console.error('Error al cargar todos los proyectos:', error)
    emit('projectsFiltered', [])
  } finally {
    loading.value = false
  }
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
    margin: 0 -0.5rem;
    align-items: end;

    > div {
      padding: 0 0.5rem;
    }
  }

  .btn {
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
  }

  .btn-icon {
    padding: 0.375rem;
    width: 38px;

    i {
      font-size: 14px;
    }
  }
}

@media (max-width: 992px) {
  .filters-section .row {
    flex-wrap: wrap;
    gap: 1rem;
    margin: 0;

    > div {
      padding: 0;
      flex: 1 1 calc(50% - 0.5rem);
      min-width: 250px;
    }

    > div:last-child {
      flex: 1 1 100%;
      min-width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .filters-section .row {
    flex-direction: column;
    gap: 1rem;
    margin: 0;

    > div {
      margin-bottom: 0;
      padding: 0;
      flex: 1 1 100%;
      min-width: 100%;
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
            placeholder="Buscar proyectos..."
            v-model="localSearchQuery">
      </div>
      <div class="col-md-3">
        <select
            class="form-select"
            v-model="localStatusFilter"
            :disabled="loading">
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En Progreso</option>
          <option value="completado">Completado</option>
        </select>
        <small v-if="loading" class="text-muted">Cargando...</small>
      </div>
      <div class="col-md-3">
        <select class="form-select" v-model="localSortBy" :disabled="loading">
          <option value="">Ordenar por</option>
          <option value="createdAt">Fecha de Creación</option>
          <option value="fechaLimite">Fecha Límite</option>
          <option value="nombre">Nombre</option>
        </select>
      </div>
      <div class="col-md-3">
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-secondary flex-fill" @click="handleReset" :disabled="loading">
            <i class="bi bi-arrow-clockwise"></i>Reset
          </button>
          <button type="button" class="btn btn-primary flex-fill" @click="handleSearch"
                  :disabled="loading">
            <i class="bi bi-search"></i>Buscar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>