import { useState } from 'react';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    return{
        setUsername,
        setPassword,
        password,
        username
    }

}