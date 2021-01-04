import { PolicyState } from './policy.model';
import { createFeatureSelector, createSelector, State } from '@ngrx/store';

export const selectState = createFeatureSelector<PolicyState>('policy');

export const selectPolicy = createSelector(selectState, (state) => state.policy);

export const selectContact = createSelector(selectState, (state) => state.contact);

export const selectDocuments = createSelector(selectState, (state) => state.documents);

export const selectBeneficiaries = createSelector(selectState, (state) => state.beneficiaries);

export const selectInvestment = createSelector(selectState, (state) => state.investment);

export const selectFaqQuestions = createSelector(selectState, (state) => state.faqQuestions);

export const selectFaqAnswerts = createSelector(selectState, (state) => state.faqAnswers);

export const selectLoadingPolicy = createSelector(selectState, (state) => state.loadingPolicy);

export const selectSelectedPolicy = createSelector(selectState, (state) => state.selectedPolicy);

export const selectError = createSelector(selectState, (state) => state.error);
