import { Progetto } from './progetto.model';
import { createAction, props } from "@ngrx/store";

export const loadProgetto = createAction('[Progetto] Load Progetto');
export const loadProgettoSuccess = createAction ('[Progetto] Load Progetto Success',
    props<{progetto: Progetto[]}>()
);
export const loadProgettoFailure = createAction (' [Progetto] Load Progetto Failure',
    props<{error: any}>()
);

export const addProgetto = createAction ('[Progetto] Add Progetto',
    props<{progetto: Progetto}>()
);
export const addProgettoSuccess = createAction('[Progetto] Add Progetto Success',
    props<{progetto: Progetto}>()
);
export const addProgettoFailure = createAction('[Progetto] Add Progetto Failure',
    props<{ error: any}>()
)

export const editProgetto = createAction ('[Progetto] Edit Progetto',
    props<{progetto: Progetto}>()
);
export const editProgettoSuccess = createAction('[Progetto] Edit Progetto Success',
    props<{progetto: Progetto}>()
);
export const editProgettoFailure = createAction('[Progetto] Edit Progetto Failure',
    props<{ error: any}>()
)

export const deleteProgetto = createAction ('[Progetto] Delete Progetto',
    props<{id: number}>()
);
export const deleteProgettoSuccess = createAction('[Progetto] Delete Progetto Success',
    props<{id: number}>()
);
export const deleteProgettoFailure = createAction('[Progetto] Delete Progetto Failure',
    props<{ error: any}>()
)
