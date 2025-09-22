import { createReducer, on } from '@ngrx/store';
import * as StatoActions from './stato.actions';
import { Stato } from './stato.model';
export interface StatoState {
    statoList : Stato[],
    loading: boolean,
    error: String | null
}

export const initialState: StatoState = {
    statoList: [],
    loading: false,
    error: null
}

export const statoReducer = createReducer(
    initialState,

    on(StatoActions.loadStato, (state) =>({
        ...state,
        loading: true,
        error: null
    })),

    on(StatoActions.loadStatoSuccess,( state, {stato})=>({
        ...state,
        statoList: stato,
        loading: false,
        error: null
    })),

    on(StatoActions.loadStatoFailure,(state) =>({
        ...state,
        loading: false,
        error:'Errore durante il caricamento degli Stati'
    })),


)
