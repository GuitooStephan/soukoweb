import {
    createReducer,
    Action,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';


export interface AppState {
    souko: any;
}

export const initialState: AppState = {
    souko: {}
};

const rootReducerConstructor = createReducer(
    initialState
);

export function rootReducer(state: AppState | undefined, action: Action) {
    return rootReducerConstructor( state, action );
}

export const rootReducers: ActionReducerMap<AppState> = {
    souko: rootReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
