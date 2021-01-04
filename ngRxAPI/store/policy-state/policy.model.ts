import { PolicyError } from './policy.error';
import { Policy } from '../../../shared/interfaces/policy.model';
import { ContactInfo } from '../../../shared/interfaces/contactInfo.model';
import { Investment } from '../../../shared/interfaces/investmentInfo.model';
import { Document } from '../../../shared/interfaces/document.model';

export interface PolicyState {
  policy: Policy;
  contact: ContactInfo;
  documents: Document[];
  beneficiaries: string[];
  investment: Investment;
  loadingPolicy: boolean;
  faqQuestions: string[];
  faqAnswers: string[];
  selectedPolicy: string;
  error: PolicyError;
}
