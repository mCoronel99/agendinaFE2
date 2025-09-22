import { createReducer, on } from '@ngrx/store';
import * as SettoreActions from './settore.actions';
import { Settore } from './settore.model';
export interface SettoreState {
    settoreList : Settore[],
    loading: boolean,
    error: String | null
}

export const initialState: SettoreState = {
    settoreList: [],
    loading: false,
    error: null
}

export const settoreReducer = createReducer(
    initialState,

    on(SettoreActions.loadSettore, (state) =>({
        ...state,
        loading: true,
        error: null
    })),

    on(SettoreActions.loadSettoreSuccess,( state, {settore})=>({
        ...state,
        settoreList: settore,
        loading: false,
        error: null
    })),

    on(SettoreActions.loadSettoreFailure,(state) =>({
        ...state,
        loading: false,
        error:'Errore durante il caricamento dei settori'
    })),


    on(SettoreActions.addSettore, (state) => ({
      ...state,
      loading: true,
    })),

    on(SettoreActions.addSettoreSuccess,(state, {settore}) =>({
      ...state,
      settoreList: [...state.settoreList, settore],
      loading: false,
      error: null
    })),

    on(SettoreActions.addSettoreFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),


      on(SettoreActions.editSettore, (state) => ({
      ...state,
      loading: true,
    })),

    on(SettoreActions.editSettoreSuccess,(state, {settore}) =>({
      ...state,
      settoreList: state.settoreList.map(a =>
        a.id === settore.id ? settore : a
      ),
      loading: false,
      error: null
    })),

    on(SettoreActions.editSettoreFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),


      on(SettoreActions.deleteSettore, (state) => ({
      ...state,
      loading: true,
    })),

    on(SettoreActions.deleteSettoreSuccess,(state, {id}) =>({
      ...state,
      settoreList: state.settoreList.filter(a => a.id !== id),
      loading: false,
      error: null
    })),

    on(SettoreActions.deleteSettoreFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),

)
