import env from '../../../config.json';
export default function LoginService() {
    const login = async (username, password) => {
        //TODO add encryption here
        const response = await fetch(`${env.API_BASE_URL}:${env.SERVER_PORT}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json(); 
        console.log(data);  

    }

    return{
        login
    }
}