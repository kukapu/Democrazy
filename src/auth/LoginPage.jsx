import { useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import { startLogin } from "../store"


const loginForm = {
    loginEmail: '',
    loginPassword: '',
}

export const LoginPage = () => {

    const dispatch = useDispatch()

    const { loginEmail, loginPassword, onInputChange } = useForm( loginForm )

    const onLogin = ( event ) => {
        event.preventDefault()
        dispatch( startLogin({ email:loginEmail, password:loginPassword }) )
    } 

    return (
        <div className="center">
            <form onSubmit={ onLogin }>
                <div>
                    <input 
                        type="email"
                        placeholder="email"
                        name="loginEmail"
                        value={ loginEmail }
                        onChange={ onInputChange }
                    />
                </div>

                <div>
                    <input 
                        type="password"
                        placeholder="password"
                        name="loginPassword"
                        value={ loginPassword }
                        onChange={ onInputChange }
                    />
                </div>

                <div>
                    <input
                        type="submit"
                        value="Login"
                    />
                </div>
                <div className="form-button mt">
                    <Link to='/register' >Registrarse</Link>
                </div>
            </form>
        </div>
    )
}
