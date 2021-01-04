import { Injectable } from '@angular/core';
import { Policy } from '../../../shared/interfaces/policy.model';
import { Observable, from } from 'rxjs';
import { AppState } from '../store.model';
import { Store, select } from '@ngrx/store';
import * as actions from './policy.actions';
import * as selectors from './policy.selector';
import { ContactInfo } from 'src/app/shared/interfaces/contactInfo.model';
import { Investment } from '../../../shared/interfaces/investmentInfo.model';
import { Document } from '../../../shared/interfaces/document.model';
import { PolicyError } from './policy.error';

@Injectable()
export class PolicyFacade {
  policy$: Observable<Policy> = this.store.pipe(select(selectors.selectPolicy));

  contact$: Observable<ContactInfo> = this.store.pipe(select(selectors.selectContact));

  documents$: Observable<Document[]> = this.store.pipe(select(selectors.selectDocuments));

  beneficiaries$: Observable<string[]> = this.store.pipe(select(selectors.selectBeneficiaries));

  investment$: Observable<Investment> = this.store.pipe(select(selectors.selectInvestment));

  faqQuestions$: Observable<string[]> = this.store.pipe(select(selectors.selectFaqQuestions));

  faqAnswersw$: Observable<string[]> = this.store.pipe(select(selectors.selectFaqAnswerts));

  loadingPolicy$: Observable<boolean> = this.store.pipe(select(selectors.selectLoadingPolicy));

  error$: Observable<PolicyError> = this.store.pipe(select(selectors.selectError));

  constructor(private readonly store: Store<AppState>) {}

  public fetchPolicy(): void {
    this.store.dispatch(actions.fetchPolicy());
  }

  public setPolicy(payload: string): void {
    this.store.dispatch(actions.setPolicy(payload));
  }

  public initPolicyId(payload: string): void {
    this.store.dispatch(actions.initPolicyId(payload));
  }
}
