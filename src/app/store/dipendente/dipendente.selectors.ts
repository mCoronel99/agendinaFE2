import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DipendenteState } from "./dipendente.reducer";

export const selectDipendenteState = createFeatureSelector<DipendenteState>('dipendente');

export const selectDipendente = createSelector(
  selectDipendenteState,
  (state) => state.dipendenteList
);

export const selectDipendenteLoading = createSelector(
  selectDipendenteState, (state) =>
    state.loading,
);

export const selectDipendenteError = createSelector(
  selectDipendenteState,
  (state) => state.error
);
