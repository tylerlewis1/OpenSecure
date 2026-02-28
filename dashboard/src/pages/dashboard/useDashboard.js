import { useEffect, useState } from "react";
import useUser from '../../background/useUser';
export default function App() {
    const [userData, setUserData] = useState(null);
    const { getUser } = useUser();
    useEffect(() => {
        const fetchUserData = async () => {const data = await getUser(); setUserData(data);}
        fetchUserData();
    }, []);
    
    
    return{
        userData,
        setUserData,
    }
}

 