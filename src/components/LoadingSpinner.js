import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

const LoadingContainer = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-width: 200px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
`;

const LoadingSubtext = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
  text-align: center;
  max-width: 200px;
  line-height: 1.4;
`;

const LoadingSpinner = ({ message = "Processing...", submessage = "Please wait while we process your request" }) => {
  return (
    <LoadingOverlay>
      <LoadingContainer>
        <Spinner />
        <LoadingText>{message}</LoadingText>
        <LoadingSubtext>{submessage}</LoadingSubtext>
      </LoadingContainer>
    </LoadingOverlay>
  );
};

export default LoadingSpinner;
