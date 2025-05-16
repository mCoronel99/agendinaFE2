import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Ruolo } from "src/app/model/ruolo.interface";

@Component({
    selector:'app-ruoli.modal',
    templateUrl:'./ruoli.modal.html',
    styleUrls:['./ruoli.modal.css']
})
export class RuoliModal implements OnInit{
    ruoliForm = new FormGroup({
        tipo_ruoli: new FormControl<string>('', [Validators.required])
    })

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<RuoliModal>
    ){}


    async ngOnInit() {
        if (this.data?.ruoli){
            console.log(this.data);
            this.ruoliForm.controls.tipo_ruoli.setValue(this.data.ruoli.tipo_ruoli)
        }

    }
    save(): void{
        const ruoli: Ruolo = {
            id: this.data?.ruoli.id,
            tipo_ruoli: this.ruoliForm.controls.tipo_ruoli.value!,
        }
        this.dialogRef.close(ruoli);
    }
    annulla(): void{
        this.dialogRef.close();
    }
}
