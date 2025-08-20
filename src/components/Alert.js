import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  min-width: 300px;
  max-width: 500px;
  animation: ${slideIn} 0.3s ease-out;
  
  &.fade-out {
    animation: ${slideOut} 0.3s ease-in forwards;
  }
`;

const AlertBox = styled.div`
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.4;
  
  ${props => {
    switch (props.type) {
      case 'success':
        return `
          background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
          color: white;
          border-left: 4px solid #2e7d32;
        `;
      case 'error':
        return `
          background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
          color: white;
          border-left: 4px solid #c62828;
        `;
      case 'warning':
        return `
          background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
          color: white;
          border-left: 4px solid #ef6c00;
        `;
      default:
        return `
          background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
          color: white;
          border-left: 4px solid #1565c0;
        `;
    }
  }}
`;

const AlertIcon = styled.div`
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const AlertMessage = styled.div`
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  flex-shrink: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
`;

const getAlertIcon = (type) => {
  switch (type) {
    case 'success':
      return '✅';
    case 'error':
      return '❌';
    case 'warning':
      return '⚠️';
    default:
      return 'ℹ️';
  }
};

const Alert = ({ message, type = 'info', onClose }) => {
  return (
    <AlertContainer>
      <AlertBox type={type}>
        <AlertIcon>{getAlertIcon(type)}</AlertIcon>
        <AlertMessage>{message}</AlertMessage>
        {onClose && (
          <CloseButton onClick={onClose}>
            ✕
          </CloseButton>
        )}
      </AlertBox>
    </AlertContainer>
  );
};

export default Alert;
