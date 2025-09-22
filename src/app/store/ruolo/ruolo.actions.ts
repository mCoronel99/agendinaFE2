import { Ruolo } from './ruolo.model';
import { createAction, props } from "@ngrx/store";

export const loadRuolo = createAction('[Ruolo] Load Ruolo');
export const loadRuoloSuccess = createAction ('[Ruolo] Load Ruolo Success',
    props<{ruolo: Ruolo[]}>()
);
export const loadRuoloFailure = createAction (' [Ruolo] Load Ruolo Failure',
    props<{error: any}>()
);

export const addRuolo = createAction ('[Ruolo] Add Ruolo',
    props<{ruolo: Ruolo}>()
);
export const addRuoloSuccess = createAction('[Ruolo] Add Ruolo Success',
    props<{ruolo: Ruolo}>()
);
export const addRuoloFailure = createAction('[Ruolo] Add Ruolo Failure',
    props<{ error: any}>()
)

export const editRuolo = createAction ('[Ruolo] Edit Ruolo',
    props<{ruolo: Ruolo}>()
);
export const editRuoloSuccess = createAction('[Ruolo] Edit Ruolo Success',
    props<{ruolo: Ruolo}>()
);
export const editRuoloFailure = createAction('[Ruolo] Edit Ruolo Failure',
    props<{ error: any}>()
)

export const deleteRuolo = createAction ('[Ruolo] Delete Ruolo',
    props<{id: number}>()
);
export const deleteRuoloSuccess = createAction('[Ruolo] Delete Ruolo Success',
    props<{id: number}>()
);
export const deleteRuoloFailure = createAction('[Ruolo] Delete Ruolo Failure',
    props<{ error: any}>()
)
