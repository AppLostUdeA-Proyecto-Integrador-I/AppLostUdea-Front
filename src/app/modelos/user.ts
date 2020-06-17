export interface Roles{
    usuario?: boolean;
    administrador?: boolean;
  }
  
  export interface UserInterface {
    uid: string;
    correo: string;
    nombre?: string;
    permiteNotificaciones: boolean;
    rol: Roles;
  }