import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { ProgettoService } from "src/app/api/progetto/progetto.service";
import { SettoreService } from "src/app/api/settore/settore.service";
import { ConfirmationModal } from "src/app/components/modals/confirmation-modal/confirmation.modal";
import { ProgettoModal } from "src/app/components/modals/progetto-modal/progetto.modal";
import { Progetto } from "src/app/model/progetto.interface";
import { NotificationService } from "src/app/services/notification.service";
import * as ProgettiAction from '../../store/progetto/progetto.actions';
import { selectProgetto } from "src/app/store/progetto/progetto.selectors";

@Component({
    selector:'app-progetto',
    templateUrl:'./progetto.component.html',
    styleUrls:['./progetto.component.css']
})
export class ProgettoComponent implements OnInit{
    dataSource$!: Observable<Progetto[]>;
    displayedColumns : string[] = ['id', 'id_sett', 'titolo','data_inizio', 'azioni'];

    constructor(
        private progettoService : ProgettoService,
        public dialog: MatDialog,
        private settoreService : SettoreService,
        private notification: NotificationService,
        private store: Store
    ){}

    settoriMap: { [key: number]: string } = {};
    async ngOnInit() {
       this.store.dispatch(ProgettiAction.loadProgetto());
       this.dataSource$ = this.store.select(selectProgetto).pipe(
        map(progetto => progetto ?? [])
       )
    }


    addProgetto(){
        const dialogueRef = this.dialog.open(ProgettoModal,{
            data: null,
            restoreFocus: false,
        });

        dialogueRef.afterClosed().subscribe(async(progetto:Progetto)=> {
            if (progetto){
              this.store.dispatch(ProgettiAction.addProgetto({progetto}))
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
                   this.store.dispatch(ProgettiAction.editProgetto({progetto}))
                }
            })

    }

    deleteProgetto(prog: Progetto){
        const dialogRef = this.dialog.open(ConfirmationModal,{restoreFocus:false});

        dialogRef.afterClosed().subscribe((confirmation) => {
            if (confirmation) {
                this.store.dispatch(ProgettiAction.deleteProgetto({id: prog.id!}))
            }
        });
    }

    formatDate(moment: number) {
        return new Date(moment).toLocaleDateString();
      }

}
