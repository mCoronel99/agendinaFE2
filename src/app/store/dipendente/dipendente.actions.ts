import { Dipendente } from './dipendente.model';
import { createAction, props } from "@ngrx/store";

export const loadDipendente= createAction(
  '[Dipendente] Load Dipendente'
);
export const loadDipendenteSuccess = createAction(
  '[Dipendente] Load Dipendente Success',
props<{dipendente: Dipendente[]}>()
);
export const loadDipendenteFailure = createAction(
  '[Dipendente] Load Dipendente Failure',
  props<{error: any}>()
);

export const addDipendente = createAction (
  '[Dipendente] Add Dipendente',
  props<{dipendente: Dipendente}>()
);
export const addDipendenteSuccess = createAction(
  '[Dipendente] Add Dipendente Success',
  props<{dipendente: Dipendente}>()
);
export const addDipendenteFailure = createAction(
  '[Dipendente] Add Dipendente Failure',
  props<{error: any}>()
);

export const editDipendente = createAction(
  '[Dipendente] Edit Dipendente',
  props<{dipendente: Dipendente}>()
);
export const editDipendenteSuccess = createAction(
  '[Dipendente] Edit Dipendente Success',
  props<{dipendente: Dipendente}>()
);
export const editDipendenteFailure = createAction(
  '[Dipendente] Edit Dipendente Failure',
  props<{error: any}>()
);

export const deleteDipendente = createAction (
  '[Dipendente] Delete Dipendente',
  props<{id: number}>()
);
export const deleteDipendenteSuccess = createAction(
  '[Dipendente] Delete Dipendente Success',
  props<{id: number}>()
);
export const deleteDipendenteFailure = createAction(
  '[Dipendente] Delete Dipendente Failure',
props <{error : any}> ())


