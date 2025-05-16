import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RuoliService } from "src/app/api/ruoli/ruoli.service";
import { ConfirmationModal } from "src/app/components/modals/confirmation-modal/confirmation.modal";
import { RuoliModal } from "src/app/components/modals/ruoli-modal/ruoli.modal";
import { Ruolo } from "src/app/model/ruolo.interface";
import { NotificationService } from "src/app/services/notification.service";

@Component({
    selector: 'app-ruoli',
    templateUrl: './ruoli.component.html',
    styleUrls: ['./ruoli.component.css'],
  })

export class RuoliComponent implements OnInit{
    dataSource: Ruolo[]=[];
    displayedColumns: string[] =['id', 'tipo_ruoli', 'azioni']

    constructor(
        private ruoliService : RuoliService,
        public dialog: MatDialog,
        private notification: NotificationService
    ){}

   async ngOnInit() {
    this.dataSource = await this.ruoliService.getRuoli();

}

    addRuoli(){
        const dialogueRef = this.dialog.open(RuoliModal, {
            data: null,
            restoreFocus:false
        })
        dialogueRef.afterClosed().subscribe(async ( ruoli: Ruolo) =>{
            if (ruoli){
                this.ruoliService
                .addRuolo(ruoli)
                .then(async(res) => {
                    this.notification.success('Aggiunto con successo')
                    this.dataSource = await this.ruoliService.getRuoli();
                })
                .catch((res) =>
                     this.notification.error('Errore nell\'aggiunta'))
            }
        })
    }

    editRuoli(ruol: Ruolo){

            const dialogueRef = this.dialog.open(RuoliModal, {
                data: {ruoli: ruol},
                restoreFocus:false
            })
            dialogueRef.afterClosed().subscribe(async ( ruoli: Ruolo) =>{
                if (ruoli){
                    this.ruoliService
                    .editRuolo(ruoli)
                    .then(async(res) => {
                        this.notification.success('Modificato con successo')
                        this.dataSource = await this.ruoliService.getRuoli();
                    })
                    .catch((res) => this.notification.error('Errore nella modifica'))
                }
            })

    }
    deleteRuoli(ruoli:Ruolo){
        const dialogRef = this.dialog.open(ConfirmationModal,{restoreFocus:false});

        dialogRef.afterClosed().subscribe((confirmation) => {
            if (confirmation){
                this.ruoliService
                .deleteRuolo(ruoli)
                .then(async (res) =>{
                    this.notification.success('Cancellato con successo');
                    this.dataSource = await this.ruoliService.getRuoli();
                })
                .catch((res) => this.notification.error('Errore nella cancellazione'))
            }
        })
    }
}
