import axios from './index'

export const getCareers = async () => {
    const res = await axios.get('careers.php?action=get')
    return res.data
}

export const create = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('careers.php?action=create', JSON.stringify(data)
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const find = async (id_career) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('careers.php?action=find',
        JSON.stringify({ id_career })
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const update = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('careers.php?action=update',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const deleteCareer = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('careers.php?action=delete',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}