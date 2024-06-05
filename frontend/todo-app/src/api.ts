import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const api = axios.create({
    baseURL: "http://192.168.0.13:8000"
})

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });


api.interceptors.response.use(response => {
return response;
}, async error => {
const originalRequest = error.config;
if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    if (refreshToken) {
    try {
        const response = await api.post('/api/token/refresh/', {
        refresh: refreshToken,
        });
        if (response.status === 200) {
        const { access } = response.data;
        await AsyncStorage.setItem('access_token', access);
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        return api(originalRequest);
        }
    } catch (refreshError) {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        }
    }
    }
    return Promise.reject(error);
});
  
  export default api;