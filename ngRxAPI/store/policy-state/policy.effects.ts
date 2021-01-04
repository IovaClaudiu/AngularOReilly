import { PolicyError } from './policy.error';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import * as actions from './policy.actions';
import { HttpRequestsService } from '../../services/http-requests.service';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store.model';
import * as selectors from './policy.selector';
import { SessionStorageService } from '../../services/sessionStorage.service';
import { ITEMS } from '../../../shared/enum/items.enum';

@Injectable()
export class PolicyEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly httpRequestsService: HttpRequestsService,
    private readonly store: Store<AppState>,
    private sessionStorageService: SessionStorageService
  ) {}

  fetchPolicy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPolicy),
      withLatestFrom(this.store.pipe(select(selectors.selectSelectedPolicy))),
      switchMap(([payload, selectedPolicy]) => this.httpRequestsService.getPolicyOverview(selectedPolicy)),
      map((data) => actions.fetchPolicySuccess(data)),
      catchError((error: PolicyError) => of(actions.fetchPolicyError(error)))
    )
  );

  setPolicy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.setPolicy),
      switchMap((data) => {
        this.sessionStorageService.setItem(ITEMS.POLICY_ID, data.payload);
        return of(actions.setPolicySuccess());
      })
    )
  );
}
