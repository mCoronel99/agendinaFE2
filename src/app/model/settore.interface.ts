import { Dipendente } from './dipendente.interface';

export interface Settore {
  id?: number;
  id_capo?: Dipendente;
  nome?: string;
}
