import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const ProgressInfo = styled.div`
  flex: 1;
  min-width: 200px;
`;

const ProgressTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4caf50 0%, #8bc34a 100%);
  border-radius: 6px;
  transition: width 0.5s ease;
  width: ${props => props.percentage}%;
`;

const ProgressText = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
`;

const StatusBadge = styled.div`
  background: ${props => {
    if (props.status === 'completed') return '#4caf50';
    if (props.status === 'in_progress') return '#ff9800';
    return '#f44336';
  }};
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const FieldsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const FieldGroup = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const FieldGroupTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FieldItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
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
`;

const FieldDetails = styled.div`
  flex: 1;
`;

const FieldName = styled.div`
  font-weight: 600;
  color: white;
  margin-bottom: 3px;
`;

const FieldSources = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
`;

const FieldStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  
  ${props => props.status === 'completed' ? `
    color: #4caf50;
  ` : `
    color: #ff9800;
  `}
`;

const DocumentsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const DocumentsTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DocumentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const DocumentIcon = styled.div`
  font-size: 1.5rem;
`;

const DocumentInfo = styled.div`
  flex: 1;
`;

const DocumentName = styled.div`
  font-weight: 600;
  color: white;
  margin-bottom: 3px;
`;

const DocumentMeta = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
`;

const MissingDocumentsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const MissingTitle = styled.h4`
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MissingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MissingItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`;

const MissingItemIcon = styled.div`
  font-size: 1.2rem;
`;

const MissingItemText = styled.div`
  flex: 1;
  text-align: left;
`;

const ApplicationStatus = ({ status }) => {
  if (!status) return null;

  // Add default values and null checks
  const { 
    completion_percentage = 0, 
    required_fields = [], 
    uploaded_documents = [], 
    missing_documents = [] 
  } = status;

  // Round completion percentage to whole number
  const roundedPercentage = Math.round(completion_percentage);

  // Group fields by status with null checks
  const completedFields = required_fields.filter(field => field && field.status === 'completed') || [];
  const missingFields = required_fields.filter(field => field && field.status === 'missing') || [];

  // Group fields by category with null checks
  const personalFields = required_fields.filter(field => 
    field && ['full_legal_name', 'date_of_birth', 'current_address', 'city_province_postal', 'marital_status', 'residency_status'].includes(field.field_name)
  ) || [];
  const employmentFields = required_fields.filter(field => 
    field && ['employee_name', 'employer_name', 'gross_pay', 'net_pay'].includes(field.field_name)
  ) || [];
  const financialFields = required_fields.filter(field => 
    field && ['account_holder_name', 'account_number', 'bank_name', 'closing_balance'].includes(field.field_name)
  ) || [];

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
      closing_balance: '💳'
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

  return (
    <Container>
      <ProgressSection>
        <ProgressInfo>
          <ProgressTitle>Document Criteria Met</ProgressTitle>
          <ProgressBar>
            <ProgressFill percentage={roundedPercentage} />
          </ProgressBar>
          <ProgressText>
            {roundedPercentage}% Complete ({completedFields.length} of {required_fields.length} fields)
          </ProgressText>
        </ProgressInfo>
        <StatusBadge status={roundedPercentage === 100 ? 'completed' : 'in_progress'}>
          {roundedPercentage === 100 ? '✅ Complete' : '🔄 In Progress'}
        </StatusBadge>
      </ProgressSection>

      <FieldsSection>
        <FieldGroup>
          <FieldGroupTitle>👤 Personal Information</FieldGroupTitle>
          <FieldList>
            {personalFields.map(field => (
              <FieldItem key={field.field_name}>
                <FieldInfo>
                  <FieldIcon>{getFieldIcon(field.field_name)}</FieldIcon>
                  <FieldDetails>
                    <FieldName>{field.field_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</FieldName>
                    <FieldSources>
                      From: {Array.isArray(field.source_documents) ? field.source_documents.join(', ') : field.source_documents || 'Unknown'}
                    </FieldSources>
                  </FieldDetails>
                </FieldInfo>
                <FieldStatus status={field.status}>
                  {field.status === 'completed' ? '✅' : '⏳'} {field.status}
                </FieldStatus>
              </FieldItem>
            ))}
          </FieldList>
        </FieldGroup>

        <FieldGroup>
          <FieldGroupTitle>💼 Employment Information</FieldGroupTitle>
          <FieldList>
            {employmentFields.map(field => (
              <FieldItem key={field.field_name}>
                <FieldInfo>
                  <FieldIcon>{getFieldIcon(field.field_name)}</FieldIcon>
                  <FieldDetails>
                    <FieldName>{field.field_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</FieldName>
                    <FieldSources>
                      From: {Array.isArray(field.source_documents) ? field.source_documents.join(', ') : field.source_documents || 'Unknown'}
                    </FieldSources>
                  </FieldDetails>
                </FieldInfo>
                <FieldStatus status={field.status}>
                  {field.status === 'completed' ? '✅' : '⏳'} {field.status}
                </FieldStatus>
              </FieldItem>
            ))}
          </FieldList>
        </FieldGroup>

        <FieldGroup>
          <FieldGroupTitle>🏦 Financial Information</FieldGroupTitle>
          <FieldList>
            {financialFields.map(field => (
              <FieldItem key={field.field_name}>
                <FieldInfo>
                  <FieldIcon>{getFieldIcon(field.field_name)}</FieldIcon>
                  <FieldDetails>
                    <FieldName>{field.field_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</FieldName>
                    <FieldSources>
                      From: {Array.isArray(field.source_documents) ? field.source_documents.join(', ') : field.source_documents || 'Unknown'}
                    </FieldSources>
                  </FieldDetails>
                </FieldInfo>
                <FieldStatus status={field.status}>
                  {field.status === 'completed' ? '✅' : '⏳'} {field.status}
                </FieldStatus>
              </FieldItem>
            ))}
          </FieldList>
        </FieldGroup>
      </FieldsSection>

      {uploaded_documents && uploaded_documents.length > 0 && (
        <DocumentsSection>
          <DocumentsTitle>📤 Uploaded Documents ({uploaded_documents.length})</DocumentsTitle>
          <DocumentsList>
            {uploaded_documents.map((doc, index) => (
              <DocumentItem key={index}>
                <DocumentIcon>{getDocumentIcon(doc.document_type)}</DocumentIcon>
                <DocumentInfo>
                  <DocumentName>{doc.filename}</DocumentName>
                  <DocumentMeta>
                    Type: {doc.document_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} • 
                    Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                  </DocumentMeta>
                </DocumentInfo>
              </DocumentItem>
            ))}
          </DocumentsList>
        </DocumentsSection>
      )}

      {missing_documents && missing_documents.length > 0 && (
        <MissingDocumentsSection>
          <MissingTitle>❌ Missing Documents ({missing_documents.length})</MissingTitle>
          <MissingList>
            {missing_documents.map((docType, index) => (
              <MissingItem key={index}>
                <MissingItemIcon>{getDocumentIcon(docType)}</MissingItemIcon>
                <MissingItemText>
                  {docType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </MissingItemText>
              </MissingItem>
            ))}
          </MissingList>
        </MissingDocumentsSection>
      )}

      {missingFields && missingFields.length > 0 && (
        <MissingDocumentsSection>
          <MissingTitle>⚠️ Missing Fields ({missingFields.length})</MissingTitle>
          <MissingList>
            {missingFields.map((field, index) => (
              <MissingItem key={index}>
                <MissingItemIcon>{getFieldIcon(field.field_name)}</MissingItemIcon>
                <MissingItemText>
                  {field.field_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '2px' }}>
                    From: {Array.isArray(field.source_documents) ? field.source_documents.join(', ') : field.source_documents || 'Unknown'}
                  </div>
                </MissingItemText>
              </MissingItem>
            ))}
          </MissingList>
        </MissingDocumentsSection>
      )}
    </Container>
  );
};

export default ApplicationStatus;
