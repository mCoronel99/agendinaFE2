import { SettoreService } from 'src/app/api/settore/settore.service';
import { Injectable } from '@angular/core';
import * as SettoreActions from './settore.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from 'src/app/services/notification.service';
import { mergeMap } from 'rxjs';

@Injectable()
export class SettoreEffects{
    constructor(
        private actions$ : Actions,
        private settoreService: SettoreService,
        private notification : NotificationService
    ) {}

    loadSettore$ = createEffect(() =>
    this.actions$.pipe(
        ofType(SettoreActions.loadSettore),
        mergeMap(() =>
        this.settoreService.getSettori().then(
            (settore) => SettoreActions.loadSettoreSuccess({settore}),
            (error) => SettoreActions.loadSettoreFailure({error})
        ))
    ));

    addSettore$ = createEffect(() =>
    this.actions$.pipe(ofType(
        SettoreActions.addSettore),
        mergeMap(({settore}) =>
        this.settoreService.addSettore(settore).then(
            (res) => { this.notification.success('Aggiunto con successo!')
                       return SettoreActions.addSettoreSuccess({settore: res});
                    },
            (error) => { this.notification.error("Errore nell'aggiunta")
                return SettoreActions.addSettoreFailure({error})
            }
        ))
    ))

    editSettore$ = createEffect(() =>
    this.actions$.pipe(ofType(
        SettoreActions.editSettore),
        mergeMap(({settore}) =>
        this.settoreService.editSettore(settore).then(
            (res) => { this.notification.success('Modificato con successo!')
                       return SettoreActions.editSettoreSuccess({settore: res});
                    },
            (error) => { this.notification.error("Errore nella modifica")
                return SettoreActions.editSettoreFailure({error})
            }
        ))
    ))

    deleteSettore$ = createEffect(() =>
    this.actions$.pipe(ofType(
        SettoreActions.deleteSettore),
        mergeMap(({id}) =>
        this.settoreService.deleteSettore(id).then(
            (res) => { this.notification.success('Aggiunto con successo!')
                       return SettoreActions.deleteSettoreSuccess({id});
                    },
            (error) => { this.notification.error("Errore nell'aggiunta")
                return SettoreActions.addSettoreFailure({error})
            }
        ))
    ))
}
