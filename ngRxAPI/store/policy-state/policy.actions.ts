import { PolicyError } from './policy.error';
import { createAction } from '@ngrx/store';
import { PolicyOverviewComponentData } from '../../../shared/interfaces/policyOverviewComponentData';

export const fetchPolicy = createAction('[Policy] fetchPolicy');

export const fetchPolicySuccess = createAction('[Policy] fetchPolicySuccess', (payload: PolicyOverviewComponentData) => ({ payload }));

export const fetchPolicyError = createAction('[Policy] fetchPolicyError', (payload: PolicyError) => ({ payload }));

export const setPolicy = createAction('[Policy] setPolicy', (payload: string) => ({ payload }));

export const setPolicySuccess = createAction('[Policy] setPolicySuccess');

export const initPolicyId = createAction('[Policy] initPolicyId', (payload: string) => ({ payload }));
