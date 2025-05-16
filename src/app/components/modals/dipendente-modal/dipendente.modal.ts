import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dipendente } from 'src/app/model/dipendente.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dipendente-modal',
  templateUrl: './dipendente.modal.html',
  styleUrls: ['./dipendente.modal.css'],
})
export class DipendenteModal implements OnInit {
  dipendenteForm = new FormGroup({
    nome: new FormControl<string>('', [Validators.required]),
    cognome: new FormControl<string>('', [Validators.required]),
    data_nascita: new FormControl<Date>(new Date(), [Validators.required])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DipendenteModal>
  ) {}

  ngOnInit(): void {
    console.log('dipendente loaded')
    if (this.data?.dipendente) {
      this.dipendenteForm.controls.nome.setValue(this.data.dipendente.nome)
      this.dipendenteForm.controls.cognome.setValue(this.data.dipendente.cognome)
      this.dipendenteForm.controls.data_nascita.setValue(new Date(this.data.dipendente.data_nascita))
    }
  }

  save(): void {
    const dipendente: Dipendente = {
      id: this.data?.dipendente.id,
      nome: this.dipendenteForm.controls.nome.value!,
      cognome: this.dipendenteForm.controls.cognome.value!,
      data_nascita: this.dipendenteForm.controls.data_nascita.value!,
    };
    this.dialogRef.close(dipendente);
  }

  annulla(): void {
    this.dialogRef.close();
  }
  //componente con dentro form input dipendente

  //accetta dipendente in input, se c'è carica i suoi valori sui campi in input siccome
  //è una modifica, se non c'è restituisce il dipendente senza id

  //dialogRef.close invia il dipendente
}
