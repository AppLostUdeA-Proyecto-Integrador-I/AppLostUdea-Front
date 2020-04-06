export interface Objeto {
  nombreObjeto: string;
  fechaEncontrado: Date;
  imagen: string;
  lugarEncontrado: string;
  estado: string;
  detalleEntregaId: {
    fechaEntrega: string,
    id: string,
  },
  observaciones: string;
  categoriasId: string;
  lugarDeReclamoId: string;
  usuariosId: string;
}
