import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  background: ${props => props.primary ? 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)' : '#ecf0f1'};
  color: ${props => props.primary ? 'white' : '#2c3e50'};
  border: none;
  padding: 15px 25px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StartButton = styled(Button)`
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  font-size: 1.1rem;
  padding: 18px 30px;
`;

const CheckButton = styled(Button)`
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
`;

const ApplicationIdDisplay = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin: 20px 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ApplicationIdText = styled.div`
  font-size: 0.9rem;
  margin-bottom: 8px;
  opacity: 0.9;
`;

const ApplicationIdValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: 6px;
  margin: 10px 0;
  word-break: break-all;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const Instructions = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
`;

const InstructionsTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 600;
`;

const InstructionsText = styled.p`
  margin: 0;
  color: #6c757d;
  line-height: 1.5;
  font-size: 0.9rem;
`;

// Returning User Components
const ReturningUserForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%);
  margin-top: 10px;
`;

const ApplicationManagement = ({ 
  applicationId, 
  onStartApplication, 
  onCheckStatus, 
  onReturningUserSubmit,
  isReturningUser = false 
}) => {
  const [returningAppId, setReturningAppId] = useState('');

  const handleReturningUserSubmit = (e) => {
    e.preventDefault();
    if (returningAppId.trim()) {
      onReturningUserSubmit(returningAppId.trim());
    }
  };

  // Show returning user form
  if (isReturningUser && !applicationId) {
    return (
      <Container>
        <Instructions>
          <InstructionsTitle>🔄 Continue Your Application</InstructionsTitle>
          <InstructionsText>
            Enter your application ID to continue where you left off. You'll be able to see what documents you've already uploaded and what's still missing.
          </InstructionsText>
        </Instructions>

        <ReturningUserForm>
          <form onSubmit={handleReturningUserSubmit}>
            <InputGroup>
              <Label htmlFor="applicationId">Application ID</Label>
              <Input
                id="applicationId"
                type="text"
                value={returningAppId}
                onChange={(e) => setReturningAppId(e.target.value)}
                placeholder="Enter your application ID..."
                required
              />
            </InputGroup>
            
            <SubmitButton type="submit" disabled={!returningAppId.trim()}>
              🔍 Find My Application
            </SubmitButton>
          </form>
        </ReturningUserForm>
      </Container>
    );
  }

  // Show application management for active applications
  if (applicationId) {
    return (
      <Container>
        <ApplicationIdDisplay>
          <ApplicationIdText>Your Application ID</ApplicationIdText>
          <ApplicationIdValue>{applicationId}</ApplicationIdValue>
          <StatusIndicator>
            ✅ Application Active
          </StatusIndicator>
        </ApplicationIdDisplay>

        <Instructions>
          <InstructionsTitle>📋 Next Steps</InstructionsTitle>
          <InstructionsText>
            Your application is ready! Upload your documents below and track your progress. 
            You can check your application status anytime to see what's missing.
          </InstructionsText>
        </Instructions>

        <CheckButton onClick={() => onCheckStatus(applicationId)}>
          🔄 Refresh Status
        </CheckButton>
      </Container>
    );
  }

  // Show new user start application
  return (
    <Container>
      <Instructions>
        <InstructionsTitle>🆕 Start New Application</InstructionsTitle>
        <InstructionsText>
          Begin your mortgage application journey. We'll create a unique application ID for you 
          and guide you through uploading the required documents.
        </InstructionsText>
      </Instructions>

      <StartButton onClick={onStartApplication}>
        🚀 Start New Application
      </StartButton>
    </Container>
  );
};

export default ApplicationManagement;
