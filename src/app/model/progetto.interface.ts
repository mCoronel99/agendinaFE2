import { Settore } from "./settore.interface";

export interface Progetto{
    id?: number ;
    id_sett?:Settore;
    titolo?: string;
    data_inizio?:Date;
    
}