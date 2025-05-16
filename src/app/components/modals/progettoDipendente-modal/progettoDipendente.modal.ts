import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DipendentiService } from "src/app/api/dipendenti/dipendenti.service";
import { ProgettoService } from "src/app/api/progetto/progetto.service";
import { RuoliService } from "src/app/api/ruoli/ruoli.service";
import { Dipendente } from "src/app/model/dipendente.interface";
import { Progetto } from "src/app/model/progetto.interface";
import { ProgettoDipendente } from "src/app/model/progettoDipendente.interface";
import { Ruolo } from "src/app/model/ruolo.interface";

@Component({
    selector: 'app-progetto-dipendente-modal',
    templateUrl: './progettoDipendente.modal.html',
    styleUrls:['./progettoDipendente.modal.css']
})
export class ProgettoDipendenteModal  implements OnInit {
  progettoDipendenteForm = new FormGroup({
    id_dipendente: new FormControl<number | null>(null, [Validators.required]),
    id_progetto: new FormControl<number | null>(null, [Validators.required]),
    id_ruolo: new FormControl<number | null>(null, [Validators.required])
  });
    dipendentiOptions: Dipendente[] = [];
    progettiOptions: Progetto[]= [];
    ruoliOptions: Ruolo[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ProgettoDipendenteModal>,
        private dipendentiService: DipendentiService,
        private progettoService: ProgettoService,
        private ruoliService: RuoliService
    ) {}

    async ngOnInit() {
      console.log('progettoDipendente loaded')
        if(this.data?.progettoDipendente){
            console.log(this.data);
            this.progettoDipendenteForm.controls.id_dipendente.setValue(this.data.progettoDipendente.id_dipendente.id);
            this.progettoDipendenteForm.controls.id_progetto.setValue(this.data.progettoDipendente.id_progetto.id);
            this.progettoDipendenteForm.controls.id_ruolo.setValue(this.data.progettoDipendente.id_ruolo.id);
            this.progettoDipendenteForm.controls.id_dipendente.disable();
          this.progettoDipendenteForm.controls.id_progetto.disable();
        }
        this.dipendentiOptions = await this.dipendentiService.getDipendenti();
        this.progettiOptions = await this.progettoService.getProgetti();
        this.ruoliOptions = await this.ruoliService.getRuoli();
    }
    save(): void{
      const prodip = {
        idDipendente: this.progettoDipendenteForm.controls.id_dipendente.value! ,
        idProgetto: this.progettoDipendenteForm.controls.id_progetto.value! ,
        idRuolo:this.progettoDipendenteForm.controls.id_ruolo.value!


      }
      
      this.dialogRef.close(prodip)
    }

    annulla():void{
      this.dialogRef.close();
    }
}
