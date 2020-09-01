import axios from './index'

export const getTitlesByInsitution = async (data = {}) => {
    const res = await axios.post('titles.php?action=getByInstitution', JSON.stringify(data))
    return res.data
}

export const getTitles = async () => {
    const res = await axios.get('titles.php?action=get')
    return res.data
}

export const create = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('titles.php?action=create', JSON.stringify(data)
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const find = async (id_title) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('titles.php?action=find',
        JSON.stringify({ id_title })
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const update = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('titles.php?action=update',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const deleteInstitution = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('titles.php?action=delete',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}