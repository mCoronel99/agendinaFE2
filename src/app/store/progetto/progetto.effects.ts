import { ProgettoService } from 'src/app/api/progetto/progetto.service';
import { Injectable } from '@angular/core';
import * as ProgettoActions from './progetto.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from 'src/app/services/notification.service';
import { mergeMap } from 'rxjs';

@Injectable()
export class ProgettoEffects{
    constructor(
        private actions$ : Actions,
        private progettoService: ProgettoService,
        private notification : NotificationService
    ) {}

    loadProgetto$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ProgettoActions.loadProgetto),
        mergeMap(() =>
        this.progettoService.getProgetti().then(
            (progetto) => ProgettoActions.loadProgettoSuccess({progetto}),
            (error) => ProgettoActions.loadProgettoFailure({error})
        ))
    ));

    addProgetto$ = createEffect(() =>
    this.actions$.pipe(ofType(
        ProgettoActions.addProgetto),
        mergeMap(({progetto}) =>
        this.progettoService.addProgetto(progetto).then(
            (res) => { this.notification.success('Aggiunto con successo!')
                       return ProgettoActions.addProgettoSuccess({progetto: res});
                    },
            (error) => { this.notification.error("Errore nell'aggiunta")
                return ProgettoActions.addProgettoFailure({error})
            }
        ))
    ))

    editProgetto$ = createEffect(() =>
    this.actions$.pipe(ofType(
        ProgettoActions.editProgetto),
        mergeMap(({progetto}) =>
        this.progettoService.editProgetto(progetto).then(
            (res) => { this.notification.success('Modificato con successo!')
                       return ProgettoActions.editProgettoSuccess({progetto: res});
                    },
            (error) => { this.notification.error("Errore nella modifica")
                return ProgettoActions.editProgettoFailure({error})
            }
        ))
    ))

    deleteProgetto$ = createEffect(() =>
    this.actions$.pipe(ofType(
        ProgettoActions.deleteProgetto),
        mergeMap(({id}) =>
        this.progettoService.deleteProgetto(id).then(
            () => { this.notification.success('Aggiunto con successo!')
                       return ProgettoActions.deleteProgettoSuccess({id});
                    },
            (error) => { this.notification.error("Errore nell'aggiunta")
                return ProgettoActions.addProgettoFailure({error})
            }
        ))
    ))
}
