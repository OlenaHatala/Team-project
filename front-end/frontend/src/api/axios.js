import axios from 'axios';
import { API_URL } from '../config/urls';

export default axios.create({
    baseURL: API_URL
});

export const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
});