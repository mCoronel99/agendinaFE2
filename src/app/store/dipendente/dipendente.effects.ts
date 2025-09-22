import { Injectable } from '@angular/core';
import * as DipendenteActions from './dipendente.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DipendentiService } from 'src/app/api/dipendenti/dipendenti.service';
import { NotificationService } from 'src/app/services/notification.service';
import { mergeMap } from 'rxjs';

@Injectable()
export class DipendenteEffects{
    constructor(
        private actions$: Actions,
        private dipendenteService: DipendentiService,
        private notification: NotificationService
    ){}
    loadDipendente$ = createEffect(() =>
    this.actions$.pipe(
        ofType(DipendenteActions.loadDipendente),
        mergeMap(() =>
        this.dipendenteService.getDipendenti().then(
            (dipendente) => DipendenteActions.loadDipendenteSuccess({dipendente}),
            (error) => DipendenteActions.loadDipendenteFailure({error})
        ))
    ));

    addDipendente$ = createEffect(()=>
    this.actions$.pipe(
        ofType(DipendenteActions.addDipendente),
        mergeMap(({dipendente}) =>
        this.dipendenteService.addDipendente(dipendente).then(
            (res) =>{
                this.notification.success('Aggiungo con successo!');
                return DipendenteActions.addDipendenteSuccess({dipendente: res})
            },
            (error) => {
                this.notification.error("Errore nell'aggiunta");
                return DipendenteActions.addDipendenteFailure({error})
            }
        ))
    ))

    editDipendente$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DipendenteActions.editDipendente),
      mergeMap(({dipendente}) =>
      this.dipendenteService.editDipendente(dipendente).then(
        () => {this.notification.success("Modificato con successo!");
        return DipendenteActions.editDipendenteSuccess({dipendente})
    },
        (error) => {this.notification.error('Errore nella modifica');
            return DipendenteActions.editDipendenteFailure({error})
        }
)))
);

    deleteDipendente$ = createEffect(() =>
    this.actions$.pipe(
        ofType(DipendenteActions.deleteDipendente),
        mergeMap(({id}) =>
        this.dipendenteService.deleteDipendente(id).then(
            () => {
                this.notification.success('Cancellato con successo!');
                return DipendenteActions.deleteDipendenteSuccess({id})
            },
            (error) => {this.notification.error("Errore nella cancellazione");
            return DipendenteActions.deleteDipendenteFailure({error})
        }
        ))
    ))
}
