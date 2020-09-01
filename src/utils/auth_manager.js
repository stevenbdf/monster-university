class AuthManager {

    logout() {
        localStorage.clear()
    }

    isAuthenticated() {
        if (localStorage.getItem('token_manager')) {
            return true
        }
        return false
    }
}

export default new AuthManager()