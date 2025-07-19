import axios from 'axios';  


const BACKEND_URI = 'https://localhost/api';

export interface AuthResponse {
    id: string; 
    username: string;
    email: string;
    picture: string | null;
    response: string;
}

export const getAuth = async (): Promise<AuthResponse> =>  {
    try {
        const response = await axios.get(BACKEND_URI + "/sec/get-auth", {
            withCredentials: true
        });
        
        console.log("response from get-auth", response.data.response);
        return response.data;
    } catch (error) {
        console.error('Auth error:', error);
        throw error; 
    }
};

export async function allUsers() {
    try {
        const res = await axios.get('https://localhost/api/public/all-users');
        console.log(res.data);
    } catch(error) {
        console.log(error);
    }
}

export async function signup(username: string, email: string, password: string) { 
    return await axios.post("https://localhost/api/public/signup", {
        username: username,
        email: email,
        password: password
    }, {
        withCredentials: true
    })
    .then(response => {
        console.log("Ответ сервера", response.data);
        console.log("Заголовки ответа", response.headers);
        console.log("Cookie", document.cookie);
    })
    .catch(error => {
    console.error('Ошибка:', error);
    });
}

export async function signin(email: string, password: string) { 

    try {
        const response = await axios.post("https://localhost/api/public/signin", {
            email: email,
            password: password
        }, {
            withCredentials: true
        })

        console.log("Ответ сервера", response.data);
        console.log("Заголовки ответа", response.headers);
        console.log("Cookie", document.cookie);

        return response;
    }
    catch(error) {
        throw error; 
    }

}

export async function loginOAuth2() {
    try {
        const response = await axios.get("https://localhost/api/public/oauth2/login", {
            withCredentials: true
        })
    } catch(error) {
        throw error;
    }
    
}

export async function logout() {
    try {
        const response = await axios.post(BACKEND_URI + "/sec/logout", null, {
            withCredentials: true
        });
        console.log(response.data);
        return response;
    } catch(error) {
        throw error;
    }
}