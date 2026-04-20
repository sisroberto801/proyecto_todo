import api from './api';

export const getProjects = async () => {
  const res = await api.get('/projects');
  return res.data;
};

export const getProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const getProjectsByUser = async (userId) => {
  const res = await api.get('/projects', {
    params: {userId}
  });
  return res.data;
};

export const createProject = async (projectData) => {
  const res = await api.post('/projects', {
    ...projectData,
    createdAt: new Date().toISOString().split('T')[0]
  });
  return res.data;
};

export const updateProject = async (id, projectData) => {
  const res = await api.put(`/projects/${id}`, projectData);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

export const getProjectsByStatus = async (status) => {
  const res = await api.get('/projects', {
    params: {estado: status}
  });
  return res.data;
};

export const searchProjects = async (query) => {
  const res = await api.get('/projects', {
    params: {q: query}
  });
  return res.data;
};

export const searchProjectsByStatusAndQuery = async (status = '', query = '', sortBy = 'createdAt') => {
  const params = {};

  if (status) {
    params.estado = status;
  }

  if (query.trim()) {
    params.q = query;
  }

  if (sortBy) {
    params._sort = sortBy;
    params._order = sortBy === 'nombre' ? 'asc' : 'desc';
  }

  const res = await api.get('/projects', {
    params
  });
  return res.data;
};
