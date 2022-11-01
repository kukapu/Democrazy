import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../auth"
import { Compare, Majority, Ponderation } from "../compare"
import { Results } from "../compare/Results"
import { VotationId } from "../compare/VotationId"
import { Navbar } from "../ui/Navbar"

export const AppRouter = () => {

    const { isLogged } = useSelector( state =>  state.auth )

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
