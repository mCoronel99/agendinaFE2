import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DipendentiService } from 'src/app/api/dipendenti/dipendenti.service';
import { Dipendente } from 'src/app/model/dipendente.interface';
import { Settore } from 'src/app/model/settore.interface';

@Component({
  selector: 'app-settore-modal',
  templateUrl: './settore.modal.html',
  styleUrls: ['./settore.modal.css'],
})
export class SettoreModal implements OnInit {
  settoreForm = new FormGroup({
    id_capo: new FormControl<number | null>(null, [Validators.required]),
    nome: new FormControl<string>('', [Validators.required]),
  });

  dipendentiOptions: Dipendente[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SettoreModal>,
    private dipendentiService: DipendentiService
  ) {}

  async ngOnInit() {
    if (this.data?.settore) {
      console.log(this.data);
      this.settoreForm.controls.nome.setValue(this.data.settore.nome);
      this.settoreForm.controls.id_capo.setValue(this.data.settore.id_capo.id);
    }

    this.dipendentiOptions = await this.dipendentiService.getDipendenti();
  }

  save(): void {
    const settore: Settore = {
      id: this.data?.settore.id,
      nome: this.settoreForm.controls.nome.value!,
      id_capo: {
        id: this.settoreForm.controls.id_capo.value!,
      },
    };
    this.dialogRef.close(settore);
  }

  annulla(): void {
    this.dialogRef.close();
  }
}
