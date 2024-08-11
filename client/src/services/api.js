import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const signup = (email, password) => api.post('/auth/signup', { email, password });
export const fetchDegrees = () => api.get('/degrees');
export const fetchYears = (degreeId) => api.get(`/degrees/${degreeId}/years`);
export const fetchCourses = (degreeId, year) => api.get(`/degrees/${degreeId}/years/${year}/courses`);
export const fetchLessons = (degreeId, year, courseName) => api.get(`/degrees/${degreeId}/years/${year}/courses/${courseName}/lessons`);
