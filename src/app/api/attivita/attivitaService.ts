import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Attivita } from "src/app/model/attivita.interface";


@Injectable({
    providedIn:'root',
})
export class AttivitaService{
    baseUrl = 'http://localhost:8080/api/attivita';

    constructor(private http: HttpClient){}
    getAttivita(): Promise<Attivita[]>{
        return firstValueFrom(
            this.http.get<Attivita[]>(`${this.baseUrl}/getAll`)
        )
    }

    addAttivita(attivita: Attivita): Promise<Attivita>{
        return firstValueFrom(
            this.http.post<Attivita>(`${this.baseUrl}/create`, attivita)
        )
    }

    editAttivita(attivita:Attivita):Promise<Attivita>{
        return firstValueFrom(
            this.http.put<Attivita>(`${this.baseUrl}/update`, attivita)
        )
    }

    deleteAttivita(id:number):Promise <void>{
        return firstValueFrom(
            this.http.delete<void>(`${this.baseUrl}/delete/${id}`)
        )
    }
}
