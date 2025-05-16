import { ConfirmationModal } from '../../components/modals/confirmation-modal/confirmation.modal';
import { Component, OnInit } from '@angular/core';
import { DipendentiService } from '../../api/dipendenti/dipendenti.service';
import { Dipendente } from '../../model/dipendente.interface';
import { DipendenteModal } from 'src/app/components/modals/dipendente-modal/dipendente.modal';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.component.html',
  styleUrls: ['./dipendenti.component.css'],
})
export class DipendentiComponent implements OnInit {
  dataSource: Dipendente[] = [];
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'dataN', 'azioni'];

  constructor(
    private dipendenteService: DipendentiService,
    public dialog: MatDialog,
    private notification: NotificationService
  ) {}

  async ngOnInit() {
    this.dataSource = await this.dipendenteService.getDipendenti();
  }

  addDipendente() {
    const dialogRef = this.dialog.open(DipendenteModal, {
      data: null,
      restoreFocus: false,
    });

    dialogRef.afterClosed().subscribe(async (dipendente: Dipendente) => {
      if (dipendente) {
        this.dipendenteService
          .addDipendente(dipendente)
          .then(async (res) => {
            this.notification.success('Aggiunto con successo');
            this.dataSource = await this.dipendenteService.getDipendenti();
          })
          .catch((res) => this.notification.error('Errore nell\'aggiunta'));
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
        this.dipendenteService
          .editDipendente(dipendente)
          .then(async (res) => {
            this.notification.success('Modificato con successo');
            this.dataSource = await this.dipendenteService.getDipendenti();
          })
          .catch((res) => this.notification.error('Errore nella modifica'));
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
        this.dipendenteService
          .deleteDipendente(dip)
          .then(async (res) => {
            this.notification.success('Cancellato con successo');
            this.dataSource = await this.dipendenteService.getDipendenti();
          })
          .catch((res) => this.notification.error('Errore nella cancellazione'));
      }
    });
    // apri dialog semplice di conferma (si/no)
    // dialogRef.afterClosed si -> invia request di delete
  }

  formatDate(moment: number) {
    return new Date(moment).toLocaleDateString();
  }
}
