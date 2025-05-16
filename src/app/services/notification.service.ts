import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  success(message: string, title: string = 'Successo') {
    this.toastr.success(message, title, {timeOut:2000});
    timeOut:2000;
  }

  error(message: string, title: string = 'Errore') {
    this.toastr.error(message, title, {timeOut:2000});
    
  }

 
}