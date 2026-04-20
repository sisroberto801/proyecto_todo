<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {getUsers} from '@/services/userService.js'

interface Project {
  id?: number
  nombre: string
  descripcion: string
  estado: string
  fechaLimite: string
  userId?: number
  createdAt?: string
}

interface Props {
  project?: Project | null
  isEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  project: null,
  isEdit: false
})

const emit = defineEmits<{
  close: []
  save: [projectData: Partial<Project>]
}>()

const formData = ref<Partial<Project>>({
  nombre: '',
  descripcion: '',
  estado: '',
  fechaLimite: '',
  userId: undefined
})

const isSubmitting = ref(false)
const users = ref([])

const loadUsers = async () => {
  try {
    users.value = await getUsers()
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const handleSubmit = async () => {
  if (!formData.value.nombre || !formData.value.descripcion || !formData.value.estado || !formData.value.fechaLimite) {
    alert('Por favor, completa todos los campos obligatorios')
    return
  }

  isSubmitting.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 500))

    emit('save', {
      ...formData.value,
      userId: formData.value.userId || 1
    })
  } catch (error) {
    console.error('Error al guardar proyecto:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadUsers()
  if (props.project) {
    formData.value = {...props.project}
  }
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px 12px 0 0;

  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .btn-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.modal-body {
  padding: 1.5rem;

  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #495057;
    }

    .form-control,
    .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ced4da;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }
    }

    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }
  }

  .row {
    display: flex;
    gap: 1rem;
    margin: 0 -0.5rem;

    .col-md-6 {
      flex: 1;
      padding: 0 0.5rem;
    }
  }
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: #f8f9fa;
  border-radius: 0 0 12px 12px;

  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .btn-secondary {
    background: #6c757d;
    color: white;

    &:hover:not(:disabled) {
      background: #5a6268;
    }
  }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  }
}

@media (max-width: 768px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-content {
    max-height: 95vh;
  }

  .modal-body .row {
    flex-direction: column;
    gap: 0;

    .col-md-6 {
      padding: 0;
    }
  }

  .modal-footer {
    flex-direction: column;

    .btn {
      width: 100%;
    }
  }
}
</style>

<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ isEdit ? 'Editar Proyecto' : 'Nuevo Proyecto' }}</h2>
        <button class="btn-close" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label for="nombre">Nombre del Proyecto *</label>
          <input
              type="text"
              id="nombre"
              class="form-control"
              v-model="formData.nombre"
              required
              placeholder="Ej: Sistema de Gestión">
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción *</label>
          <textarea
              id="descripcion"
              class="form-control"
              v-model="formData.descripcion"
              required
              rows="3"
              placeholder="Describe el proyecto detalladamente">
          </textarea>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="estado">Estado *</label>
              <select id="estado" class="form-select" v-model="formData.estado" required>
                <option value="">Selecciona un estado</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En Progreso</option>
                <option value="completado">Completado</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="fechaLimite">Fecha Límite *</label>
              <input
                  type="date"
                  id="fechaLimite"
                  class="form-control"
                  v-model="formData.fechaLimite"
                  required
                  :min="today">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="userId">Usuario Asignado</label>
          <select id="userId" class="form-select" v-model="formData.userId" required>
            <option value="">Sin asignar</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
      </form>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="$emit('close')">
          Cancelar
        </button>
        <button type="button" class="btn btn-primary" @click="handleSubmit" :disabled="isSubmitting">
          <span v-if="isSubmitting">
            <i class="fas fa-spinner fa-spin"></i> Guardando...
          </span>
          <span v-else>
            <i class="fas fa-save"></i> {{ isEdit ? 'Actualizar' : 'Crear' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>