import React, { useState } from 'react';
import styled from 'styled-components';
import ApplicationManagement from './components/ApplicationManagement';
import DocumentUpload from './components/DocumentUpload';
import ApplicationStatus from './components/ApplicationStatus';
import ExtractedData from './components/ExtractedData';
import UserProfile from './components/UserProfile';
import MissingItemsView from './components/MissingItemsView';
import LoadingSpinner from './components/LoadingSpinner';
import Alert from './components/Alert';

const API_BASE_URL = 'http://localhost:3001';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const MainContent = styled.div`
  max-width: ${props => props.fullWidth ? '100%' : '1200px'};
  margin: ${props => props.fullWidth ? '0' : '0 auto'};
  background: white;
  border-radius: ${props => props.fullWidth ? '0' : '20px'};
  box-shadow: ${props => props.fullWidth ? 'none' : '0 20px 40px rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 30px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 300;
`;

const ContentArea = styled.div`
  padding: ${props => props.fullWidth ? '0' : '30px'};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Landing Page Components
const LandingPage = styled.div`
  text-align: center;
  padding: 60px 20px;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LandingTitle = styled.h2`
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
`;

const LandingSubtitle = styled.p`
  font-size: 1.1rem;
  color: #7f8c8d;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const UserOptions = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  margin-bottom: 40px;
  flex: 1;
  align-items: center;
`;

const UserOption = styled.div`
  background: white;
  border: 2px solid ${props => props.selected ? '#3498db' : '#ecf0f1'};
  border-radius: 15px;
  padding: 40px 30px;
  width: 320px;
  height: 280px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    border-color: #3498db;
  }

  ${props => props.selected && `
    border-color: #3498db;
    background: #f8f9ff;
  `}
`;

const OptionIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const OptionTitle = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 600;
`;

const OptionDescription = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  line-height: 1.6;
  text-align: center;
`;

// Tab Components
const TabContainer = styled.div`
  position: sticky;
  top: 0;
  background: white;
  z-index: 1000;
  border-bottom: 2px solid #ecf0f1;
  margin: -25px -25px 0 -25px;
  padding: 0 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0;
  gap: 5px;
  overflow: visible;
  min-height: 50px;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 10px 16px;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => props.active ? '#3498db' : '#7f8c8d'};
  cursor: pointer;
  border-bottom: 3px solid ${props => props.active ? '#3498db' : 'transparent'};
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  min-width: fit-content;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #3498db;
  }

  ${props => props.active && `
    background: #f8f9ff;
  `}
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  margin-top: 25px;
`;

const TabPanel = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  border: 1px solid #ecf0f1;
`;

// Application Flow Components
const ApplicationFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const FlowSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 25px;
  border: 1px solid #ecf0f1;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BackButton = styled.button`
  background: #95a5a6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background: #7f8c8d;
    transform: translateY(-1px);
  }
`;

function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'new-user', 'returning-user'
  const [currentApplicationId, setCurrentApplicationId] = useState('');
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [extractedFields, setExtractedFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [activeTab, setActiveTab] = useState('profile'); // 'extracted', 'missing', 'profile'

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleNewUser = () => {
    setCurrentView('new-user');
  };

  const handleReturningUser = () => {
    setCurrentView('returning-user');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setCurrentApplicationId('');
    setApplicationStatus(null);
    setExtractedFields([]);
    setActiveTab('extracted');
  };

  const startApplication = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/v1/mortgage/start-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCurrentApplicationId(data.application_id);
        showAlert('Application started successfully!', 'success');
        await checkStatus(data.application_id);
      } else {
        throw new Error('Failed to start application');
      }
    } catch (error) {
      console.error('Error starting application:', error);
      showAlert('Error starting application: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file) => {
    if (!currentApplicationId) {
      showAlert('Please start an application first', 'warning');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('application_id', currentApplicationId);
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/v1/mortgage/upload-document`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        showAlert(`Document processed successfully! Identified as: ${data.document_type}`, 'success');
        
        // Update extracted fields
        const extracted_fields = data.extracted_fields || [];
        setExtractedFields(prevFields => {
          const newFields = [...prevFields];
          extracted_fields.forEach(newField => {
            const existingIndex = newFields.findIndex(field => field.field_name === newField.field_name);
            if (existingIndex >= 0) {
              newFields[existingIndex] = newField;
            } else {
              newFields.push(newField);
            }
          });
          return newFields;
        });
        
        await checkStatus(currentApplicationId);
      } else {
        throw new Error('Failed to upload document');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      showAlert('Error uploading document: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (applicationId) => {
    if (!applicationId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/v1/mortgage/application-status/${applicationId}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Status data received:', data);
        console.log('Required fields structure:', data.required_fields);
        console.log('Required fields type:', typeof data.required_fields);
        console.log('Required fields length:', data.required_fields ? data.required_fields.length : 'undefined');
        console.log('Extracted fields from API:', data.extracted_fields);
        
        const normalizedData = {
          ...data,
          required_fields: Array.isArray(data.required_fields) ? data.required_fields : [],
          uploaded_documents: Array.isArray(data.uploaded_documents) ? data.uploaded_documents : [],
          missing_documents: Array.isArray(data.missing_documents) ? data.missing_documents : [],
          completion_percentage: data.completion_percentage || 0
        };
        
        console.log('Normalized data:', normalizedData);
        setApplicationStatus(normalizedData);
        
        // Update extracted fields from the API response
        if (data.extracted_fields && Array.isArray(data.extracted_fields)) {
          console.log('Setting extracted fields from API:', data.extracted_fields);
          setExtractedFields(data.extracted_fields);
        }
      } else {
        throw new Error('Failed to get application status');
      }
    } catch (error) {
      console.error('Error checking status:', error);
      showAlert('Error checking status: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReturningUserSubmit = async (applicationId) => {
    setCurrentApplicationId(applicationId);
    await checkStatus(applicationId);
  };

  // Render Landing Page
  if (currentView === 'landing') {
    return (
      <AppContainer>
        <MainContent>
          <Header>
            <Title>Mortgage Document Processor</Title>
            <Subtitle>AI-Powered Document Analysis & Field Extraction</Subtitle>
          </Header>
          
          <ContentArea>
            <LandingPage>
              <LandingTitle>Welcome to Mortgage Document Processing</LandingTitle>
              <LandingSubtitle>
                Upload your documents and let our AI automatically extract relevant information for your mortgage application. 
                Get real-time status updates and see exactly what documents you still need to provide.
              </LandingSubtitle>
              
              <UserOptions>
                <UserOption onClick={handleNewUser}>
                  <OptionIcon>🆕</OptionIcon>
                  <OptionTitle>New Application</OptionTitle>
                  <OptionDescription>
                    Start a new mortgage application. Upload your documents and track your progress as you complete your application.
                  </OptionDescription>
                </UserOption>
                
                <UserOption onClick={handleReturningUser}>
                  <OptionIcon>🔄</OptionIcon>
                  <OptionTitle>Returning User</OptionTitle>
                  <OptionDescription>
                    Continue with an existing application. Enter your application ID to see what documents you still need to upload.
                  </OptionDescription>
                </UserOption>
              </UserOptions>
            </LandingPage>
          </ContentArea>
        </MainContent>
        
        {alert && <Alert message={alert.message} type={alert.type} />}
      </AppContainer>
    );
  }

  // Render Application Flow
  return (
    <AppContainer>
      <MainContent fullWidth={activeTab === 'missing'}>
        <Header>
          <Title>Mortgage Document Processor</Title>
          <Subtitle>AI-Powered Document Analysis & Field Extraction</Subtitle>
        </Header>
        
        <ContentArea fullWidth={activeTab === 'missing'}>
          <BackButton onClick={handleBackToLanding}>
            ← Back to Home
          </BackButton>
          
          <ApplicationFlow>
            {/* Application Management Section */}
            <FlowSection>
              <SectionTitle>📋 Application Management</SectionTitle>
              <ApplicationManagement
                applicationId={currentApplicationId}
                onStartApplication={startApplication}
                onCheckStatus={checkStatus}
                onReturningUserSubmit={handleReturningUserSubmit}
                isReturningUser={currentView === 'returning-user'}
              />
            </FlowSection>

            {/* Document Upload Section */}
            {currentApplicationId && (
              <FlowSection>
                <SectionTitle>📤 Document Upload</SectionTitle>
                                 <DocumentUpload
                   onUpload={uploadDocument}
                   onBatchUpload={uploadDocument}
                   disabled={!currentApplicationId}
                 />
              </FlowSection>
            )}

            {/* Application Status and Data Tabs */}
            {currentApplicationId && applicationStatus && (
              <FlowSection>
                <TabContainer>
                  <TabList>
                    <Tab 
                      active={activeTab === 'profile'} 
                      onClick={() => setActiveTab('profile')}
                    >
                      👤 User Profile
                    </Tab>
                    <Tab 
                      active={activeTab === 'extracted'} 
                      onClick={() => setActiveTab('extracted')}
                    >
                      📊 Extracted Fields ({extractedFields.length})
                    </Tab>
                                         <Tab 
                       active={activeTab === 'missing'} 
                       onClick={() => setActiveTab('missing')}
                     >
                       ⚠️ Missing Items ({(() => {
                         const missingFields = applicationStatus.required_fields?.filter(field => field && field.status === 'missing') || [];
                         return missingFields.length;
                       })()})
                     </Tab>
                  </TabList>
                  
                  <TabContent active={activeTab === 'profile'}>
                    <TabPanel>
                      <UserProfile 
                        extractedFields={extractedFields}
                        applicationStatus={applicationStatus}
                      />
                    </TabPanel>
                  </TabContent>
                  
                  <TabContent active={activeTab === 'extracted'}>
                    <TabPanel>
                      <ExtractedData fields={extractedFields} />
                    </TabPanel>
                  </TabContent>
                  
                  <TabContent active={activeTab === 'missing'}>
                    <MissingItemsView 
                      applicationStatus={applicationStatus}
                      extractedFields={extractedFields}
                    />
                  </TabContent>
                </TabContainer>
              </FlowSection>
            )}
          </ApplicationFlow>
        </ContentArea>
      </MainContent>
      
      {loading && <LoadingSpinner message="Processing..." />}
      {alert && <Alert message={alert.message} type={alert.type} />}
    </AppContainer>
  );
}

export default App;
