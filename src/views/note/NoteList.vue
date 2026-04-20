<script setup>
    import BaseModal from '@/components/BaseModal.vue';
    import {ref, onMounted} from 'vue';
    import api from '@/services/api';
    import NoteNew from './NoteNew.vue';
    import NoteEdit from './NoteEdit.vue';

    const newModal = ref(false);
    const editModal = ref(false);

    const items = ref([]);
    const textToSearch = ref('');
    const filterOptions = [
        {label: 'completado', value: true},
        {label: 'no completado', value: false},
    ];
    const filterOptionSelected = ref('');

    const load = async () => {

        let filter = '';
        if(filterOptionSelected.value !== ''){
            filter = `&completed=${filterOptionSelected.value}`
        }

        const res = await api.get(`/notes?_expand=user${filter}&q=${textToSearch.value}`);
        items.value = res.data;
    };

    const itemSelected = ref(null);

    const showEditModal = (item) => {
        itemSelected.value = {...item};
        editModal.value = true;
    };

    const onNew = (item) => {
        newModal.value = false;
        load();
    };

    const onEdit = (item) => {
        editModal.value = false;
        load();
    };

    const deleteItem = async (item) => {
        if (confirm("¿Está seguro de eliminar este ítem?")) {
            const res = await api.delete(`/notes/${item.id}`);
            await load();
            alert('Ítem eliminado correctamente.');
        }
    };

    const search = async () => {
        await load();
    };

    const filter = async () => {
        await load();
    };

    onMounted(async () => {
        await load();
    });

</script>

<template>

    <BaseModal v-model="newModal">
        <h4>Nuevo Usuario</h4>
        <NoteNew
                @onSave="onNew($event)"
        ></NoteNew>
    </BaseModal>

    <BaseModal v-model="editModal">
        <h4>Editar Usuario</h4>
        <NoteEdit
                :item="itemSelected"
                @onSave="onEdit($event)"
        ></NoteEdit>
    </BaseModal>


    <div>
        Lista de notas
        <br><br>
        <button @click="newModal = true" class="btn btn-primary btn-sm">Nuevo</button>
        <br>
    </div>
    <div style="margin: 20px 0">
        <form @submit.prevent="search()">
            <div class="input-group">
                <input
                        type="search"
                        v-model="textToSearch"
                        placeholder="Buscar por título o contenido "
                        class="form-control"
                >
                <button type="submit" class="btn btn-primary btn-sm">Buscar</button>
            </div>
        </form>
    </div>
    <div style="margin: 20px 0">
        <form @submit.prevent="filter()">
            <div class="input-group">
                <select v-model="filterOptionSelected" class="form-control" >
                    <option value="">Filtrar por completado</option>
                    <option :value="option.value" v-for="option in filterOptions">{{option.label}}</option>
                </select>
                <button type="submit" class="btn btn-primary btn-sm">Filtrar</button>
            </div>
        </form>
    </div>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Título</th>
                <th scope="col">Contenido</th>
                <th scope="col">Completado</th>
                <th scope="col">Creado el</th>
                <th scope="col">Propietario</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in items">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.content }}</td>
                <td>{{ item.completed ? 'Si' : 'No' }}</td>
                <td>{{ item.createdAt }}</td>
                <td>{{ item?.user?.name }}</td>
                <td>
                    <button class="btn btn-primary btn-sm" @click="showEditModal(item)">editar</button>
                    <button class="btn btn-danger btn-sm" @click="deleteItem(item)">eliminar</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    button {
        margin-right: 10px;
    }
</style>