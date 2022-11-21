import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../auth"
import { Compare, Majority, Ponderation } from "../compare"
import { Results } from "../compare/Results"
import { VotationId } from "../compare/VotationId"
import { login } from "../store"
import { Navbar } from "../ui/Navbar"

export const AppRouter = () => {

    const dispatch = useDispatch()
    const { isLogged } = useSelector( state =>  state.auth )

    useEffect(() => {
        
        storageLogged()

    }, [])
    
    const storageLogged = () => {
        if( JSON.parse(localStorage.getItem('user')) === null) {
            dispatch( login( JSON.parse(localStorage.getItem('user') )))
        }
    }

    return (
        <>
            <Navbar />

            {
                ( isLogged ) 
                    ? (
                        <>
                            <Routes>
                                <Route path='/' element={ <Results /> } />
                                <Route path='/results/:votationId' element={ <VotationId /> } />
                                <Route path='/compare' element={ <Compare /> } />
                                <Route path='/majority' element={ <Majority /> } />
                                <Route path='/ponderation' element={ <Ponderation /> } />
                                <Route path='*' element={ <Results /> } />

                            </Routes>

                        </>
                        
                    )
                    : (
                        <Routes>
                            <Route path='/login' element={ <LoginPage/> } />
                            <Route path='/register' element={ <RegisterPage/> } />
                            <Route path='*' element={ <LoginPage/> } />
                        </Routes>
                    )
                

            }
           

           
        </>
    )
}
