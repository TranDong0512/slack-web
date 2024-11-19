/** @format */
'use client';
import { useState } from 'react';
import { SignInFlow } from '../types';
import { SignInCard } from './sign-in-card';
import { SignUpCard } from './sign-up-card';

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>('signIn');

  const handleStateChange = (newState: SignInFlow) => {
    setState(newState);
  };
  return (
    <div className="h-full flex items-center justify-center bg-[#492e46]">
      <div className="md:h-auto md:w-[420px]">
        {state === 'signIn' ? (
          <SignInCard onStateChange={handleStateChange} />
        ) : (
          <SignUpCard onStateChange={handleStateChange} />
        )}
      </div>
    </div>
  );
};
