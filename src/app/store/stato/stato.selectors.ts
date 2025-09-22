import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatoState } from "./stato.reducer";

export const selectStatoState = createFeatureSelector<StatoState>('stato');

export const selectStato = createSelector(
  selectStatoState,
  (state) => state.statoList
);

export const selectStatoLoading = createSelector(
  selectStatoState, (state) =>
    state.loading
);

export const selectStatoError = createSelector(
  selectStatoState,
  (state) => state.error
);
