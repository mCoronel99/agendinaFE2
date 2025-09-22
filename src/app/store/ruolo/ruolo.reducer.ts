import { createReducer, on } from '@ngrx/store';
import * as RuoloActions from './ruolo.actions';
import { Ruolo } from './ruolo.model';
export interface RuoloState {
    ruoloList : Ruolo[],
    loading: boolean,
    error: String | null
}

export const initialState: RuoloState = {
    ruoloList: [],
    loading: false,
    error: null
}

export const ruoloReducer = createReducer(
    initialState,

    on(RuoloActions.loadRuolo, (state) =>({
        ...state,
        loading: true,
        error: null
    })),

    on(RuoloActions.loadRuoloSuccess,( state, {ruolo})=>({
        ...state,
        ruoloList: ruolo,
        loading: false,
        error: null
    })),

    on(RuoloActions.loadRuoloFailure,(state) =>({
        ...state,
        loading: false,
        error:'Errore durante il caricamento dei ruoli'
    })),


    on(RuoloActions.addRuolo, (state) => ({
      ...state,
      loading: true,
    })),

    on(RuoloActions.addRuoloSuccess,(state, {ruolo}) =>({
      ...state,
      ruoloList: [...state.ruoloList, ruolo],
      loading: false,
      error: null
    })),

    on(RuoloActions.addRuoloFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),


      on(RuoloActions.editRuolo, (state) => ({
      ...state,
      loading: true,
    })),

    on(RuoloActions.editRuoloSuccess,(state, {ruolo}) =>({
      ...state,
      ruoloList: state.ruoloList.map(a =>
        a.id === ruolo.id ? ruolo : a
      ),
      loading: false,
      error: null
    })),

    on(RuoloActions.editRuoloFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),


      on(RuoloActions.deleteRuolo, (state) => ({
      ...state,
      loading: true,
    })),

    on(RuoloActions.deleteRuoloSuccess,(state, {id}) =>({
      ...state,
      ruoloList: state.ruoloList.filter(a => a.id !== id),
      loading: false,
      error: null
    })),

    on(RuoloActions.deleteRuoloFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),

)
