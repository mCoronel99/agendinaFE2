import { createReducer, on } from '@ngrx/store';
import * as ProgettoDipendenteActions from './progettoDipendente.actions';
import { ProgettoDipendente } from './progettoDipendente.model';
export interface ProgettoDipendenteState {
    progettoDipendenteList : ProgettoDipendente[],
    loading: boolean,
    error: String | null
}

export const initialState: ProgettoDipendenteState = {
    progettoDipendenteList: [],
    loading: false,
    error: null
}

export const progettoDipendenteReducer = createReducer(
    initialState,

    on(ProgettoDipendenteActions.loadProgettoDipendente, (state) =>({
        ...state,
        loading: true,
        error: null
    })),

    on(ProgettoDipendenteActions.loadProgettoDipendenteSuccess,( state, {progettoDipendente})=>({
        ...state,
        progettoDipendenteList: progettoDipendente,
        loading: false,
        error: null
    })),

    on(ProgettoDipendenteActions.loadProgettoDipendenteFailure,(state) =>({
        ...state,
        loading: false,
        error:'Errore durante il caricamento dei settori'
    })),


    on(ProgettoDipendenteActions.addProgettoDipendente, (state) => ({
      ...state,
      loading: true,
    })),

    on(ProgettoDipendenteActions.addProgettoDipendenteSuccess,(state, {progettoDipendente}) =>({
      ...state,
      progettoDipendenteList: [...state.progettoDipendenteList, progettoDipendente],
      loading: false,
      error: null
    })),

    on(ProgettoDipendenteActions.addProgettoDipendenteFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),


     // === EDIT ===
  on(ProgettoDipendenteActions.editProgettoDipendente, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProgettoDipendenteActions.editProgettoDipendenteSuccess, (state, { progettoDipendente }) => ({
    ...state,
    progettoDipendenti: state.progettoDipendenteList.map(pd =>
      pd.id_dipendente?.id === progettoDipendente.id_dipendente?.id &&
      pd.id_progetto?.id === progettoDipendente.id_progetto?.id
        ? progettoDipendente
        : pd
    ),
    loading: false
  })),
  on(ProgettoDipendenteActions.editProgettoDipendenteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // === DELETE ===
  on(ProgettoDipendenteActions.deleteProgettoDipendente, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProgettoDipendenteActions.deleteProgettoDipendenteSuccess, (state, { idProgetto, idDipendente }) => ({
    ...state,
    progettoDipendenti: state.progettoDipendenteList.filter(
      pd =>
        pd.id_progetto?.id !== idProgetto ||
        pd.id_dipendente?.id !== idDipendente
    ),
    loading: false
  })),
  on(ProgettoDipendenteActions.deleteProgettoDipendenteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
