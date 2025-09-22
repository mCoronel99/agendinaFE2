import { ConfirmationModal } from '../../components/modals/confirmation-modal/confirmation.modal';
import { Component, OnInit } from '@angular/core';
import { DipendentiService } from '../../api/dipendenti/dipendenti.service';
import { Dipendente } from '../../model/dipendente.interface';
import { DipendenteModal } from 'src/app/components/modals/dipendente-modal/dipendente.modal';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { map, Observable } from 'rxjs';
import * as DipendenteActions from '../../store/dipendente/dipendente.actions';
import { Store } from '@ngrx/store';
import { selectDipendente } from 'src/app/store/dipendente/dipendente.selectors';

@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.component.html',
  styleUrls: ['./dipendenti.component.css'],
})
export class DipendentiComponent implements OnInit {
  dataSource$!: Observable<Dipendente[]>;
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'dataN', 'azioni'];

  constructor(
    private dipendenteService: DipendentiService,
    public dialog: MatDialog,
    private notification: NotificationService,
    private store: Store
  ) {}

  async ngOnInit() {
    this.store.dispatch(DipendenteActions.loadDipendente());
    this.dataSource$ = this.store.select(selectDipendente).pipe
    (map(dipendente => dipendente ?? [])
  );
  }

  addDipendente() {
    const dialogRef = this.dialog.open(DipendenteModal, {
      data: null,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe(async (dipendente: Dipendente) => {
      if (dipendente) {
        this.store.dispatch(DipendenteActions.addDipendente({dipendente}))
      }
    });
    // apri modale utilizzando angular material dialog
    // dentro alla modale creare form di inserimento utente con campi input nome cognome dataN
    // dataN usa datepicker
    // dialogRef.afterClosed -> invia request di aggiunta utente
  }

  editDipendente(dip: Dipendente) {
    const dialogRef = this.dialog.open(DipendenteModal, {
      data: { dipendente: dip },
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe(async (dipendente: Dipendente) => {
      if (dipendente) {
        this.store.dispatch(DipendenteActions.editDipendente({dipendente}));
      }
    });
    // apri stessa modale della add, caricando l'utente selezionato sulla form come valore iniziale
    // passa dip come input alla dialog
    // dialogRef.close -> invia request di modifica utente
  }

  deleteDipendente(dip: Dipendente) {
    const dialogRef = this.dialog.open(ConfirmationModal, {restoreFocus: false});

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
       this.store.dispatch(DipendenteActions.deleteDipendente({id : dip.id!}))
      }
    });
    // apri dialog semplice di conferma (si/no)
    // dialogRef.afterClosed si -> invia request di delete
  }

  formatDate(moment: number) {
    return new Date(moment).toLocaleDateString();
  }
}
