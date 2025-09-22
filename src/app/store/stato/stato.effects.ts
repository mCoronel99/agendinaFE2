import { StatiService } from 'src/app/api/stati/statiService';
import { Injectable } from '@angular/core';
import * as StatoActions from './stato.actions'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs';

@Injectable()
export class StatoEffects{
    constructor(
        private actions$ : Actions,
        private statoService: StatiService,

    ) {}

    loadStato$ = createEffect(() =>
    this.actions$.pipe(
        ofType(StatoActions.loadStato),
        mergeMap(() =>
        this.statoService.getStati().then(
            (stato) => StatoActions.loadStatoSuccess({stato}),
            (error) => StatoActions.loadStatoFailure({error})
        ))
    ));

  }
