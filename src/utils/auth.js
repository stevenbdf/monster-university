class Auth {

    logout() {
        localStorage.clear()
    }

    isAuthenticated() {
        if (localStorage.getItem('token')) {
            return true
        }
        return false
    }

}

export default new Auth()