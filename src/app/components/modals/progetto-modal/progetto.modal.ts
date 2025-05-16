import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SettoreService } from "src/app/api/settore/settore.service";
import { Progetto } from "src/app/model/progetto.interface";
import { Settore } from "src/app/model/settore.interface";


@Component({
    selector:'app-progetto-modal',
    templateUrl:'./progetto.modal.html',
    styleUrls:['./progetto.modal.css']
})
export class ProgettoModal implements OnInit{
    progettoForm = new FormGroup ({
        id_settore: new FormControl<number | null> (null, [Validators.required]),
        titolo: new FormControl<string>('', [Validators.required]),
        data_inizio: new FormControl<Date>(new Date(),[Validators.required])
    })

    settoreOptions: Settore[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ProgettoModal>,
        private settoreService: SettoreService
    ){}

   async ngOnInit(){
        if(this.data?.progetto){
            console.log(this.data);
            this.progettoForm.controls.id_settore.setValue(this.data.progetto.id_sett.id);
            this.progettoForm.controls.titolo.setValue(this.data.progetto.titolo);
            this.progettoForm.controls.data_inizio.setValue(new Date(this.data.progetto.data_inizio))
        }
        this.settoreOptions = await this.settoreService.getSettori();
    }

    save():void{
        const progetto:Progetto = {
            id: this.data?.progetto.id,
            titolo: this.progettoForm.controls.titolo.value!,
            data_inizio:this.progettoForm.controls.data_inizio.value!,
            id_sett:{
                id:this.progettoForm.controls.id_settore.value!,
            },
        };
        this.dialogRef.close(progetto);
    }

    annulla():void{
        this.dialogRef.close();
    }
}