import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, firstValueFrom } from "rxjs";
import { Progetto } from "src/app/model/progetto.interface";

@Injectable({
    providedIn:'root'
})
export class ProgettoService {
    baseUrl = 'http://localhost:8080/api/progetto';

    constructor(private http: HttpClient){}

    getProgetti(): Promise <Progetto[]>{
        return firstValueFrom(this.http.get<Progetto[]>(`${this.baseUrl}/getAll`));
    }

    addProgetto(progetto : Progetto): Promise <Progetto>{
        return firstValueFrom(
            this.http.post<Progetto>(`${this.baseUrl}/create`, progetto)
        )
    }

    editProgetto(progetto : Progetto): Promise<Progetto>{
        return firstValueFrom(
            this.http.put<Progetto>(`${this.baseUrl}/update`, progetto)
        )
    }

    deleteProgetto(id: number) : Promise<void>{
        return firstValueFrom(
            this.http.delete<void>(`${this.baseUrl}/delete/${id}`)
        )
    }
}
