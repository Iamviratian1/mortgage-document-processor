import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const ProfileSubtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  opacity: 0.9;
`;

const ProgressSection = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldSection = styled.div`
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f8f9fa;
`;

const FieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FieldItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  background: ${props => props.completed ? '#e8f5e8' : '#fff3cd'};
  border: 1px solid ${props => props.completed ? '#4caf50' : '#ffc107'};
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  }
`;

const FieldInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const FieldIcon = styled.div`
  font-size: 1.2rem;
  opacity: 0.8;
`;

const FieldDetails = styled.div`
  flex: 1;
`;

const FieldName = styled.div`
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
  margin-bottom: 2px;
`;

const FieldValue = styled.div`
  font-size: 0.85rem;
  color: #6c757d;
  font-style: italic;
`;

const FieldStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  background: ${props => props.completed ? '#d4edda' : '#fff3cd'};
  color: ${props => props.completed ? '#155724' : '#856404'};
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
    full_name: '👤',
    employee_name: '👷',
    employer_name: '🏢',
    account_holder_name: '🏦',
    date_of_birth: '🎂',
    gross_pay: '💰',
    net_pay: '💵',
    account_number: '🔢',
    bank_name: '🏛️',
    closing_balance: '💳',
    opening_balance: '💳',
    statement_date: '📅',
    statement_period: '📅',
    address: '🏠',
    property_address: '🏠',
    passport_number: '🛂',
    license_number: '🚗',
    card_number: '💳',
    expiry_date: '⏰',
    nationality: '🌍',
    spouse_name: '💑',
    marriage_date: '💒',
    marriage_place: '📍',
    tenant_name: '👤',
    lease_start_date: '📅',
    lease_end_date: '📅',
    provider_name: '🏢',
    bill_date: '📅'
  };
  
  for (const [key, icon] of Object.entries(icons)) {
    if (fieldName.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }
  
  return '📄';
};

const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/\b(And|Or|The|Of|In|On|At|To|For|With|By)\b/g, l => l.toLowerCase())
    .replace(/\b\w/g, l => l.toUpperCase());
};

const UserProfile = ({ extractedFields, applicationStatus }) => {
  if (!applicationStatus) {
    return (
      <Container>
        <EmptyState>
          <div className="icon">👤</div>
          <div className="title">No Profile Data Available</div>
          <div className="subtitle">
            Start your application and upload documents to see your profile information here.
          </div>
        </EmptyState>
      </Container>
    );
  }

  const { completion_percentage = 0, required_fields = [] } = applicationStatus;
  
  // Round completion percentage to whole number
  const roundedPercentage = Math.round(completion_percentage);
  
  // Separate completed and missing fields
  const completedFields = required_fields.filter(field => field && field.status === 'completed') || [];
  const missingFields = required_fields.filter(field => field && field.status === 'missing') || [];

  // Create a map of extracted field values for display
  const extractedFieldMap = {};
  extractedFields.forEach(field => {
    extractedFieldMap[field.field_name.toLowerCase()] = field.value;
  });

  return (
    <Container>
      <ProfileHeader>
        <ProfileTitle>👤 User Profile</ProfileTitle>
        <ProfileSubtitle>
          Complete overview of your mortgage application progress
        </ProfileSubtitle>
      </ProfileHeader>

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

      <FieldsGrid>
        <FieldSection>
          <SectionTitle>
            ✅ Completed Fields ({completedFields.length})
          </SectionTitle>
          <FieldList>
            {completedFields.length > 0 ? (
              completedFields.map((field, index) => (
                <FieldItem key={index} completed={true}>
                  <FieldInfo>
                    <FieldIcon>{getFieldIcon(field.field_name)}</FieldIcon>
                    <FieldDetails>
                      <FieldName>{formatFieldName(field.field_name)}</FieldName>
                      <FieldValue>
                        {extractedFieldMap[field.field_name.toLowerCase()] || 'Value extracted'}
                      </FieldValue>
                    </FieldDetails>
                  </FieldInfo>
                  <FieldStatus completed={true}>
                    ✅ Completed
                  </FieldStatus>
                </FieldItem>
              ))
            ) : (
              <EmptyState>
                <div className="icon">📝</div>
                <div className="title">No Completed Fields Yet</div>
                <div className="subtitle">
                  {required_fields.length > 0 ? 
                    "Upload documents to start filling in your profile information." : 
                    "No required fields defined yet."
                  }
                </div>
              </EmptyState>
            )}
          </FieldList>
        </FieldSection>

        <FieldSection>
          <SectionTitle>
            ⚠️ Missing Fields ({missingFields.length})
          </SectionTitle>
          <FieldList>
            {missingFields.length > 0 ? (
              missingFields.map((field, index) => (
                <FieldItem key={index} completed={false}>
                  <FieldInfo>
                    <FieldIcon>{getFieldIcon(field.field_name)}</FieldIcon>
                    <FieldDetails>
                      <FieldName>{formatFieldName(field.field_name)}</FieldName>
                      <FieldValue>
                        Required from: {Array.isArray(field.source_documents) 
                          ? field.source_documents.join(', ') 
                          : field.source_documents || 'Unknown source'}
                      </FieldValue>
                    </FieldDetails>
                  </FieldInfo>
                  <FieldStatus completed={false}>
                    ⏳ Pending
                  </FieldStatus>
                </FieldItem>
              ))
            ) : (
              <EmptyState>
                <div className="icon">📝</div>
                <div className="title">No Missing Fields</div>
                <div className="subtitle">
                  {required_fields.length > 0 ? 
                    "All required fields have been completed!" : 
                    "No required fields defined yet."
                  }
                </div>
              </EmptyState>
            )}
          </FieldList>
        </FieldSection>
      </FieldsGrid>
    </Container>
  );
};

export default UserProfile;
