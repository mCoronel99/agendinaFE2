import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Ruolo } from "src/app/model/ruolo.interface";

@Injectable({
    providedIn: 'root'
})
export class RuoliService{
    baseUrl= 'http://localhost:8080/api/ruoli'
    constructor(private http: HttpClient){}

    getRuoli(): Promise<Ruolo[]>{
        return firstValueFrom(
            this.http.get<Ruolo[]>(`${this.baseUrl}/getAll`)
        )
    }
    addRuolo(ruolo: Ruolo): Promise<Ruolo>{
        return firstValueFrom(
            this.http.post<Ruolo>(`${this.baseUrl}/create`, ruolo)

        )
    }
    editRuolo(ruolo:Ruolo): Promise<Ruolo>{
        return firstValueFrom(
            this.http.put<Ruolo>(`${this.baseUrl}/update`, ruolo)
        )
    }
    deleteRuolo(id:number) : Promise <void>{
        return firstValueFrom(
            this.http.delete<void>(`${this.baseUrl}/delete/${id}`)
        )
    }

}
