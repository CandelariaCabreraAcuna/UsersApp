import { UserRow } from './UserRow';
export const UsersList = ({ handlerUserSelectedForm, handleSearch, handlerRemoveUser, users }) => {
  console.log(users);
  return (
    <table className="table table-hover table-striped">
      <thead>
      <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Direccion</th>
          <th>RFC</th>
          <th>Actualizar</th>
          <th>Dar de baja</th>
          
        </tr>
      </thead>
      <tbody>
      {users.map(({ id, username, email, address, rfc }) => (
          <UserRow
          key={id}
          id={id} 
          username={username} 
          email={email}
          address={address}
          rfc={rfc}
          handlerUserSelectedForm={handlerUserSelectedForm}
          handlerRemoveUser={handlerRemoveUser} />
        ))}
      </tbody>
    </table>
  );
};
