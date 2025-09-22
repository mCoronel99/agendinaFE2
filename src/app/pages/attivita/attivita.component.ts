import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { AttivitaService } from 'src/app/api/attivita/attivitaService';
import { DipendentiService } from 'src/app/api/dipendenti/dipendenti.service';
import { ProgettoService } from 'src/app/api/progetto/progetto.service';
import { StatiService } from 'src/app/api/stati/statiService';

import { AttivitaModal } from 'src/app/components/modals/attivita-modal/attivita-modal';
import { ConfirmationModal } from 'src/app/components/modals/confirmation-modal/confirmation.modal';
import { NotificationService } from 'src/app/services/notification.service';

import { Attivita } from 'src/app/model/attivita.interface';
import * as AttivitaActions from 'src/app/store/attivita/attivita.actions';
import { selectAttivita } from 'src/app/store/attivita/attivita.selectors';

@Component({
  selector: 'app-attivita',
  templateUrl: './attivita.component.html',
  styleUrls: ['./attivita.component.css'],
})
export class AttivitaComponent implements OnInit {
  dataSource$!: Observable<Attivita[]>;
  displayedColumns: string[] = [
    'id',
    'id_dipendente',
    'id_progetto',
    'id_stato',
    'descrizione',
    'data_inizio',
    'data_fine',
    'actions',
  ];

  dipendenteMap: { [key: number]: string } = {};
  progettoMap: { [key: number]: string } = {};
  statoMap: { [key: number]: string } = {};

  constructor(
    private attivitaService: AttivitaService,
    public dialog: MatDialog,
    private dipendenteService: DipendentiService,
    private progettoService: ProgettoService,
    private statoService: StatiService,
    private notificaction: NotificationService,
    private store: Store
  ) {}



ngOnInit() {
  this.store.dispatch(AttivitaActions.loadAttivita());

  this.dataSource$ = this.store.select(selectAttivita).pipe(
    map(attivita => attivita ?? []) // 👈 evita il null
  );

  this.dipendenteService.getDipendenti();
  this.progettoService.getProgetti();
  this.statoService.getStati();
}


  addAttivita() {
  const dialogRef = this.dialog.open(AttivitaModal, {
    data: null,
    restoreFocus: false,
  });

  dialogRef.afterClosed().subscribe((attivita: Attivita) => {
    if (attivita) {
      this.store.dispatch(AttivitaActions.addAttivita({ attivita }));
    }
  });
}


  editAttivita(attiv: Attivita) {
    const dialogueRef = this.dialog.open(AttivitaModal, {
      data: { attivita: attiv },
      restoreFocus: false,
    });

    dialogueRef.afterClosed().subscribe(async (attivita: Attivita) => {
      if (attivita) {
        this.store.dispatch(AttivitaActions.editAttivita({attivita}))
      }
    });
  }

  deleteAttivita(attiv: Attivita) {
    const dialogRef = this.dialog.open(ConfirmationModal, {
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
       this.store.dispatch(AttivitaActions.deleteAttivita({id: attiv.id!}))
      }
    });
  }
}
