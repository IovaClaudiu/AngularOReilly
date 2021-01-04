import { Injectable } from '@angular/core';
import { Partner } from '../../../shared/interfaces/partner.model';
import { Observable } from 'rxjs';
import { AppState } from '../store.model';
import { Store, select } from '@ngrx/store';
import * as actions from './partner.actions';
import * as selectors from './partner.selector';
import { PartnerPolicy } from '../../../shared/interfaces/partnerPolicy.model';
import { SearchPartnerHeaders } from 'src/app/shared/interfaces/searchPartnerHeaders.model';
import { PartnerError } from './partner.error';

@Injectable()
export class PartnerFacade {
  partners$: Observable<Partner[]> = this.store.pipe(select(selectors.selectPartners));

  partnerPolicies$: Observable<PartnerPolicy[]> = this.store.pipe(select(selectors.selectPartnerPolicies));

  selectedPartner$: Observable<Partner> = this.store.pipe(select(selectors.selectSelectedPartner));

  partnerTitle$: Observable<string> = this.store.pipe(select(selectors.selectSelectedPartnerTitle));

  errors$: Observable<PartnerError> = this.store.pipe(select(selectors.selectError));

  constructor(private readonly store: Store<AppState>) {}

  public fetchPartners(payload: SearchPartnerHeaders): void {
    this.store.dispatch(actions.fetchPartners(payload));
  }

  public fetchPartnerPolicies(payload: string): void {
    this.store.dispatch(actions.fetchPartnerPolicies(payload));
  }
}
