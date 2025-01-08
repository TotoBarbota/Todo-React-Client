import axios from "axios";

const apiAxios = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export function retrieveHelloWorldBean() {
    return apiAxios.get('/hello-world-bean')
}

export function retrieveHelloWorldBeanWithPathVariable(name: string) {
    return apiAxios.get(`/hello-world/path-variable/${name}`)
}

