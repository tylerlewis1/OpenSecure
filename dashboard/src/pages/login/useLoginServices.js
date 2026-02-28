import env from '../../../config.json';
import useAuth from '../../background/useAuth.js';
import useUser from '../../background/useUser.js';

export default function useLoginService() {
    const { setUser } = useUser();
    const auth = useAuth(); // ✅ Move this outside the login function

    const login = async (username, password, setLoading) => {
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
        console.log('Login successful, received token:', data);
        auth.setToken(data.token); // ✅ Now using the auth from hook scope
        setUser(data.user);
    }

    return {
        login
    }
}