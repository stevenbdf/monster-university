import axios from './index'

export const login = async (data = {}) => {
    const res = await axios.post('managers.php?action=login', JSON.stringify(data))
    return res.data
}