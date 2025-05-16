import { Stato } from './../../model/stato.interface';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class StatiService{
  baseUrl= 'http://localhost:8080/api/stati';

  constructor(private http: HttpClient){}

getStati():Promise<Stato[]>{
  return firstValueFrom(
    this.http.get<Stato[]>(`${this.baseUrl}/getAll`)
  )
}
}
