import axios from 'axios'

export const forgotPassword = async (data = {}) => {
    const res = await axios.post('http://localhost/monster_university_backend/mails/passwordCandidate.php', JSON.stringify(data))
    return res.data
}