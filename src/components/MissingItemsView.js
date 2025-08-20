import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 0;
`;

const Header = styled.div`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  width: 100%;
`;

const Title = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
`;

const ProgressSection = styled.div`
  background: white;
  margin: 20px;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProgressTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 1.3rem;
  color: #2c3e50;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #ecf0f1;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #27ae60 0%, #2ecc71 100%);
  width: ${props => props.percentage}%;
  transition: width 0.5s ease;
  border-radius: 6px;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #6c757d;
`;

const ProgressPercentage = styled.span`
  font-weight: 600;
  color: #27ae60;
  font-size: 1.1rem;
`;

// Full Width Tab Container
const TabContainer = styled.div`
  background: white;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  width: 100%;
  gap: 2px;
  overflow: visible;
  min-height: 50px;
  align-items: flex-start;
  justify-content: flex-start;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Tab = styled.button`
  padding: 10px 14px;
  border: none;
  background: ${props => props.active ? '#007bff' : 'transparent'};
  color: ${props => props.active ? 'white' : '#6c757d'};
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  min-width: fit-content;
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  
  &:hover {
    background: ${props => props.active ? '#007bff' : '#e9ecef'};
  }
`;

const TabContent = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  padding: 25px;
  flex: 1;
  overflow-y: auto;
`;

// Full Width Content Area
const ContentArea = styled.div`
  flex: 1;
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// Field Grid Layout
const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 25px;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
`;

const FieldCard = styled.div`
  background: ${props => props.active ? '#e3f2fd' : '#fff3cd'};
  border: 2px solid ${props => props.active ? '#2196f3' : '#ffc107'};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const FieldHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
`;

const FieldIcon = styled.div`
  font-size: 1.8rem;
  opacity: 0.8;
`;

const FieldTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
`;

const FieldStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  background: ${props => props.active ? '#e3f2fd' : '#fff3cd'};
  color: ${props => props.active ? '#1976d2' : '#856404'};
`;

const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #495057;
`;

const DocumentIcon = styled.div`
  font-size: 1.2rem;
  opacity: 0.7;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  
  .icon {
    font-size: 3rem;
    margin-bottom: 15px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #495057;
  }
  
  .subtitle {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const getFieldIcon = (fieldName) => {
  const icons = {
    full_legal_name: '👤',
    date_of_birth: '🎂',
    current_address: '🏠',
    city_province_postal: '📍',
    marital_status: '💍',
    residency_status: '🛂',
    employee_name: '👷',
    employer_name: '🏢',
    gross_pay: '💰',
    net_pay: '💵',
    account_holder_name: '🏦',
    account_number: '🔢',
    bank_name: '🏛️',
    closing_balance: '💳',
    opening_balance: '💳',
    statement_date: '📅',
    statement_period: '📅'
  };
  return icons[fieldName] || '📄';
};

const getDocumentIcon = (docType) => {
  const icons = {
    passport: '🛂',
    drivers_license: '🚗',
    bank_statement: '🏦',
    pay_stub: '💰',
    earnings_statement: '📊',
    utility_bill: '⚡',
    lease_agreement: '🏠',
    government_correspondence: '📋',
    marriage_certificate: '💒',
    divorce_decree: '📜',
    separation_agreement: '📄',
    pr_card: '🛂',
    birth_certificate: '👶',
    citizenship_certificate: '🛂',
    work_permit: '📋',
    study_permit: '📚'
  };
  return icons[docType] || '📄';
};

const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\b(And|Or|The|Of|In|On|At|To|For|With|By)\b/g, l => l.toLowerCase())
    .replace(/\b\w/g, l => l.toUpperCase());
};

const formatDocumentName = (docType) => {
  return docType
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
};

const MissingItemsView = ({ applicationStatus, extractedFields }) => {
  const [selectedField, setSelectedField] = useState('all');

  if (!applicationStatus) {
    return (
      <Container>
        <EmptyState>
          <div className="icon">📋</div>
          <div className="title">No Application Data Available</div>
          <div className="subtitle">
            Start your application and upload documents to see missing items here.
          </div>
        </EmptyState>
      </Container>
    );
  }

  const { completion_percentage = 0, required_fields = [], missing_documents = [], missing_documents_by_field = [] } = applicationStatus;
  
  // Debug logging
  console.log('MissingItemsView - applicationStatus:', applicationStatus);
  console.log('MissingItemsView - missing_documents:', missing_documents);
  console.log('MissingItemsView - missing_documents_by_field:', missing_documents_by_field);
  console.log('MissingItemsView - required_fields:', required_fields);
  
  // Round completion percentage to whole number
  const roundedPercentage = Math.round(completion_percentage);
  
  // Separate completed and missing fields
  const completedFields = required_fields.filter(field => field && field.status === 'completed') || [];
  const missingFields = required_fields.filter(field => field && field.status === 'missing') || [];

  // Get documents for a specific field
  const getDocumentsForField = (fieldName) => {
    const fieldData = missing_documents_by_field.find(f => f.field_name === fieldName);
    return fieldData ? fieldData.missing_documents : [];
  };

  // Create tabs for missing fields
  const fieldTabs = missingFields.map(field => ({
    id: field.field_name,
    name: formatFieldName(field.field_name),
    icon: getFieldIcon(field.field_name),
    field: field
  }));

  return (
    <Container>
      <Header>
        <Title>⚠️ Missing Items ({missingFields.length})</Title>
        <Subtitle>
          Track what documents and information you still need to provide
        </Subtitle>
      </Header>

      <ProgressSection>
        <ProgressTitle>📊 Document Criteria Met</ProgressTitle>
        <ProgressBar>
          <ProgressFill percentage={roundedPercentage} />
        </ProgressBar>
        <ProgressText>
          <span>Application Completion</span>
          <ProgressPercentage>{roundedPercentage}% Complete</ProgressPercentage>
        </ProgressText>
      </ProgressSection>

      <TabContainer>
        <TabList>
          <Tab 
            active={selectedField === 'all'} 
            onClick={() => setSelectedField('all')}
          >
            📋 All Fields ({missingFields.length})
          </Tab>
          {fieldTabs.map(tab => (
            <Tab 
              key={tab.id}
              active={selectedField === tab.id} 
              onClick={() => setSelectedField(tab.id)}
            >
              {tab.icon} {tab.name}
            </Tab>
          ))}
        </TabList>

        <ContentArea>
          {/* All Fields Tab */}
          <TabContent active={selectedField === 'all'}>
            <FieldGrid>
              {missingFields.length > 0 ? (
                missingFields.map((field, index) => {
                  const documents = getDocumentsForField(field.field_name);
                  
                  return (
                    <FieldCard key={index}>
                      <FieldHeader>
                        <FieldIcon>{getFieldIcon(field.field_name)}</FieldIcon>
                        <FieldTitle>{formatFieldName(field.field_name)}</FieldTitle>
                      </FieldHeader>
                      
                      <FieldStatus>
                        ⏳ Pending
                      </FieldStatus>
                      
                      {documents.length > 0 && (
                        <DocumentList>
                          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#495057', marginBottom: '10px' }}>
                            Required Documents:
                          </div>
                          {documents.map((docType, docIndex) => (
                            <DocumentItem key={docIndex}>
                              <DocumentIcon>{getDocumentIcon(docType)}</DocumentIcon>
                              <span>{formatDocumentName(docType)}</span>
                            </DocumentItem>
                          ))}
                        </DocumentList>
                      )}
                      
                      {documents.length === 0 && (
                        <div style={{ fontSize: '0.9rem', color: '#6c757d', fontStyle: 'italic', marginTop: '10px' }}>
                          No additional documents required for this field.
                        </div>
                      )}
                    </FieldCard>
                  );
                })
              ) : (
                <div style={{ gridColumn: '1 / -1' }}>
                  <EmptyState>
                    <div className="icon">🎉</div>
                    <div className="title">All Fields Complete!</div>
                    <div className="subtitle">
                      Congratulations! You've provided all required information.
                    </div>
                  </EmptyState>
                </div>
              )}
            </FieldGrid>
          </TabContent>

          {/* Individual Field Tabs */}
          {fieldTabs.map(tab => (
            <TabContent key={tab.id} active={selectedField === tab.id}>
              <FieldGrid>
                <div style={{ gridColumn: '1 / -1' }}>
                  <FieldCard>
                    <FieldHeader>
                      <FieldIcon>{tab.icon}</FieldIcon>
                      <FieldTitle>{tab.name}</FieldTitle>
                    </FieldHeader>
                    
                    <FieldStatus>
                      ⏳ Pending
                    </FieldStatus>
                    
                    {(() => {
                      const documents = getDocumentsForField(tab.id);
                      if (documents.length > 0) {
                        return (
                          <DocumentList>
                            <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#495057', marginBottom: '10px' }}>
                              Required Documents:
                            </div>
                            {documents.map((docType, docIndex) => (
                              <DocumentItem key={docIndex}>
                                <DocumentIcon>{getDocumentIcon(docType)}</DocumentIcon>
                                <span>{formatDocumentName(docType)}</span>
                              </DocumentItem>
                            ))}
                          </DocumentList>
                        );
                      } else {
                        return (
                          <div style={{ fontSize: '0.9rem', color: '#6c757d', fontStyle: 'italic', marginTop: '10px' }}>
                            No additional documents required for this field.
                          </div>
                        );
                      }
                    })()}
                  </FieldCard>
                </div>
              </FieldGrid>
            </TabContent>
          ))}
        </ContentArea>
      </TabContainer>
    </Container>
  );
};

export default MissingItemsView;
