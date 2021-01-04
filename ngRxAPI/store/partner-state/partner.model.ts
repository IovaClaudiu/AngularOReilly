import { PartnerError } from './partner.error';
import { Partner } from '../../../shared/interfaces/partner.model';
import { PartnerPolicy } from '../../../shared/interfaces/partnerPolicy.model';

export interface PartnerState {
  partners: Partner[];
  partnerPolicies: PartnerPolicy[];
  selectedPartnerId: string;
  selectPartnerTitle: string;
  loadingPartners: boolean;
  loadingPartnerPolicies: boolean;
  error: PartnerError;
}
