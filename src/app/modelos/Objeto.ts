export interface Objeto {
  nombreObjeto: string;
  fechaEncontrado: string;
  imagen: string;
  lugarEncontrado: string;
  estado: string;
  detalleEntregaId: {
    fechaEntrega: string,
    id: string,
  },
  observaciones: string;
  id: string;
  categoriasId: string;
  lugarDeReclamoId: string;
  usuariosId: string;
}
