import axios from 'axios';
import { API_URL } from '../config/urls';

export default axios.create({
    baseURL: API_URL
});