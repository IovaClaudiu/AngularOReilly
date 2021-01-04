import { PartnerState } from './partner.model';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './partner.actions';

export const initialState: PartnerState = {
  partners: [],
  partnerPolicies: [],
  selectedPartnerId: null,
  selectPartnerTitle: null,
  loadingPartners: false,
  loadingPartnerPolicies: false,
  error: null,
};

export const reducerFn = createReducer(
  initialState,

  on(actions.fetchPartners, (state, { payload }) => ({
    ...state,
    loadingPolicy: true,
    selectPartnerTitle: payload.lastName,
  })),

  on(actions.fetchPartnersSuccess, (state, { payload }) => ({
    ...state,
    loadingPolicy: false,
    partners: payload,
  })),

  on(actions.fetchPartnersError, (state, { payload }) => ({
    ...state,
    loadingPolicy: false,
    error: payload,
  })),

  on(actions.fetchPartnerPolicies, (state, { payload }) => ({
    ...state,
    loadingPolicy: true,
    selectedPartnerId: payload,
  })),

  on(actions.fetchPartnerPoliciesSuccess, (state, { payload }) => ({
    ...state,
    loadingPolicy: false,
    partnerPolicies: [...payload],
  })),

  on(actions.fetchPartnerPoliciesError, (state, { payload }) => ({
    ...state,
    loadingPolicy: false,
    error: payload,
  }))
);

export function reducer(state: PartnerState, action: Action): PartnerState {
  return reducerFn(state, action);
}
