import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './store.reducers';
import { metaReducers } from './store.meta-reducers';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    /*
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    /*
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
          They stateKey defines the name of the state used by the router-store reducer.
          This matches the key defined in the map of reducers
        */
      stateKey: 'router',
    }),
    /*
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),
    /*
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'NgRx Store DevTools',
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  exports: [StoreModule, EffectsModule, StoreDevtoolsModule, StoreRouterConnectingModule],
})
export class StateModule {}
