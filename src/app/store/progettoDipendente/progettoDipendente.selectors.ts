import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProgettoDipendenteState } from "./progettoDipendente.reducer";

export const selectProgettoDipendenteState = createFeatureSelector<ProgettoDipendenteState>('progettoDipendente');

export const selectProgettoDipendente = createSelector(
  selectProgettoDipendenteState,
  (state) => state.progettoDipendenteList
);

export const selectProgettoDipendenteLoading = createSelector(
  selectProgettoDipendenteState, (state) =>
    state.loading
);

export const selectProgettoDipendenteError = createSelector(
  selectProgettoDipendenteState,
  (state) => state.error
);
