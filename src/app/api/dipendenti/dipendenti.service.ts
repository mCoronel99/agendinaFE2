import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Dipendente } from '../../model/dipendente.interface';

@Injectable({
  providedIn: 'root',
})
export class DipendentiService {
  baseUrl = 'http://localhost:8080/api/dipendenti';

  constructor(private http: HttpClient) {}

  getDipendenti(): Promise<Dipendente[]> {
    return firstValueFrom(
      this.http.get<Dipendente[]>(`${this.baseUrl}/getAll`)
    );
  }

  addDipendente(dipendente: Dipendente): Promise<Dipendente> {
    return firstValueFrom(
      this.http.post<Dipendente>(`${this.baseUrl}/create`, dipendente)
    );
  }
  editDipendente(dipendente: Dipendente): Promise<Dipendente> {
    return firstValueFrom(
      this.http.put<Dipendente>(`${this.baseUrl}/update`, dipendente)
    );
  }
  deleteDipendente(dipendente: Dipendente): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/delete/${dipendente.id}`)
    );
  }
}
