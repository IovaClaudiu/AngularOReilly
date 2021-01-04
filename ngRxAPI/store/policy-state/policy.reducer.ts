import { PolicyState } from './policy.model';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from './policy.actions';

export const initialState: PolicyState = {
  policy: null,
  contact: null,
  documents: null,
  beneficiaries: null,
  investment: null,
  faqQuestions: null,
  faqAnswers: null,
  loadingPolicy: null,
  selectedPolicy: null,
  error: null,
};

export const reducerFn = createReducer(
  initialState,

  on(actions.fetchPolicy, (state) => ({
    ...state,
    loadingPolicy: true,
  })),

  on(actions.fetchPolicySuccess, (state, { payload }) => ({
    ...state,
    loadingPolicy: false,
    policy: payload.aboutComponentData,
    contact: payload.contactComponentData,
    documents: payload.documentsComponentData,
    beneficiaries: payload.favoritesComponentData,
    investment: payload.investmentComponentData,
    faqQuestions: payload.wealthyComponentData,
    faqAnswers: payload.wealthyItemComponentData,
  })),

  on(actions.fetchPolicyError, (state, { payload }) => ({
    ...state,
    loadingPolicy: false,
    error: payload,
  })),

  on(actions.setPolicy, (state, { payload }) => ({
    ...state,
    selectedPolicy: payload,
  })),

  on(actions.setPolicySuccess, (state) => ({
    ...state,
  })),

  on(actions.initPolicyId, (state, { payload }) => ({
    ...state,
    selectedPolicy: payload,
  }))
);

export function reducer(state: PolicyState, action: Action): PolicyState {
  return reducerFn(state, action);
}
