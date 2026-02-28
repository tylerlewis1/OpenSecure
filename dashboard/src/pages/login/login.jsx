import useLoginService from './useLoginServices';
import useLogin from './useLogin';
import './login.styles.css';

export default function Login() {
    const logic = useLogin();
    const { login } = useLoginService(); // ✅ Call hook at top level

    const handleSubmit = (e) => {
        e.preventDefault();
        login(logic.username, logic.password, logic.setLoading); // Use the function
    };

    return(
        <>
            {logic.loading && <div className="loading-overlay">
                <div className='loding-div'>
                    <h2>Loading...</h2>
                    <progress/>
                </div>
            </div>}
            <div className="login-container">
                <div className="login-box">
                    <h1 className='text'>Login</h1>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" onChange={(e) => logic.setUsername(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => logic.setPassword(e.target.value)} />
                        <button type="submit" disabled={logic.loading}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}