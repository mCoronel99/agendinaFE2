import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProgettoService } from "src/app/api/progetto/progetto.service";
import { SettoreService } from "src/app/api/settore/settore.service";
import { ConfirmationModal } from "src/app/components/modals/confirmation-modal/confirmation.modal";
import { ProgettoModal } from "src/app/components/modals/progetto-modal/progetto.modal";
import { Progetto } from "src/app/model/progetto.interface";
import { NotificationService } from "src/app/services/notification.service";

@Component({
    selector:'app-progetto',
    templateUrl:'./progetto.component.html',
    styleUrls:['./progetto.component.css']
})
export class ProgettoComponent implements OnInit{
    dataSource: Progetto[] =[];
    displayedColumns : string[] = ['id', 'id_sett', 'titolo','data_inizio', 'azioni'];

    constructor(
        private progettoService : ProgettoService,
        public dialog: MatDialog,
        private settoreService : SettoreService,
        private notification: NotificationService
    ){}

    settoriMap: { [key: number]: string } = {};
    async ngOnInit() {
        this.dataSource = await this.progettoService.getProgetti();
        this.settoreService.getSettori();
    }


    addProgetto(){
        const dialogueRef = this.dialog.open(ProgettoModal,{
            data: null,
            restoreFocus: false,
        });

        dialogueRef.afterClosed().subscribe(async(progetto:Progetto)=> {
            if (progetto){
                this.progettoService
                .addProgetto(progetto)
                .then(async (res) =>{
                    this.notification.success('Aggiunto con successo');
                    this.dataSource = await this.progettoService.getProgetti();
                })
                .catch((res) => this.notification.error('Errore nell\'aggiunta'));
            }
        })
    }


    editProgetto(prog:Progetto){

            const dialogueRef = this.dialog.open(ProgettoModal,{
                data: {progetto: prog},
                restoreFocus: false,
            });

            dialogueRef.afterClosed().subscribe(async(progetto:Progetto)=> {
                if (progetto){
                    this.progettoService
                    .editProgetto(progetto)
                    .then(async (res) =>{
                        this.notification.success('Modificato con successo');
                        this.dataSource = await this.progettoService.getProgetti();
                    })
                    .catch((res) => this.notification.error('Errore nella modifica'));
                }
            })

    }

    deleteProgetto(prog: Progetto){
        const dialogRef = this.dialog.open(ConfirmationModal,{restoreFocus:false});

        dialogRef.afterClosed().subscribe((confirmation) => {
            if (confirmation) {
                this.progettoService
                .deleteProgetto(prog)
                .then(async (res) =>{
                    this.notification.success('Cancellato con successo');
                    this.dataSource = await this.progettoService.getProgetti();
                })
                .catch((res)=> this.notification.error('Errore nella cancellazione'))
            }
        });
    }

    formatDate(moment: number) {
        return new Date(moment).toLocaleDateString();
      }

}
