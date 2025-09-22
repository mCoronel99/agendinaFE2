import { createReducer, on } from '@ngrx/store';
import * as ProgettoActions from './progetto.actions';
import { Progetto } from './progetto.model';
export interface ProgettoState {
    progettoList : Progetto[],
    loading: boolean,
    error: String | null
}

export const initialState: ProgettoState = {
    progettoList: [],
    loading: false,
    error: null
}

export const progettoReducer = createReducer(
    initialState,

    on(ProgettoActions.loadProgetto, (state) =>({
        ...state,
        loading: true,
        error: null
    })),

    on(ProgettoActions.loadProgettoSuccess,( state, {progetto})=>({
        ...state,
        progettoList: progetto,
        loading: false,
        error: null
    })),

    on(ProgettoActions.loadProgettoFailure,(state) =>({
        ...state,
        loading: false,
        error:'Errore durante il caricamento dei progetti'
    })),


    on(ProgettoActions.addProgetto, (state) => ({
      ...state,
      loading: true,
    })),

    on(ProgettoActions.addProgettoSuccess,(state, {progetto}) =>({
      ...state,
      progettoList: [...state.progettoList, progetto],
      loading: false,
      error: null
    })),

    on(ProgettoActions.addProgettoFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),


      on(ProgettoActions.editProgetto, (state) => ({
      ...state,
      loading: true,
    })),

    on(ProgettoActions.editProgettoSuccess,(state, {progetto}) =>({
      ...state,
      progettoList: state.progettoList.map(a =>
        a.id === progetto.id ? progetto : a
      ),
      loading: false,
      error: null
    })),

    on(ProgettoActions.editProgettoFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),


      on(ProgettoActions.deleteProgetto, (state) => ({
      ...state,
      loading: true,
    })),

    on(ProgettoActions.deleteProgettoSuccess,(state, {id}) =>({
      ...state,
      progettoList: state.progettoList.filter(a => a.id !== id),
      loading: false,
      error: null
    })),

    on(ProgettoActions.deleteProgettoFailure, (state, {error}) =>({
    ...state,
    loading: false,
    error,
})
    ),

)
