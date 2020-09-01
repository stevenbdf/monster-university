import axios from './index'

export const find = async () => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('managers.php?action=find',
        JSON.stringify({ id_manager: localStorage.getItem('id_manager') })
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

export const updatePassword = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('managers.php?action=updatePassword',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}