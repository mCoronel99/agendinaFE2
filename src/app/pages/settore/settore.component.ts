import { SettoreService } from './../../api/settore/settore.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettoreModal } from 'src/app/components/modals/settore-modal/settore.modal';
import { ConfirmationModal } from 'src/app/components/modals/confirmation-modal/confirmation.modal';
import { Settore } from 'src/app/model/settore.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as SettoreActions from '../../store/settore/settore.actions';
import { selectSettore } from 'src/app/store/settore/settore.selectors';

@Component({
  selector: 'app-settori',
  templateUrl: './settore.component.html',
  styleUrls: ['./settore.component.css'],
})
export class SettoriComponent implements OnInit {
  dataSource$!: Observable<Settore[]>;
  displayedColumns: string[] = ['id', 'id_capo', 'nome', 'azioni'];

  constructor(
    private settoreService: SettoreService,
    public dialog: MatDialog,
    private notification: NotificationService,
    private toastr: ToastrService,
    private store: Store
  ) {}

  async ngOnInit() {
    this.store.dispatch(SettoreActions.loadSettore())
    this.dataSource$ = this.store.select(selectSettore).pipe(
      map(settore => settore ?? [])
    )
  }

  addSettore() {
    const dialogueRef = this.dialog.open(SettoreModal, {
      data: null,
      restoreFocus:false
    });

    dialogueRef.afterClosed().subscribe(async (settore: Settore) => {
      if (settore) {
        this.store.dispatch(SettoreActions.addSettore({settore}))
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
        this.store.dispatch(SettoreActions.editSettore({settore}))
      }
    });
  }

  deleteSettore(sett: Settore) {
    const dialogRef = this.dialog.open(ConfirmationModal,{restoreFocus:false});

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
      this.store.dispatch(SettoreActions.deleteSettore({id: sett.id!}))
    }
    });
  }


}
