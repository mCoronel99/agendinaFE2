import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProgettoState } from "./progetto.reducer";

export const selectProgettoState = createFeatureSelector<ProgettoState>('progetto');

export const selectProgetto = createSelector(
  selectProgettoState,
  (state) => state.progettoList
);

export const selectProgettoLoading = createSelector(
  selectProgettoState, (state) =>
    state.loading
);

export const selectProgettoError = createSelector(
  selectProgettoState,
  (state) => state.error
);
