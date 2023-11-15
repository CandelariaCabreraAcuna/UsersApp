import { useReducer } from "react";
import { LoginPage } from "./auth/LoginPage";
import { UsersPage } from "./pages/UsersPage";
import { loginReducer } from "./auth/reducers/loginReducer";
import Swal from "sweetalert2";
import { Navbar } from "./components/layout/Navbar";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}
export const UsersApp = () => {
  
    const [login, dispach ] = useReducer(loginReducer, initialLogin)

    const handlerLogin = ({username, password}) => {
        if(username === 'admin' && password === '12345'){
            const user = { username: 'admin'}
            dispach({
                type: 'login',
                payload: user,
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user,
            }));
        }else {
            Swal.fire('Error Login', 'Username o password invalidos', 'error');
        } 
    }
    const handlerLogout = () => {
        dispach({
            type: 'logout',
        });
        sessionStorage.removeItem('login');
    }
    return (
        <>
            {
            login.isAuth
                ? (
                    <>
                    <Navbar login={login} handlerLogout={handlerLogout} />
                    <UsersPage /> 
                    </>
                  ) 
                : <LoginPage handlerLogin={handlerLogin}/>    
            }
    
        </>
    );
}