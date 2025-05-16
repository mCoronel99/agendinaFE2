import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ProgettoDipendenteService } from "src/app/api/progettoDipendenti/progettoDipendenti.service";
import { ConfirmationModal } from "src/app/components/modals/confirmation-modal/confirmation.modal";
import { ProgettoDipendenteModal } from "src/app/components/modals/progettoDipendente-modal/progettoDipendente.modal";
import { ProgettoDipendente } from "src/app/model/progettoDipendente.interface";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: 'app-progettoDipendente',
  templateUrl: './progettoDipendente.component.html',
  styleUrls: ['./progettoDipendente.component.css'],
})
export class ProgettoDipendenteComponent implements OnInit {
  dataSource: ProgettoDipendente[] = [];
  displayedColumns: string[] = [
    'id_progetto',
    'id_dipendente',
    'id_ruolo',
    'azioni',
  ];

  constructor(
    private progettoDipendenteService: ProgettoDipendenteService,
    public dialog: MatDialog,
    private notification: NotificationService
  ) {}

  async ngOnInit() {
    this.dataSource =
      await this.progettoDipendenteService.getProgettoDipendenti();
  }

  addProgettoDipendente() {
    const dialogueRef = this.dialog.open(ProgettoDipendenteModal, {
      data: null,
      restoreFocus:false
    });

    dialogueRef.afterClosed().subscribe(async (progettoDipendente) => {
      if (progettoDipendente) {
        try {
          await this.progettoDipendenteService.addProgettoDipendente(progettoDipendente);
          this.notification.success('Aggiunto con successo');
          this.dataSource = await this.progettoDipendenteService.getProgettoDipendenti();
        } catch (error: any) {
          if (error.status === 409) {
            this.notification.error('Errore! Il progetto dipendente esiste già.');
          } else {
            this.notification.error('Errore nell\'aggiunta');
          }
        }
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
          this.progettoDipendenteService
            .editProgettoDipendente(progettoDipendente)
            .then(async (res) => {
              this.notification.success('Modificato con successo');
              this.dataSource =
                await this.progettoDipendenteService.getProgettoDipendenti();
            })
            .catch((res) => this.notification.error('Errore nella modifica'));
        }
      });
  }

  deleteProgettoDipendenti(prodip: ProgettoDipendente) {
    const dialogRef = this.dialog.open(ConfirmationModal,{restoreFocus:false});

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        if (
          prodip.id_dipendente?.id != null &&
          prodip.id_progetto?.id != null
        ) {
          this.progettoDipendenteService
            .deleteProgettoDipendente(
              prodip.id_progetto!.id,
              prodip.id_dipendente!.id
            ) // li dovevo invertire AAAAA
            .then(async () => {
              this.notification.success('Cancellato con successo');
              this.dataSource =
                await this.progettoDipendenteService.getProgettoDipendenti();
            })
            .catch((res) =>
              this.notification.error('Errore nella cancellazione')
            );
        }
      }
    });
  }
}
