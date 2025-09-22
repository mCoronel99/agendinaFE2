import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { RuoliService } from "src/app/api/ruoli/ruoli.service";
import { ConfirmationModal } from "src/app/components/modals/confirmation-modal/confirmation.modal";
import { RuoliModal } from "src/app/components/modals/ruoli-modal/ruoli.modal";
import { Ruolo } from "src/app/model/ruolo.interface";
import { NotificationService } from "src/app/services/notification.service";
import * as RuoliActions from '../../store/ruolo/ruolo.actions';
import { selectRuolo } from "src/app/store/ruolo/ruolo.selectors";

@Component({
    selector: 'app-ruoli',
    templateUrl: './ruoli.component.html',
    styleUrls: ['./ruoli.component.css'],
  })

export class RuoliComponent implements OnInit{
    dataSource$!: Observable<Ruolo[]>;
    displayedColumns: string[] =['id', 'tipo_ruoli', 'azioni']

    constructor(
        private ruoliService : RuoliService,
        public dialog: MatDialog,
        private notification: NotificationService,
        private store: Store
    ){}

   async ngOnInit() {
    this.store.dispatch(RuoliActions.loadRuolo());
    this.dataSource$ = this.store.select(selectRuolo).pipe(
      map(ruolo => ruolo ?? [])
    )

}

    addRuoli(){
        const dialogueRef = this.dialog.open(RuoliModal, {
            data: null,
            restoreFocus:false
        })
        dialogueRef.afterClosed().subscribe(async ( ruolo: Ruolo) =>{
            if (ruolo){
                this.store.dispatch(RuoliActions.addRuolo({ruolo}))
            }
        })
    }

    editRuoli(ruol: Ruolo){

            const dialogueRef = this.dialog.open(RuoliModal, {
                data: {ruoli: ruol},
                restoreFocus:false
            })
            dialogueRef.afterClosed().subscribe(async ( ruolo: Ruolo) =>{
                if (ruolo){
                  this.store.dispatch(RuoliActions.editRuolo({ruolo}))
                }
            })

    }
    deleteRuoli(ruolo:Ruolo){
        const dialogRef = this.dialog.open(ConfirmationModal,{restoreFocus:false});

        dialogRef.afterClosed().subscribe((confirmation) => {
            if (confirmation){
              this.store.dispatch(RuoliActions.deleteRuolo({id: ruolo.id!}))
            }
        })
    }
}
