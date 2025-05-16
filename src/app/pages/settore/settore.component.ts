import { SettoreService } from './../../api/settore/settore.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettoreModal } from 'src/app/components/modals/settore-modal/settore.modal';
import { ConfirmationModal } from 'src/app/components/modals/confirmation-modal/confirmation.modal';
import { Settore } from 'src/app/model/settore.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settori',
  templateUrl: './settore.component.html',
  styleUrls: ['./settore.component.css'],
})
export class SettoriComponent implements OnInit {
  dataSource: Settore[] = [];
  displayedColumns: string[] = ['id', 'id_capo', 'nome', 'azioni'];

  constructor(
    private settoreService: SettoreService,
    public dialog: MatDialog,
    private notification: NotificationService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    this.dataSource = await this.settoreService.getSettori();
  }

  addSettore() {
    const dialogueRef = this.dialog.open(SettoreModal, {
      data: null,
      restoreFocus:false
    });

    dialogueRef.afterClosed().subscribe(async (settore: Settore) => {
      if (settore) {
        this.settoreService
          .addSettore(settore)
          .then(async (res) => { console.log('chiama toastr')
            this.notification.success('Aggiunto con successo', 'Successo');
            this.dataSource = await this.settoreService.getSettori();
          })
          .catch((res) => this.notification.error('Errore nell\'aggiunta'));
      }
    });
  }

  editSettore(sett: Settore) {
    const dialogueRef = this.dialog.open(SettoreModal, {
      data: { settore: sett },
      restoreFocus:false
    });

    dialogueRef.afterClosed().subscribe(async (settore: Settore) => {
      if (settore) {
        this.settoreService
          .editSettore(settore)
          .then(async (res) => {
            this.notification.success('Modificato con successo');
            this.dataSource = await this.settoreService.getSettori();
          })
          .catch((res) => this.notification.error('Errore Modifica'));
      }
    });
  }

  deleteSettore(sett: Settore) {
    const dialogRef = this.dialog.open(ConfirmationModal,{restoreFocus:false});

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.settoreService
          .deleteSettore(sett)
          .then(async (res) => { console.log('chiama toastr')
            this.notification.success('Cancellato con successo');
            this.dataSource = await this.settoreService.getSettori();
          })
          .catch((res) => this.notification.error('Errore nella cancellazione'));
      }
    });
  }


}
