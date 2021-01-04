import { PartnerState } from './partner-state/partner.model';
import { PolicyState } from './policy-state/policy.model';

export interface AppState {
  policy?: PolicyState;
  partner?: PartnerState;
}
