import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ProgettoDipendente } from "src/app/model/progettoDipendente.interface";

@Injectable({
    providedIn:'root'
})
export class ProgettoDipendenteService{
    baseUrl = 'http://localhost:8080/api/progettoDipendente';

    constructor(private http: HttpClient){}

    getProgettoDipendenti(): Promise<ProgettoDipendente[]>{
        return firstValueFrom (
            this.http.get<ProgettoDipendente[]>(`${this.baseUrl}/getAll`));

    }

    addProgettoDipendente(progettoDipendente: { idDipendente: number; idProgetto: number; idRuolo: number }):Promise<ProgettoDipendente>{
        return firstValueFrom(
            this.http.post<ProgettoDipendente>(`${this.baseUrl}/create`,progettoDipendente)
        )
        }

    editProgettoDipendente(progettoDipendente: ProgettoDipendente):Promise<ProgettoDipendente>{
        return firstValueFrom(
            this.http.put<ProgettoDipendente>(`${this.baseUrl}/update`, progettoDipendente)
            )

    }

    deleteProgettoDipendente(idDipendente: number, idProgetto: number): Promise<void>{
  
        console.log(`DELETE: ${this.baseUrl}/delete/${idDipendente}/${idProgetto}`);
        return firstValueFrom(
            this.http.delete<void>(`${this.baseUrl}/delete/${idDipendente}/${idProgetto}`)
        )
    }
}
