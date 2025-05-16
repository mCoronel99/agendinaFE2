import { Dipendente } from "./dipendente.interface";
import { Progetto } from "./progetto.interface";
import { Ruolo } from "./ruolo.interface";

export interface ProgettoDipendente{
    id_dipendente?:Dipendente;
    id_progetto?: Progetto;
    id_ruolo?:Ruolo;
}
