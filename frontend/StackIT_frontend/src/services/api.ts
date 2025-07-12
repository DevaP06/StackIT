import AxiosInstance from '../AxiosInstance';

// Types
export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Question {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  author: User;
  votes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Answer {
  _id: string;
  content: string;
  author: User;
  questionId: string;
  votes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

// Auth API
export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await AxiosInstance.post('/api/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await AxiosInstance.post('/api/auth/register', credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await AxiosInstance.get('/api/auth/me');
    return response.data;
  },
};

// Questions API
export const questionsAPI = {
  getAll: async (filter?: 'newest' | 'suggested', search?: string) => {
    const params = new URLSearchParams();
    if (filter) params.append('filter', filter);
    if (search) params.append('search', search);
    
    const response = await AxiosInstance.get(`/api/questions?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await AxiosInstance.get(`/api/questions/${id}`);
    return response.data;
  },

  create: async (question: { title: string; description: string; tags: string[] }) => {
    const response = await AxiosInstance.post('/api/questions', question);
    return response.data;
  },

  update: async (id: string, updates: Partial<Question>) => {
    const response = await AxiosInstance.put(`/api/questions/${id}`, updates);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await AxiosInstance.delete(`/api/questions/${id}`);
    return response.data;
  },

  vote: async (id: string, voteType: 'up' | 'down') => {
    const response = await AxiosInstance.post(`/api/questions/${id}/vote`, { voteType });
    return response.data;
  },
};

// Answers API
export const answersAPI = {
  getByQuestionId: async (questionId: string) => {
    const response = await AxiosInstance.get(`/api/questions/${questionId}/answers`);
    return response.data;
  },

  create: async (questionId: string, content: string) => {
    const response = await AxiosInstance.post(`/api/questions/${questionId}/answers`, { content });
    return response.data;
  },

  update: async (id: string, content: string) => {
    const response = await AxiosInstance.put(`/api/answers/${id}`, { content });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await AxiosInstance.delete(`/api/answers/${id}`);
    return response.data;
  },

  vote: async (id: string, voteType: 'up' | 'down') => {
    const response = await AxiosInstance.post(`/api/answers/${id}/vote`, { voteType });
    return response.data;
  },
};

// Messages API (for admin functionality)
export const messagesAPI = {
  getAll: async () => {
    const response = await AxiosInstance.get('/api/messages');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await AxiosInstance.get(`/api/messages/${id}`);
    return response.data;
  },

  send: async (content: string) => {
    const response = await AxiosInstance.post('/api/messages/send', { content });
    return response.data;
  },
};

// Utility function to set auth token
export const setAuthToken = (token: string | null) => {
  if (token) {
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete AxiosInstance.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

// Utility function to get auth token
export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Initialize auth token on app start
const token = getAuthToken();
if (token) {
  setAuthToken(token);
} 