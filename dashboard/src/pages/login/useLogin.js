import { useState } from 'react';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    return{
        setUsername,
        setPassword,
        password,
        username,
        setLoading,
        loading
    }

}