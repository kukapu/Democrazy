import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import { startRegister } from "../store"


const registerForm = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const RegisterPage = () => {

    const dispatch = useDispatch()

    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange } = useForm( registerForm )

    const onRegister = ( event ) => {
        event.preventDefault()

        if( registerPassword !== registerPassword2 ){
            alert('Contraseñas diferentes')
            return 
        }
        dispatch( startRegister({ name: registerName, email: registerEmail, password: registerPassword }))
    }


    return (
        <div className="login-container">
            <form onSubmit={ onRegister }>
                <div>
                    <input
                        className="input-general-form" 
                        type="name"
                        placeholder="name"
                        name="registerName"
                        value={ registerName }
                        onChange={ onInputChange }
                    />
                </div>

                <div>
                    <input
                        className="input-general-form" 
                        type="email"
                        placeholder="email"
                        name="registerEmail"
                        value={ registerEmail }
                        onChange={ onInputChange }
                    />
                </div>

                <div>
                    <input 
                        className="input-general-form"
                        type="password"
                        placeholder="password"
                        name="registerPassword"
                        value={ registerPassword }
                        onChange={ onInputChange }
                    />
                </div>
                <div>
                    <input 
                        className="input-general-form"
                        type="password"
                        placeholder="password"
                        name="registerPassword2"
                        value={ registerPassword2 }
                        onChange={ onInputChange }
                    />
                </div>

                <div>
                    <input
                        className="input-button-login"
                        type="submit"
                        value="Registrarse"
                    />
                </div>
                <div className="form-button mt">
                    <Link className="login-links" to='/login' >Ir a Login</Link>
                </div>
            </form>
        </div>
    )
}
