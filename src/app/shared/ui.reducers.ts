import { Action, createReducer, on } from '@ngrx/store';
import { isLoading,stopLoading } from './ui.actions';

export interface State {
    isLoading: boolean;
    //stopLoading:boolean;
}

export const initialState: State = {
  isLoading: false,
  //stopLoading:true
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, isLoading: true})),
    on(stopLoading, state => ({ ...state, isLoading: false}))

);

export function uiReducer(state: State | undefined, action: Action<string>) {
    return _uiReducer(state, action);
}
