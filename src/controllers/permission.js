// import user from "./user";

// permissions.js
const rolesPermissions = {
  root: ['root', 'funcionario', 'cliente', 'clienteRead', 'read', 'write', 'delete', 'bloqueado'],
  funcionario: ['funcionario', 'cliente', 'clienteRead', 'read', 'write','bloqueado'],
  cliente: ['cliente', 'clienteRead'],
  clienteRead: ['clienteRead'],
  user: ['clienteRead'],
  bloqueado: ['bloqueado'],
  };
  
  export default rolesPermissions;
  