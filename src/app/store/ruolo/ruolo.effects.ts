
import { Injectable } from '@angular/core';
import * as RuoloActions from './ruolo.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from 'src/app/services/notification.service';
import { mergeMap } from 'rxjs';
import { RuoliService } from 'src/app/api/ruoli/ruoli.service';

@Injectable()
export class RuoloEffects{
    constructor(
        private actions$ : Actions,
        private ruoloService: RuoliService,
        private notification : NotificationService
    ) {}

    loadRuolo$ = createEffect(() =>
    this.actions$.pipe(
        ofType(RuoloActions.loadRuolo),
        mergeMap(() =>
        this.ruoloService.getRuoli().then(
            (ruolo) => RuoloActions.loadRuoloSuccess({ruolo}),
            (error) => RuoloActions.loadRuoloFailure({error})
        ))
    ));

    addRuolo$ = createEffect(() =>
    this.actions$.pipe(ofType(
        RuoloActions.addRuolo),
        mergeMap(({ruolo}) =>
        this.ruoloService.addRuolo(ruolo).then(
            (res) => { this.notification.success('Aggiunto con successo!')
                       return RuoloActions.addRuoloSuccess({ruolo: res});
                    },
            (error) => { this.notification.error("Errore nell'aggiunta")
                return RuoloActions.addRuoloFailure({error})
            }
        ))
    ))

    editRuolo$ = createEffect(() =>
    this.actions$.pipe(ofType(
        RuoloActions.editRuolo),
        mergeMap(({ruolo}) =>
        this.ruoloService.editRuolo(ruolo).then(
            (res) => { this.notification.success('Modificato con successo!')
                       return RuoloActions.editRuoloSuccess({ruolo: res});
                    },
            (error) => { this.notification.error("Errore nella modifica")
                return RuoloActions.editRuoloFailure({error})
            }
        ))
    ))

    deleteRuolo$ = createEffect(() =>
    this.actions$.pipe(ofType(
        RuoloActions.deleteRuolo),
        mergeMap(({id}) =>
        this.ruoloService.deleteRuolo(id).then(
            (res) => { this.notification.success('Aggiunto con successo!')
                       return RuoloActions.deleteRuoloSuccess({id});
                    },
            (error) => { this.notification.error("Errore nell'aggiunta")
                return RuoloActions.addRuoloFailure({error})
            }
        ))
    ))
}
