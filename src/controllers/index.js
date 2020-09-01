import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/monster_university_backend/api/'
})