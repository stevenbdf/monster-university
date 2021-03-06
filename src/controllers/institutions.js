import axios from './index'

export const getInstitutions = async () => {
    const res = await axios.get('institutions.php?action=get')
    return res.data
}

export const create = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('institutions.php?action=create', JSON.stringify(data)
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const find = async (id_institution) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('institutions.php?action=find',
        JSON.stringify({ id_institution })
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const update = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('institutions.php?action=update',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}

export const deleteInstitution = async (data = {}) => {
    const TOKEN = localStorage.getItem('token_manager')
    const res = await axios.post('institutions.php?action=delete',
        JSON.stringify(data), { headers: { Authorization: `Bearer ${TOKEN}` } })
    res.data.status === 403 && localStorage.clear()
    return res.data
}