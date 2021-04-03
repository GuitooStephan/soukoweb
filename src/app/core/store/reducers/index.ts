import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { loadingReducer } from './loading.reducers';
import { userReducer } from './user.reducers';
import { errorReducer } from './error.reducers';
import * as deepmerge from 'deepmerge';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeReducer } from './store.reducers';
import { cartReducer } from './cart.reducers';

declare var _: any;

const INIT_ACTION = '@ngrx/store/init';
const UPDATE_ACTION = '@ngrx/store/update-reducers';

export const appStateFeatureKey = 'souko';

export interface State {
    loading: boolean;
    user: any | null;
    store: any | null;
    error: any | null;
    cart: any | null;
}

export const reducers: ActionReducerMap<State> = {
    loading: loadingReducer,
    user: userReducer,
    store: storeReducer,
    error: errorReducer,
    cart: cartReducer
};

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    // tslint:disable-next-line: max-line-length
    return localStorageSync({
        keys: ['user', 'store'],
        rehydrate: true, removeOnUndefined: true,
        mergeReducer: (state: any, rehydratedState: any, action: any) => {
            if ((action.type === INIT_ACTION || action.type === UPDATE_ACTION) && !_.isEmpty(rehydratedState)) {
            const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;
            const options: deepmerge.Options = {
                arrayMerge: overwriteMerge
            };
            state = deepmerge(state, rehydratedState, options);
            }
            return state;
        }
    })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];
