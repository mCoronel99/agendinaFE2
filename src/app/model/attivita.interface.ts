import { Dipendente } from "./dipendente.interface";
import { Progetto } from "./progetto.interface";
import { Stato } from "./stato.interface";

export interface Attivita{
    id?:number;
    id_dipendente?:number;
    id_progetto?: number;
    id_stato?: number;
    descrizione?:String;
    data_inizio?: Date;
    data_fine?: Date | null;
}
