import decode from "jwt-decode";
import { URL_API } from "../config/URL_API";
import { IAPIError } from "../../interfaces/IError";

export class AuthService {

    submitLogin = (email: string, password: string) => {
        const reqBody = JSON.stringify({
            email,
            password
        })

        return this.fetchUrl('/auth', reqBody)
        .then(async res => {
            this.setToken(res.token)
        })
        .catch(err => {
            throw err
        });
    }

    submitSignup = (username: string, email: string, password: string) => {
        const reqBody = JSON.stringify({
            username,
            email,
            password
        })

        return this.fetchUrl('/users', reqBody)
        .then(async res => {
            if (res.success) {
                return this.submitLogin(email, password)
            }
        })
        .catch(err => {
            throw err
        });
    }

    removeToken = () => {
        return localStorage.removeItem('token');
    }
    
    setToken = (token: string) => {
        return localStorage.setItem('token', token);
    }
    
    getToken = () => {
        return localStorage.getItem('token');
    }
    
    submitLogout = async () => {
        await this.removeToken();
    }

    isTokenExpired = (token: string) => {
        try {
            const decoded = decode(this.getToken());
            return decoded.exp < Date.now() / 1000;
        } catch(err) {
            return false;
        }
    }

    getProfile = () => {
        const token = this.getToken();
        if (token) {
            return this.checkTokenValidity(decode(token))
        } else {
            return false
        }
    }

    checkTokenValidity = (decodedToken) => {
        if (!this.isTokenExpired(decodedToken)) {
            return decodedToken
        } else {
            return false
        }
    }

    fetchUrl = (url: string, body: any) => {
        return fetch(`${URL_API}${url}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body
        })
        .then(res => {
            if (!res.ok) throw res;
            return res.json()
        })
        .catch(async (err) => {
            const error: IAPIError = await err.json();
            throw error;
        })
    }
}
