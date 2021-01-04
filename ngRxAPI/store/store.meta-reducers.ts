import { MetaReducer, ActionReducer } from '@ngrx/store';
import { AppState } from './store.model';
import { environment } from '../../../environments/environment';

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: any): AppState => {
    return reducer(state, action);
  };
}
