// src/services/noteService.js
import api from './api';

// Obtener notas por usuario
export const getNotes = (userId) => {
    return api.get('/notes', {
        params: { userId }
    });
};

// Crear nota
export const createNote = (note) => {
    return api.post('/notes', note);
};

// Actualizar nota
export const updateNote = (id, note) => {
    return api.put(`/notes/${id}`, note);
};

// Eliminar nota
export const deleteNote = (id) => {
    return api.delete(`/notes/${id}`);
};