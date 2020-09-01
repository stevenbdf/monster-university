import axios from './index'

export const register = async (data = {}) => {
    const res = await axios.post('candidates.php?action=create', JSON.stringify(data))
    return res.data
}