import { ProgettoDipendente } from './progettoDipendente.model';
import { createAction, props } from "@ngrx/store";

export const loadProgettoDipendente = createAction('[ProgettoDipendente] Load ProgettoDipendente');
export const loadProgettoDipendenteSuccess = createAction ('[ProgettoDipendente] Load ProgettoDipendente Success',
    props<{progettoDipendente: ProgettoDipendente[]}>()
);
export const loadProgettoDipendenteFailure = createAction (' [ProgettoDipendente] Load ProgettoDipendente Failure',
    props<{error: any}>()
);

export const addProgettoDipendente = createAction ('[ProgettoDipendente] Add ProgettoDipendente',
    props<{progettoDipendente: ProgettoDipendente}>()
);
export const addProgettoDipendenteSuccess = createAction('[ProgettoDipendente] Add ProgettoDipendente Success',
    props<{progettoDipendente: ProgettoDipendente}>()
);
export const addProgettoDipendenteFailure = createAction('[ProgettoDipendente] Add ProgettoDipendente Failure',
    props<{ error: any}>()
)

export const editProgettoDipendente = createAction ('[ProgettoDipendente] Edit ProgettoDipendente',
    props<{progettoDipendente: ProgettoDipendente}>()
);
export const editProgettoDipendenteSuccess = createAction('[ProgettoDipendente] Edit ProgettoDipendente Success',
    props<{progettoDipendente: ProgettoDipendente}>()
);
export const editProgettoDipendenteFailure = createAction('[ProgettoDipendente] Edit ProgettoDipendente Failure',
    props<{ error: any}>()
)

export const deleteProgettoDipendente = createAction ('[ProgettoDipendente] Delete ProgettoDipendente',
    props<{ idProgetto: number; idDipendente: number }>()
);
export const deleteProgettoDipendenteSuccess = createAction('[ProgettoDipendente] Delete ProgettoDipendente Success',
    props<{ idProgetto: number; idDipendente: number }>()
);
export const deleteProgettoDipendenteFailure = createAction('[ProgettoDipendente] Delete ProgettoDipendente Failure',
    props<{ error: any}>()
)
