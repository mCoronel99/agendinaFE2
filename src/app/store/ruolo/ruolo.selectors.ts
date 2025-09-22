import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RuoloState } from "./ruolo.reducer";

export const selectRuoloState = createFeatureSelector<RuoloState>('ruolo');

export const selectRuolo = createSelector(
  selectRuoloState,
  (state) => state.ruoloList
);

export const selectRuoloLoading = createSelector(
  selectRuoloState, (state) =>
    state.loading
);

export const selectRuoloError = createSelector(
  selectRuoloState,
  (state) => state.error
);
