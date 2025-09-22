import { createReducer, on } from '@ngrx/store';
import * as AttivitaActions from './attivita.actions'
import { Attivita } from './attivita.model'

export interface AttivitaState {
  attivitaList : Attivita[];
  loading: boolean;
  error: String | null;
}

export const initialState: AttivitaState = {
  attivitaList: [],
  loading: false,
  error: null,
}

export const attivitaReducer = createReducer(
  initialState,

  on(AttivitaActions.loadAttivita, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AttivitaActions.loadAttivitaSuccess,(state ,{attivita}) => ({
    ...state,
    attivitaList: attivita,
    loading: false,
    error: null,
  })),

  on(AttivitaActions.loadAttivitaFailure,(state) => ({
    ...state,
    loading: false,
    error: 'Errore durante il caricamento delle attività'
  })),


  on(AttivitaActions.addAttivita, (state) => ({
    ...state,
    loading:true,
  })),

  on(AttivitaActions.addAttivitaSuccess, (state, {attivita}) => ({
    ...state,
    attivitaList: [...state.attivitaList, attivita],
    loading: false,
    error: null
  })),

  on(AttivitaActions.addAttivitaFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AttivitaActions.editAttivita, (state) => ({
    ...state,
    loading: true,
  })),

  on(AttivitaActions.editAttivitaSuccess, (state, {attivita}) => ({
    ...state,
    attivitaList: state.attivitaList.map(a =>
      a.id === attivita.id ? attivita :a
    ),
    loading:false,
    error: null,
  })),

  on(AttivitaActions.editAttivitaFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AttivitaActions.deleteAttivita, (state) =>({
    ...state,
    loading:true,
  })),

  on( AttivitaActions.deleteAttivitaSuccess, (state, {id}) => ({
...state,
attivitaList: state.attivitaList.filter(a => a.id !== id),
loading:false,
error: null
  })),

  on (AttivitaActions.deleteAttivitaFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
  }))
)

