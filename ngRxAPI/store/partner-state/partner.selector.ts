import { PartnerState } from './partner.model';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectState = createFeatureSelector<PartnerState>('partner');

export const selectPartners = createSelector(selectState, (state) => state.partners);

export const selectPartnerPolicies = createSelector(selectState, (state) => state.partnerPolicies);

export const selectSelectedPartner = createSelector(selectState, (state) => {
  const partners = [...state.partners];
  return partners.find((partner) => partner.partnersNumber === state.selectedPartnerId);
});

export const selectSelectedPartnerTitle = createSelector(selectState, (state) => state.selectPartnerTitle);

export const selectError = createSelector(selectState, (state) => state.error);
