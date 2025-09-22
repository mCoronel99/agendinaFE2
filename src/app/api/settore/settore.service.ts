import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { Settore } from 'src/app/model/settore.interface';

@Injectable({
  providedIn: 'root',
})
export class SettoreService {
  baseUrl = 'http://localhost:8080/api/settore';

  constructor(private http: HttpClient) {}

  getSettori(): Promise<Settore[]> {
    return firstValueFrom(this.http.get<Settore[]>(`${this.baseUrl}/getAll`));
  }

  addSettore(settore: Settore): Promise<Settore> {
    return firstValueFrom(
      this.http.post<Settore>(`${this.baseUrl}/create`, settore)
    );
  }

  editSettore(settore: Settore): Promise<Settore> {
    return firstValueFrom(
      this.http.put<Settore>(`${this.baseUrl}/update`, settore)
    );
  }

  deleteSettore(id:number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/delete/${id}`)
    );
  }
}
