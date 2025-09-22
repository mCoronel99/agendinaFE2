import { createReducer, on } from '@ngrx/store';
import * as DipendenteActions from './dipendente.actions';
import { Dipendente } from './dipendente.model';

export interface DipendenteState {
    dipendenteList :Dipendente[];
    loading: boolean;
    error: String | null
}

export const initialState: DipendenteState = {
    dipendenteList: [],
    loading: false,
    error: null
}

export const dipendenteReducer = createReducer(
    initialState,

    on(DipendenteActions.loadDipendente,(state) =>({
        ...state,
        loading: true,
        error: null
    })),

    on(DipendenteActions.loadDipendenteSuccess,(state, {dipendente}) => ({
        ...state,
        dipendenteList: dipendente,
        loading: false,
        error: null
    })),

    on(DipendenteActions.loadDipendenteFailure,(state) => ({
      ...state,
      loading: false,
      error: 'Errore durante il caricamento dei dipendenti'
    })),


    on(DipendenteActions.addDipendente, (state) =>
    ({ ...state,
      loading: false
    })),

    on(DipendenteActions.addDipendenteSuccess, (state, {dipendente}) =>({
      ...state,
      dipendenteList: [...state.dipendenteList, dipendente],
      loading: false,
      error: null,
    })),

    on(DipendenteActions.addDipendenteFailure, (state, {error}) => ({
      ...state,
      loading: false,
      error,
    })),


    on(DipendenteActions.editDipendente, (state) =>({
      ...state,
      loading:true,
    })
  ),

    on(DipendenteActions.editDipendenteSuccess, (state, {dipendente}) =>({
      ...state,
      dipendenteList: state.dipendenteList.map( a =>
        a.id === dipendente.id ? dipendente : a
      ),
      loading: false,
      error: null
    })),

    on(DipendenteActions.editDipendenteFailure, (state, {error}) =>({
    ...state,
  loading: false,
error,
    })),


    on(DipendenteActions.deleteDipendente, (state) =>({
      ...state,
      loading: true
    })),

    on(DipendenteActions.deleteDipendenteSuccess, (state, {id}) =>({
      ...state,
      dipendenteList: state.dipendenteList.filter(a => a.id !== id),
      loading: false,
      error: null
    })),

    on(DipendenteActions.deleteDipendenteFailure, (state, {error}) =>({
      ...state,
      loading: false,
      error,
    }))



)
