import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initialUsers = [
    {
        id: 1,
        username: 'Candelaria',
        password: '12345',
        email: 'Candelaria@correo.com',
        address: '5ta Poniente Norte',
        rfc: 'MARA000223'
    },
];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
    address: '',
    rfc: '',
}

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const navigate = useNavigate();

    const handlerAddUser = (user) =>{
        // console.log(user);
        
        dispatch({
         type: (user.id === 0) ? 'addUser' : 'updateUser',
         payload: user,
        });

        Swal.fire(
            (user.id === 0) ? 
            'Usuario Creado': 
            'Usuario Actualizado',
            (user.id === 0) ? 
            'El usuario ha sido creado con exito' : 
            'Usuario ha sido actualizado con exito',
            'success'
          );
          handlerCloseForm();
          navigate('/users');
     }

     const handlerRemoveUser = (id) => {
         //console.log(id);


         Swal.fire({
            title: "Esta seguro que desea eiminar?",
            text: "El usuario sera eliminado!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'removeUser',
                    payload: id,
                });
              Swal.fire(
                'Usuario Eliminado!',
                'El usuario ha sido eliminado con exito.',
                'success'
              )
            }
          });

     }
 
     const handlerUserSelectedForm = (user) => {
         //console.log(user);
         setVisibleForm(true);
         setUserSelected({...user });
     }
 

        const handlerOpenForm = () => {
            setVisibleForm(true);
        }
        
        const handlerCloseForm = () => {
            setVisibleForm(false);
            setUserSelected(initialUserForm);
        }
        return {
            users,
            userSelected,
            initialUserForm,
            visibleForm,
            handlerOpenForm,
            handlerCloseForm,
            handlerAddUser,
            handlerRemoveUser,
            handlerUserSelectedForm,
    }
}