import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Crowdfunding from './Crowdfunding';

// Mock the DocumentVerification component
jest.mock('./DocumentVerification', () => {
  return function MockDocumentVerification({ onVerificationComplete }) {
    return (
      <div>
        <button onClick={onVerificationComplete}>Mock Verification Complete</button>
      </div>
    );
  };
});

const TestComponent = () => {
  return (
    <ChakraProvider>
      <Crowdfunding />
    </ChakraProvider>
  );
};

export default TestComponent;