import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SettoreState } from "./settore.reducer";

export const selectSettoreState = createFeatureSelector<SettoreState>('settore');

export const selectSettore = createSelector(
  selectSettoreState,
  (state) => state.settoreList
);

export const selectSettoreLoading = createSelector(
  selectSettoreState, (state) =>
    state.loading
);

export const selectSettoreError = createSelector(
  selectSettoreState,
  (state) => state.error
);
