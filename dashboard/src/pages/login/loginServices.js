import env from '../../../config.json';
export default function LoginService() {
    const login = async (username, password, setLoading) => {
        //TODO add encryption here
        setLoading(true);
        const response = await fetch(`${env.API_BASE_URL}:${env.SERVER_PORT}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        setLoading(false); 
        if(response.status == 401) return alert('Invalid credentials');
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        
    }

    return{
        login
    }
}