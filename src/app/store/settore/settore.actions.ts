import { Settore } from './settore.model';
import { createAction, props } from "@ngrx/store";

export const loadSettore = createAction('[Settore] Load Settore');
export const loadSettoreSuccess = createAction ('[Settore] Load Settore Success',
    props<{settore: Settore[]}>()
);
export const loadSettoreFailure = createAction (' [Settore] Load Settore Failure',
    props<{error: any}>()
);

export const addSettore = createAction ('[Settore] Add Settore',
    props<{settore: Settore}>()
);
export const addSettoreSuccess = createAction('[Settore] Add Settore Success',
    props<{settore: Settore}>()
);
export const addSettoreFailure = createAction('[Settore] Add Settore Failure',
    props<{ error: any}>()
)

export const editSettore = createAction ('[Settore] Edit Settore',
    props<{settore: Settore}>()
);
export const editSettoreSuccess = createAction('[Settore] Edit Settore Success',
    props<{settore: Settore}>()
);
export const editSettoreFailure = createAction('[Settore] Edit Settore Failure',
    props<{ error: any}>()
)

export const deleteSettore = createAction ('[Settore] Delete Settore',
    props<{id: number}>()
);
export const deleteSettoreSuccess = createAction('[Settore] Delete Settore Success',
    props<{id: number}>()
);
export const deleteSettoreFailure = createAction('[Settore] Delete Settore Failure',
    props<{ error: any}>()
)
