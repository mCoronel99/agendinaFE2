import { Attivita } from './attivita.model';
import { createAction, props } from "@ngrx/store";

export const loadAttivita = createAction('[Attivita] Load Attivita');
export const loadAttivitaSuccess = createAction(
  '[Attivita] Load Attivita Success',
  props<{attivita: Attivita[]}>()
);
export const loadAttivitaFailure = createAction(
  '[Attivita] Load Attivita Failure',
  props<{ error: any}>()
);

export const addAttivita = createAction(
  '[Attivita] Add Attivita',
  props<{attivita: Attivita}>()
);
export const addAttivitaSuccess = createAction(
  '[Attivita] Add Attivita Success',
  props<{attivita: Attivita}>()
);
export const addAttivitaFailure = createAction(
  '[Attivita] Add Attivita Failure',
  props<{error: any}>()
);

export const editAttivita = createAction(
  '[Attivita] Edit Attivita',
  props<{attivita: Attivita}>()
);
export const editAttivitaSuccess = createAction(
  '[Attivita] Edit Attivita Success',
  props<{attivita: Attivita}>()
);
export const editAttivitaFailure = createAction(
  '[Attivita] Edit Attivita Failure',
  props<{error: any}>()
);

export const deleteAttivita = createAction(
  '[Attivita] Delete Attivita',
  props<{id: number}>()
);
export const deleteAttivitaSuccess = createAction(
  '[Attivita] Delete Attivita Success',
  props<{id: number}>()
);
export const deleteAttivitaFailure = createAction(
  '[Attivita] Delete Attivita Failure',
  props<{error: any}>()
);

