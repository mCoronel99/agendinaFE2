import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProgettoDipendenteService } from "src/app/api/progettoDipendenti/progettoDipendenti.service";
import * as ProgettoDipendenteActions from './progettoDipendente.actions'
import { mergeMap, of } from "rxjs";
import { NotificationService } from "src/app/services/notification.service";

@Injectable()
export class ProgettoDipendenteEffects{
  constructor(
    private actions$: Actions,
    private progettoDipendenteService: ProgettoDipendenteService,
    private notification : NotificationService
  ){}
  loadProgettoDipendente$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProgettoDipendenteActions.loadProgettoDipendente),
    mergeMap(() =>
    this.progettoDipendenteService.getProgettoDipendenti().then(
      (progettoDipendente) => ProgettoDipendenteActions.loadProgettoDipendenteSuccess({progettoDipendente}),
      (error) => ProgettoDipendenteActions.loadProgettoDipendenteFailure({error})
    ))
  ));

 addProgettoDipendente$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProgettoDipendenteActions.addProgettoDipendente),
      // Estrai solo le 3 proprietà richieste
     mergeMap(({ progettoDipendente }) => {
  const idProgetto = progettoDipendente.id_progetto?.id;
  const idDipendente = progettoDipendente.id_dipendente?.id;
  const idRuolo = progettoDipendente.id_ruolo?.id;

  if (idDipendente && idProgetto && idRuolo) {
    return this.progettoDipendenteService
      .addProgettoDipendente({ idDipendente,idProgetto , idRuolo })
      .then(
        (res) => {
          this.notification.success('Aggiunto con successo!');
          return ProgettoDipendenteActions.addProgettoDipendenteSuccess({ progettoDipendente: res });
        },
        (error) => {
          if (error.status === 409) {
            this.notification.error('Errore! Il progetto dipendente esiste già.');
          } else {
            this.notification.error("Errore nell'aggiunta");
          }
          return ProgettoDipendenteActions.addProgettoDipendenteFailure({ error });
        }
      );
  } else {
    this.notification.error('Campi mancanti');
    return of(ProgettoDipendenteActions.addProgettoDipendenteFailure({ error: 'Campi mancanti' }));
  }
})
  )
);



  editProgettoDipendente$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProgettoDipendenteActions.editProgettoDipendente),
    mergeMap(({progettoDipendente}) =>
  this.progettoDipendenteService.editProgettoDipendente(progettoDipendente).then(
    () => {this.notification.success('Modificato con successo');
      return ProgettoDipendenteActions.editProgettoDipendenteSuccess({progettoDipendente})
    },
    (error) => {this.notification.error('Errore nella modifica');
      return ProgettoDipendenteActions.editProgettoDipendenteFailure({error});
    }
  ))
  ));

 deleteProgettoDipendente$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ProgettoDipendenteActions.deleteProgettoDipendente),
    mergeMap(({ idProgetto, idDipendente }) =>
      this.progettoDipendenteService.deleteProgettoDipendente(idProgetto, idDipendente).then(
        () => {
          this.notification.success('Cancellato con successo');
          return ProgettoDipendenteActions.deleteProgettoDipendenteSuccess({ idProgetto, idDipendente });
        },
        (error) => {
          this.notification.error('Errore nella cancellazione');
          return ProgettoDipendenteActions.deleteProgettoDipendenteFailure({ error });
        }
      )
    )
  )
);

}
