import LoginService from './loginServices';
import useLogin from './useLogin';
import './login.styles.css';
export default function Login() {
    const logic = useLogin();
    return(
        <div className="login-container">
            <div className="login-box">
                <h1 className='text'>Login</h1>
                <form className='login-form'>
                    <input type="text" placeholder="Username" onChange={(e) => logic.setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => logic.setPassword(e.target.value)} />
                    <button onClick={() => LoginService().login(logic.username, logic.password)}>Login</button>
                </form>
            </div>
        </div>
    )
}