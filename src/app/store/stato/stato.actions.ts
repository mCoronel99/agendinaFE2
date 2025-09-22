import { Stato } from './stato.model';
import { createAction, props } from "@ngrx/store";

export const loadStato = createAction('[Stato] Load Stato');
export const loadStatoSuccess = createAction ('[Stato] Load Stato Success',
    props<{stato: Stato[]}>()
);
export const loadStatoFailure = createAction (' [Stato] Load Stato Failure',
    props<{error: any}>()
);

