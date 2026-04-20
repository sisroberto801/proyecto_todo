import api from './api';

export const getTasks = async () => {
  const res = await api.get('/tasks');
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
};

export const getTasksByUser = async (userId) => {
  const res = await api.get('/tasks', {
    params: {userId}
  });
  return res.data;
};

export const getTasksByProject = async (proyectoId) => {
  const res = await api.get('/tasks', {
    params: {proyectoId}
  });
  return res.data;
};

export const createTask = async (taskData) => {
  const res = await api.post('/tasks', {
    ...taskData,
    createdAt: new Date().toISOString().split('T')[0]
  });
  return res.data;
};

export const updateTask = async (id, taskData) => {
  const res = await api.put(`/tasks/${id}`, taskData);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};

export const getTasksByStatus = async (status) => {
  const res = await api.get('/tasks', {
    params: {estado: status}
  });
  return res.data;
};

export const getTasksByPriority = async (priority) => {
  const res = await api.get('/tasks', {
    params: {prioridad: priority}
  });
  return res.data;
};

export const searchTasks = async (query) => {
  const res = await api.get('/tasks', {
    params: {q: query}
  });
  return res.data;
};

export const getTasksByProjectAndStatus = async (proyectoId, status) => {
  const res = await api.get('/tasks', {
    params: {proyectoId, estado: status}
  });
  return res.data;
};

export const getTaskCountersByProject = async (projectId) => {
  const tasks = await getTasksByProject(projectId);
  const counters = {
    total: tasks.length,
    completed: 0,
    inProgress: 0,
    pending: 0
  };

  tasks.forEach(task => {
    switch (task.estado) {
      case 'completado':
        counters.completed++;
        break;
      case 'en_progreso':
        counters.inProgress++;
        break;
      case 'pendiente':
        counters.pending++;
        break;
    }
  });

  return counters;
};
