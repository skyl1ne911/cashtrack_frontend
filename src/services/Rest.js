import axios from 'axios';  


const url = 'https:'

export async function foo(email) {
    try {
        const response = await axios.get("https://backend/public/all-users");
        console.log("Ответ с сервера: ", response.data);
        return response
    } catch (error) {
        console.error("Ошибка ответа", error)
        throw error;
    }
}   

export async function signup(username, email, password) { 
    return await axios.post("https://backend/public/signup", {
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

export async function signin(email, password) { 
    return await axios.post("https://backend/public/signin", {
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