import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UploadArea = styled.div`
  border: 3px dashed ${props => props.isDragOver ? '#667eea' : '#ddd'};
  border-radius: 15px;
  padding: 40px 20px;
  text-align: center;
  background: ${props => props.isDragOver ? '#f0f4ff' : '#fafafa'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: #667eea;
    background: #f0f4ff;
  }
  
  ${props => props.disabled && `
    opacity: 0.6;
    cursor: not-allowed;
    border-color: #ccc;
    background: #f5f5f5;
    
    &:hover {
      border-color: #ccc;
      background: #f5f5f5;
    }
  `}
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
  color: ${props => props.disabled ? '#999' : '#667eea'};
`;

const UploadText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.disabled ? '#999' : '#333'};
  margin-bottom: 10px;
`;

const UploadSubtext = styled.div`
  font-size: 0.9rem;
  color: ${props => props.disabled ? '#999' : '#666'};
  line-height: 1.5;
`;

const FileInput = styled.input`
  display: none;
`;

const SelectedFilesContainer = styled.div`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 15px;
`;

const SelectedFilesTitle = styled.h4`
  margin: 0 0 15px 0;
  color: #495057;
  font-size: 1rem;
  font-weight: 600;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileItem = styled.div`
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const FileIcon = styled.div`
  font-size: 1.5rem;
`;

const FileDetails = styled.div`
  flex: 1;
`;

const FileName = styled.div`
  font-weight: 600;
  color: #2e7d32;
  margin-bottom: 5px;
`;

const FileSize = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const RemoveButton = styled.button`
  background: #ff5252;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #d32f2f;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const UploadButton = styled.button`
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
    transform: translateY(-1px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const BatchUploadButton = styled(UploadButton)`
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
    box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
  }
`;

const ProgressContainer = styled.div`
  background: #e3f2fd;
  border: 2px solid #bbdefb;
  border-radius: 10px;
  padding: 15px;
`;

const ProgressTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #1976d2;
  font-size: 1rem;
  font-weight: 600;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e3f2fd;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #1976d2 0%, #42a5f5 100%);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #1976d2;
`;

const BatchResultsContainer = styled.div`
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 15px;
`;

const BatchResultsTitle = styled.h4`
  margin: 0 0 15px 0;
  color: #495057;
  font-size: 1rem;
  font-weight: 600;
`;

const ResultItem = styled.div`
  padding: 10px 12px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const SuccessResult = styled(ResultItem)`
  border-left: 4px solid #28a745;
  background: #f8fff9;
`;

const ErrorResult = styled(ResultItem)`
  border-left: 4px solid #dc3545;
  background: #fff8f8;
`;

const SupportedFormats = styled.div`
  background: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  font-size: 0.9rem;
  color: #666;
  
  h4 {
    margin: 0 0 10px 0;
    color: #333;
    font-size: 1rem;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 5px;
  }
`;

const DocumentUpload = ({ onUpload, onBatchUpload, disabled }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [batchResults, setBatchResults] = useState([]);

  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/tiff'];
      return validTypes.includes(file.type);
    });

    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Only PDF and image files are supported.');
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSingleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles[0]);
      setSelectedFiles([]);
    }
  };

  const handleBatchUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setBatchResults([]);

    const results = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setCurrentFile(file.name);
      
      try {
        if (onBatchUpload) {
          await onBatchUpload(file);
        } else {
          await onUpload(file);
        }
        results.push({
          fileName: file.name,
          status: 'success',
          message: 'Document processed successfully'
        });
      } catch (error) {
        results.push({
          fileName: file.name,
          status: 'error',
          message: error.message || 'Failed to process document'
        });
      }
      
      setProgress(((i + 1) / selectedFiles.length) * 100);
    }

    setBatchResults(results);
    setIsProcessing(false);
    setCurrentFile('');
    setSelectedFiles([]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Container>
      <UploadArea
        isDragOver={isDragOver}
        disabled={disabled}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && document.getElementById('file-input').click()}
      >
        <UploadIcon disabled={disabled}>📄</UploadIcon>
        <UploadText disabled={disabled}>
          {disabled ? 'Start an application first' : 'Drop your documents here or click to browse'}
        </UploadText>
        <UploadSubtext disabled={disabled}>
          {disabled 
            ? 'You need to start an application before uploading documents'
            : 'Supports multiple PDF, JPEG, PNG, and other image formats'
          }
        </UploadSubtext>
        <FileInput
          id="file-input"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.gif,.bmp,.tiff"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          disabled={disabled}
        />
      </UploadArea>

      {selectedFiles.length > 0 && (
        <SelectedFilesContainer>
          <SelectedFilesTitle>Selected Files ({selectedFiles.length})</SelectedFilesTitle>
          <FileList>
            {selectedFiles.map((file, index) => (
              <FileItem key={index}>
                <FileInfo>
                  <FileIcon>📄</FileIcon>
                  <FileDetails>
                    <FileName>{file.name}</FileName>
                    <FileSize>{formatFileSize(file.size)}</FileSize>
                  </FileDetails>
                </FileInfo>
                <RemoveButton onClick={() => removeFile(index)}>
                  ✕
                </RemoveButton>
              </FileItem>
            ))}
          </FileList>
        </SelectedFilesContainer>
      )}

      {selectedFiles.length > 0 && (
        <ButtonContainer>
          <UploadButton 
            onClick={handleSingleUpload} 
            disabled={disabled || isProcessing}
          >
            📤 Upload Single Document
          </UploadButton>
          
          <BatchUploadButton 
            onClick={handleBatchUpload} 
            disabled={disabled || isProcessing}
          >
            {isProcessing ? '🔄 Processing...' : `📦 Upload All (${selectedFiles.length})`}
          </BatchUploadButton>
        </ButtonContainer>
      )}

      {isProcessing && (
        <ProgressContainer>
          <ProgressTitle>Processing Documents...</ProgressTitle>
          <ProgressBar>
            <ProgressFill percentage={progress} />
          </ProgressBar>
          <ProgressText>
            <span>{currentFile}</span>
            <span>{Math.round(progress)}% Complete</span>
          </ProgressText>
        </ProgressContainer>
      )}

      {batchResults.length > 0 && (
        <BatchResultsContainer>
          <BatchResultsTitle>Batch Processing Results</BatchResultsTitle>
          {batchResults.map((result, index) => {
            const ResultComponent = result.status === 'success' ? SuccessResult : ErrorResult;
            return (
              <ResultComponent key={index}>
                <strong>{result.fileName}</strong>: {result.message}
              </ResultComponent>
            );
          })}
        </BatchResultsContainer>
      )}

      <SupportedFormats>
        <h4>📋 Supported Document Types:</h4>
        <ul>
          <li><strong>Identity Documents:</strong> Passport, Driver's License, PR Card</li>
          <li><strong>Financial Documents:</strong> Bank Statements, Pay Stubs, Earnings Statements</li>
          <li><strong>Address Proof:</strong> Utility Bills, Lease Agreements</li>
          <li><strong>Other:</strong> Marriage Certificates, Government Correspondence</li>
        </ul>
      </SupportedFormats>
    </Container>
  );
};

export default DocumentUpload;
