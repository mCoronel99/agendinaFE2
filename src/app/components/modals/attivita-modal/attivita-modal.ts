import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DipendentiService } from 'src/app/api/dipendenti/dipendenti.service';
import { ProgettoService } from 'src/app/api/progetto/progetto.service';
import { StatiService } from 'src/app/api/stati/statiService';
import { Attivita } from './../../../model/attivita.interface';
import { Stato } from './../../../model/stato.interface';
import { Dipendente } from './../../../model/dipendente.interface';
import { Progetto } from 'src/app/model/progetto.interface';
import { dateRangeValidator } from "./attivita-custom-validator";
 // aggiorna il percorso se necessario

@Component({
  selector: 'app-attivita-modal',
  templateUrl: './attivita-modal.html',
  styleUrls: ['./attivita-modal.css']
})
export class AttivitaModal implements OnInit {
  attivitaForm = new FormGroup({
    id_dipendente: new FormControl<number | null>(null, [Validators.required]),
    id_progetto: new FormControl<number | null>(null, [Validators.required]),
    id_stato: new FormControl<number | null>(null, [Validators.required]),
    descrizione: new FormControl<string>('', [Validators.required]),
    data_inizio: new FormControl<Date | null>(null, [Validators.required]),
    data_fine: new FormControl<Date | null>(null, [Validators.required])
  }, { validators: dateRangeValidator });

  dipendenteOptions: Dipendente[] = [];
  progettoOptions: Progetto[] = [];
  statoOptions: Stato[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AttivitaModal>,
    private dipendenteService: DipendentiService,
    private progettoService: ProgettoService,
    private statiService: StatiService
  ) {}


  async ngOnInit() {
    if (this.data?.attivita) {
      this.attivitaForm.controls.descrizione.setValue(this.data.attivita.descrizione);
      this.attivitaForm.controls.id_dipendente.setValue(this.data.attivita.id_dipendente.id);
      this.attivitaForm.controls.id_progetto.setValue(this.data.attivita.id_progetto.id);
      this.attivitaForm.controls.id_stato.setValue(this.data.attivita.id_stato.id);
      this.attivitaForm.controls.data_inizio.setValue(
        this.data.attivita.data_inizio ? new Date(this.data.attivita.data_inizio) : null
      );
      this.attivitaForm.controls.data_fine.setValue(
        this.data.attivita.data_fine ? new Date(this.data.attivita.data_fine) : null
      );
    }

    this.dipendenteOptions = await this.dipendenteService.getDipendenti();
    this.progettoOptions = await this.progettoService.getProgetti();
    this.statoOptions = await this.statiService.getStati();

    // Gestione iniziale dello stato
    const statoInizialeId = this.attivitaForm.controls.id_stato.value;
    const statoIniziale = this.statoOptions.find(s => s.id === statoInizialeId);
    if (statoIniziale && statoIniziale.stato?.toLowerCase() === 'in corso...') {
      this.attivitaForm.controls.data_fine.disable();
      this.attivitaForm.controls.data_fine.setValue(null);
    }
this.attivitaForm.valueChanges.subscribe(() => {
  const dataInizio = this.attivitaForm.controls.data_inizio.value;
  const dataFine = this.attivitaForm.controls.data_fine.value;

  if (dataInizio && dataFine && dataFine < dataInizio) {
    this.attivitaForm.controls.data_fine.setErrors({ dateRange: true });
  } else {
    // Rimuovi l'errore mantenendo eventuali altri errori presenti
    const errors = this.attivitaForm.controls.data_fine.errors;
    if (errors) {
      delete errors['dateRange'];
      if (Object.keys(errors).length === 0) {
        this.attivitaForm.controls.data_fine.setErrors(null);
      } else {
        this.attivitaForm.controls.data_fine.setErrors(errors);
      }
    }
  }
});

    // Gestione dinamica al cambio di stato
    this.attivitaForm.controls.id_stato.valueChanges.subscribe((statoId) => {
      const statoSelezionato = this.statoOptions.find(s => s.id === statoId);
      const stato = statoSelezionato?.stato?.toLowerCase();

      if (stato === 'in corso...') {
        this.attivitaForm.controls.data_fine.setValue(null);
        this.attivitaForm.controls.data_fine.disable();
      } else {
        this.attivitaForm.controls.data_fine.enable();
      }
      // Esegui nuovamente il controllo della validità
      this.attivitaForm.updateValueAndValidity();
    });

    // Rilancia il controllo della validità quando le date cambiano
    this.attivitaForm.controls.data_inizio.valueChanges.subscribe(() => {
      this.attivitaForm.updateValueAndValidity();
    });
    this.attivitaForm.controls.data_fine.valueChanges.subscribe(() => {
      this.attivitaForm.updateValueAndValidity();
    });
  }

  save(): void {
    if (this.attivitaForm.invalid) {
      this.attivitaForm.markAllAsTouched();
      return;
    }

    const attivita: Attivita = {
      id: this.data?.attivita?.id,
      data_inizio: this.attivitaForm.controls.data_inizio.value!,
      data_fine: this.attivitaForm.controls.data_fine.value!,
      descrizione: this.attivitaForm.controls.descrizione.value!,
      id_dipendente: this.attivitaForm.controls.id_dipendente.value!,
      id_progetto: this.attivitaForm.controls.id_progetto.value!,
      id_stato: this.attivitaForm.controls.id_stato.value!
    };
    console.log(attivita);
    this.dialogRef.close(attivita);
  }

  annulla(): void {
    this.dialogRef.close();
  }
}
