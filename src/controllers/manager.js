import axios from './index'

export const count = async () => {
    const res = await axios.get('managers.php?action=countManager')
    return res.data
}

export const create = async (data = {}) => {
    const res = await axios.post('managers.php?action=create', JSON.stringify(data))
    return res.data
}

export const get = async () => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.get('managers.php?action=get'
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const find = async (id_manager) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('managers.php?action=find',
        JSON.stringify({ id_manager })
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const update = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('managers.php?action=update',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const deleteManager = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('managers.php?action=delete',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}