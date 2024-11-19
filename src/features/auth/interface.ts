import { SignInFlow } from './types';

export interface SignInFlowCardProps {
  onStateChange: (newState: SignInFlow) => void;
}
