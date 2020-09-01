import axios from './index'

export const get = async () => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.get('requests.php?action=get',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const create = async (data = {}) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('requests.php?action=create', data,
        { headers: { Authorization: `Bearer ${TOKEN}`, 'content-type': 'multipart/form-data' } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const update = async (data = {}) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('requests.php?action=update', data,
        { headers: { Authorization: `Bearer ${TOKEN}`, 'content-type': 'multipart/form-data' } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const complete = async () => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.get('requests.php?action=complete',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const getByStatus = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('requests.php?action=getByStatus', data,
        { headers: { Authorization: `Bearer ${TOKEN}`, 'content-type': 'multipart/form-data' } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const countByStatus = async () => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.get('requests.php?action=countByStatus',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const countByCareer = async () => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.get('requests.php?action=countByCareer',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}