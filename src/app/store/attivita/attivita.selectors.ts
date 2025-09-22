import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AttivitaState } from './attivita.reducer';


export const selectAttivitaState = createFeatureSelector<AttivitaState>('attivita');

export const selectAttivita = createSelector(
  selectAttivitaState,
  (state) => state.attivitaList
);

export const selectAttivitaLoading = createSelector(
  selectAttivitaState, (state) =>
    state.loading
);

export const selectAttivitaError = createSelector(
  selectAttivitaState,
  (state) => state.error
);
