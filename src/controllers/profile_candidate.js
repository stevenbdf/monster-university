import axios from './index'

export const get = async () => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.get('candidates.php?action=get',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const update = async (data = {}) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('candidates.php?action=update',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}