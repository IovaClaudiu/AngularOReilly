import { PartnerError } from './partner.error';
import { createAction } from '@ngrx/store';
import { SearchPartnerHeaders } from 'src/app/shared/interfaces/searchPartnerHeaders.model';
import { PartnerPolicy } from '../../../shared/interfaces/partnerPolicy.model';
import { Partner } from '../../../shared/interfaces/partner.model';

export const fetchPartners = createAction('[Partner] fetchPartners', (payload: SearchPartnerHeaders) => ({ payload }));

export const fetchPartnersSuccess = createAction('[Partner] fetchPartnersSuccess', (payload: Partner[]) => ({ payload }));

export const fetchPartnersError = createAction('[Partner] fetchPartnersError', (payload: PartnerError) => ({ payload }));

export const fetchPartnerPolicies = createAction('[Partner] fetchPartnerPolicies', (payload: string) => ({ payload }));

export const fetchPartnerPoliciesSuccess = createAction('[Partner] fetchPartnerPoliciesSuccess', (payload: PartnerPolicy[]) => ({
  payload,
}));

export const fetchPartnerPoliciesError = createAction('[Partner] fetchPartnerPoliciesError', (payload: PartnerError) => ({ payload }));
