export interface MenuItem {
  id: string;
  idMenu: string;
  idPadre: string;
  nombre: string;
  nombreForm: string;
  orden: number;
  icono?: string | null;
  hijos: MenuItem[];
}
