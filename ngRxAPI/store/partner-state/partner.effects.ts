import { PartnerError } from './partner.error';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as actions from './partner.actions';
import { HttpRequestsService } from '../../services/http-requests.service';
import { of } from 'rxjs';
import { PartnerPolicyResponse } from '../../../shared/interfaces/partnerPolicyResponse.model';
import { SessionStorageService } from '../../services/sessionStorage.service';
import { SearchPartnerHeaders } from 'src/app/shared/interfaces/searchPartnerHeaders.model';
import { ITEMS } from '../../../shared/enum/items.enum';
import { Partner } from '../../../shared/interfaces/partner.model';

@Injectable()
export class PartnerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly httpRequestsService: HttpRequestsService,
    private sessionStorageService: SessionStorageService
  ) {}

  fetchPartners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPartners),
      map((action) => action.payload),
      switchMap((payload) => {
        this.setSearchCriteriaInSessionStorage(payload);
        return this.httpRequestsService.searchPartner(payload);
      }),
      map((data: Partner[]) => actions.fetchPartnersSuccess(data)),
      catchError((error: PartnerError) => of(actions.fetchPartnersError(error)))
    )
  );

  fetchPartnerPolicies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchPartnerPolicies),
      map((action) => action.payload),
      switchMap((payload) => {
        this.sessionStorageService.setItem(ITEMS.SELECTED_PARTNER_ID, payload);
        return this.httpRequestsService.getPartnerPolicies(payload ? payload : '6201');
      }),
      map((data: PartnerPolicyResponse) => actions.fetchPartnerPoliciesSuccess(data.partnerPolicies)),
      catchError((error: PartnerError) => of(actions.fetchPartnersError(error)))
    )
  );

  private setSearchCriteriaInSessionStorage(payload: SearchPartnerHeaders): void {
    this.sessionStorageService.setItem(ITEMS.SELECTED_PARTNER_NAME, payload.lastName ? payload.lastName : '');
    this.sessionStorageService.setItem(ITEMS.SELECTED_PARTNER_POSTCODE, payload.postcode ? payload.postcode : '');
    this.sessionStorageService.setItem(ITEMS.SELECTED_PARTNER_HOUSENUMBER, payload.houseNumber ? payload.houseNumber : '');
    this.sessionStorageService.setItem(ITEMS.SELECTED_PARTNER_RESIDENCE, payload.street ? payload.street : '');
    this.sessionStorageService.setItem(ITEMS.SELECTED_PARTNER_BIRTHDATE, payload.dateOfBirth ? payload.dateOfBirth : '');
    this.sessionStorageService.setItem(ITEMS.CLIENT_LOCALE, payload.clientLocale);
    this.sessionStorageService.setItem(ITEMS.TENANT_ID, payload.tenantId);
    this.sessionStorageService.setItem(ITEMS.USER_ID, payload.userID);
  }
}
