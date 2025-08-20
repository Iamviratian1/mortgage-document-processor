import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
`;

const FieldCard = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const FieldHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
`;

const FieldIcon = styled.div`
  font-size: 1.5rem;
`;

const FieldTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  text-transform: capitalize;
`;

const FieldValue = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 1rem;
  color: #495057;
  font-weight: 500;
  word-break: break-word;
  min-height: 20px;
`;

const FieldMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #6c757d;
`;

const SourceDocument = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  color: #667eea;
`;

const Confidence = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  color: ${props => {
    if (props.confidence >= 0.8) return '#28a745';
    if (props.confidence >= 0.6) return '#ffc107';
    return '#dc3545';
  }};
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
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
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
    date_of_birth: '��',
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
    account_number: '🔢',
    provider_name: '🏢',
    bill_date: '📅'
  };
  
  // Try to match field name with icons
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

const formatFieldValue = (value) => {
  if (!value) return 'Not extracted';
  
  // Format currency values
  if (typeof value === 'string' && value.match(/^\$?\d+\.?\d*$/)) {
    // Remove dollar sign if present before parsing
    const numericValue = value.replace('$', '');
    const parsed = parseFloat(numericValue);
    if (!isNaN(parsed)) {
      return `$${parsed.toFixed(2)}`;
    }
  }
  
  // Format dates
  if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
    return new Date(value).toLocaleDateString();
  }
  
  return value;
};

const ExtractedData = ({ fields }) => {
  if (!fields || fields.length === 0) {
    return (
      <Container>
        <EmptyState>
          <div className="icon">📝</div>
          <div className="title">No Fields Extracted Yet</div>
          <div className="subtitle">
            Upload documents to see extracted information here. The AI will automatically identify and extract relevant fields from your documents.
          </div>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <FieldsGrid>
        {fields.map((field, index) => (
          <FieldCard key={index}>
            <FieldHeader>
              <FieldIcon>{getFieldIcon(field.field_name)}</FieldIcon>
              <FieldTitle>{formatFieldName(field.field_name)}</FieldTitle>
            </FieldHeader>
            
            <FieldValue>
              {formatFieldValue(field.value)}
            </FieldValue>
            
            <FieldMeta>
              <SourceDocument>
                📄 {field.source_document ? field.source_document.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown'}
              </SourceDocument>
              
              <Confidence confidence={field.confidence || 0.9}>
                {field.confidence ? `${Math.round(field.confidence * 100)}%` : '90%'} confidence
              </Confidence>
            </FieldMeta>
          </FieldCard>
        ))}
      </FieldsGrid>
    </Container>
  );
};

export default ExtractedData;
