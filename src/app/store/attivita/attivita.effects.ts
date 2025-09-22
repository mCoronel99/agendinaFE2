import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AttivitaService } from "src/app/api/attivita/attivitaService";
import * as AttivitaActions from './attivita.actions'
import { mergeMap } from "rxjs";
import { NotificationService } from "src/app/services/notification.service";

@Injectable()
export class AttivitaEffects{
  constructor(
    private actions$: Actions,
    private attivitaService: AttivitaService,
    private notification : NotificationService
  ){}
  loadAttivita$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AttivitaActions.loadAttivita),
    mergeMap(() =>
    this.attivitaService.getAttivita().then(
      (attivita) => AttivitaActions.loadAttivitaSuccess({attivita}),
      (error) => AttivitaActions.loadAttivitaFailure({error})
    ))
  ));

 addAttivita$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AttivitaActions.addAttivita),
    mergeMap(({ attivita }) =>
      this.attivitaService.addAttivita(attivita).then(
        (res) => {
          this.notification.success('Aggiunto con successo!');
          return AttivitaActions.addAttivitaSuccess({ attivita: res });
        },
        (error) => {
          this.notification.error("Errore nell'aggiunta");
          return AttivitaActions.addAttivitaFailure({ error });
        }
      )
    )
  )
);


  editAttivita$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AttivitaActions.editAttivita),
    mergeMap(({attivita}) =>
  this.attivitaService.editAttivita(attivita).then(
    () => {this.notification.success('Modificato con successo');
      return AttivitaActions.editAttivitaSuccess({attivita})
    },
    (error) => {this.notification.error('Errore nella modifica');
      return AttivitaActions.editAttivitaFailure({error});
    }
  ))
  ));

 deleteAttivita$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AttivitaActions.deleteAttivita),
    mergeMap(({ id }) =>
      this.attivitaService.deleteAttivita(id).then(
        () => {
          this.notification.success('Cancellato con successo');
          return AttivitaActions.deleteAttivitaSuccess({ id });
        },
        (error) => {
          this.notification.error('Errore nella cancellazione');
          return AttivitaActions.deleteAttivitaFailure({ error });
        }
      )
    )
  )
);

}
