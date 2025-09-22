import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { ProgettoDipendenteService } from "src/app/api/progettoDipendenti/progettoDipendenti.service";
import { ConfirmationModal } from "src/app/components/modals/confirmation-modal/confirmation.modal";
import { ProgettoDipendenteModal } from "src/app/components/modals/progettoDipendente-modal/progettoDipendente.modal";
import { ProgettoDipendente } from "src/app/model/progettoDipendente.interface";
import { NotificationService } from "src/app/services/notification.service";
import * as ProgettoDipendenteActions from '../../store/progettoDipendente/progettoDipendente.actions'
import { selectProgettoDipendente } from "src/app/store/progettoDipendente/progettoDipendente.selectors";

@Component({
  selector: 'app-progettoDipendente',
  templateUrl: './progettoDipendente.component.html',
  styleUrls: ['./progettoDipendente.component.css'],
})
export class ProgettoDipendenteComponent implements OnInit {
  dataSource$!: Observable<ProgettoDipendente[]>
  displayedColumns: string[] = [
    'id_progetto',
    'id_dipendente',
    'id_ruolo',
    'azioni',
  ];

  constructor(
    private progettoDipendenteService: ProgettoDipendenteService,
    public dialog: MatDialog,
    private notification: NotificationService,
    private store: Store
  ) {}

  async ngOnInit() {
    this.store.dispatch(ProgettoDipendenteActions.loadProgettoDipendente());
    this.dataSource$ = this.store.select(selectProgettoDipendente).pipe(
      map(progettoDipendente => progettoDipendente ?? [])
    )

  }

  addProgettoDipendente() {
    const dialogueRef = this.dialog.open(ProgettoDipendenteModal, {
      data: null,
      restoreFocus:false
    });

    dialogueRef.afterClosed().subscribe(async (progettoDipendente) => {
      if (progettoDipendente) {
        this.store.dispatch(ProgettoDipendenteActions.addProgettoDipendente({progettoDipendente}))


      }
    });
  }



  editProgettoDipendente(prodip: ProgettoDipendente) {
    const dialogueRef = this.dialog.open(ProgettoDipendenteModal, {
      data: { progettoDipendente: prodip },
      restoreFocus:false
    });
    dialogueRef
      .afterClosed()
      .subscribe(async (progettoDipendente: ProgettoDipendente) => {
        if (progettoDipendente) {
         this.store.dispatch(ProgettoDipendenteActions.editProgettoDipendente({progettoDipendente}))
        }
      });
  }

  deleteProgettoDipendenti(prodip: ProgettoDipendente) {
  const dialogRef = this.dialog.open(ConfirmationModal, { restoreFocus: false });

  dialogRef.afterClosed().subscribe((confirmation) => {
    if (confirmation) {
      const idDipendente = prodip.id_dipendente?.id;
      const idProgetto = prodip.id_progetto?.id;

      if (idDipendente != null && idProgetto != null) {
        this.store.dispatch(ProgettoDipendenteActions.deleteProgettoDipendente({ idProgetto, idDipendente }));
      }
    }
  });
  }
}
