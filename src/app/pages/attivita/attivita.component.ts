import { AttivitaService } from './../../api/attivita/attivitaService';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DipendentiService } from 'src/app/api/dipendenti/dipendenti.service';
import { ProgettoService } from 'src/app/api/progetto/progetto.service';
import { StatiService } from 'src/app/api/stati/statiService';
import { AttivitaModal } from 'src/app/components/modals/attivita-modal/attivita-modal';
import { ConfirmationModal } from 'src/app/components/modals/confirmation-modal/confirmation.modal';
import { Attivita } from 'src/app/model/attivita.interface';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-attivita',
  templateUrl: './attivita.component.html',
  styleUrls: ['./attivita.component.css'],
})
export class AttivitaComponent implements OnInit {
  dataSource: Attivita[] = [];
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

  constructor(
    private attivitaService: AttivitaService,
    public dialog: MatDialog,
    private dipendenteService: DipendentiService,
    private progettoService: ProgettoService,
    private statoService: StatiService,
    private notificaction: NotificationService
  ) {}

  dipendenteMap: { [key: number]: string } = {};
  progettoMap: { [key: number]: string } = {};
  statoMap: { [key: number]: string } = {};

  async ngOnInit() {
    this.dataSource = await this.attivitaService.getAttivita();
    this.dipendenteService.getDipendenti();
    this.progettoService.getProgetti();
    this.statoService.getStati();

  }

  addAttivita() {
    const dialogueRef = this.dialog.open(AttivitaModal, {
      data: null,
      restoreFocus: false,
    });

    dialogueRef.afterClosed().subscribe(async (attivita: Attivita) => {
      if (attivita) {
        this.attivitaService
          .addAttivita(attivita)
          .then(async (res) => {
            this.notificaction.success('Aggiunto con successo!');
            this.dataSource = await this.attivitaService.getAttivita();
          })
          .catch((res) => this.notificaction.error("Errore nell'aggiunta"));
      }
    });
  }

  editAttivita(attiv:Attivita){
    const dialogueRef = this.dialog.open(AttivitaModal,{
      data: {attivita: attiv},
      restoreFocus: false,
    });
    dialogueRef.afterClosed().subscribe(async( attivita: Attivita)=>{
      if(attivita){
        this.attivitaService
        .editAttivita(attivita)
        .then(async (res) => {
          this.notificaction.success('Modificato con successo')
          this.dataSource = await this.attivitaService.getAttivita();
        })
        .catch((res) => this.notificaction.error('Errore nella modifica'))
      }
    })
  }

  deleteAttivita(attiv:Attivita){
    const dialogRef = this.dialog.open(ConfirmationModal, {restoreFocus: false,});

    dialogRef.afterClosed().subscribe((confirmation) => {

      if(confirmation) {
        this.attivitaService
        .deleteAttivita(attiv)
        .then (async(res) =>{
          this.notificaction.success('Cancellato con successo');
          this.dataSource = await this.attivitaService.getAttivita();

        })
        .catch((res) => this.notificaction.error('Errore nella cancellazione'))
      }
    })
  }


}
