# 🏦 Mortgage Document Processing System - Complete Workflow

## 📋 Overview
This document explains the complete workflow of how the Mortgage Document Processing System works, from user interaction to data extraction and storage.

---

## 🎯 System Architecture Overview

```
User Interface (React) → API Servers (FastAPI) → AWS Textract → Supabase Database
     ↓                        ↓                      ↓              ↓
  Frontend UI           Mortgage API +          AI Processing    Data Storage
  (Port 3002)          Textract API            (Document        (PostgreSQL)
                      (Ports 3001, 3000)       Analysis)
```

---

## 🔄 Complete System Workflow

### Phase 1: Application Initialization

#### Step 1: User Access
1. **User opens browser** and navigates to `http://localhost:3002`
2. **React frontend loads** with landing page
3. **User sees two options**:
   - "Start New Application" 
   - "Continue Existing Application"

#### Step 2: Application Creation
1. **User clicks "Start New Application"**
2. **Frontend sends POST request** to `/v1/mortgage/start-application`
3. **Mortgage API (Port 3001) receives request**
4. **API generates unique application ID** (UUID format)
5. **Creates new record in Supabase database**:
   ```sql
   INSERT INTO applications (id, status, created_at, completion_percentage)
   VALUES ('uuid-here', 'IN_PROGRESS', NOW(), 0)
   ```
6. **Returns application ID to frontend**
7. **Frontend stores application ID** in local state
8. **User is redirected to main application interface**

#### Step 3: Application Interface Loading
1. **Frontend loads three main tabs**:
   - **User Profile**: Application details and progress
   - **Extracted Fields**: Successfully extracted data
   - **Missing Items**: Required documents and fields
2. **Frontend fetches current application status** from `/v1/mortgage/application-status/{id}`
3. **Displays progress bar** showing completion percentage
4. **Shows upload interface** for documents

---

### Phase 2: Document Upload Process

#### Step 4: Document Selection
1. **User clicks "Upload Document"** or drags file to upload area
2. **Frontend validates file**:
   - File type (PDF, JPG, PNG, TIFF)
   - File size (max 10MB)
   - File format validation
3. **If validation passes**, file is prepared for upload
4. **If validation fails**, error message is shown to user

#### Step 5: Document Upload to Backend
1. **Frontend creates FormData** with file and application ID
2. **Sends POST request** to `/v1/mortgage/upload-document`
3. **Mortgage API receives file** and application ID
4. **API validates request**:
   - Checks if application exists
   - Validates file format
   - Checks file size
5. **Creates document record** in database:
   ```sql
   INSERT INTO documents (id, application_id, filename, status, uploaded_at)
   VALUES ('doc-uuid', 'app-uuid', 'filename.pdf', 'UPLOADED', NOW())
   ```

#### Step 6: File Storage in AWS S3
1. **API generates unique filename** for S3 storage
2. **Uploads file to AWS S3 bucket**:
   ```python
   s3_client.upload_fileobj(
       file_object,
       bucket_name,
       f"documents/{application_id}/{unique_filename}"
   )
   ```
3. **Updates document record** with S3 file path
4. **Returns success response** to frontend
5. **Frontend shows upload success** message

---

### Phase 3: Document Processing with AWS Textract

#### Step 7: Textract Processing Initiation
1. **Mortgage API sends document** to Textract API (Port 3000)
2. **Textract API receives request** at `/v1/aws/qna`
3. **API updates document status** to "PROCESSING"
4. **Creates Textract job** with document analysis:
   ```python
   response = textract_client.start_document_analysis(
       DocumentLocation={'S3Object': {
           'Bucket': bucket_name,
           'Name': s3_file_path
       }},
       FeatureTypes=["QUERIES"],
       QueriesConfig=queries_config
   )
   ```
5. **Stores job ID** in database for tracking

#### Step 8: Document Analysis by AWS Textract
1. **AWS Textract processes document**:
   - **OCR (Optical Character Recognition)**: Extracts text from images
   - **Layout Analysis**: Identifies tables, forms, and text blocks
   - **Query Processing**: Answers specific questions about document content
   - **Field Extraction**: Identifies key information fields

2. **Textract uses predefined queries** to extract:
   - **Employee Name**: "What is the employee name?"
   - **Employer Name**: "What is the employer name?"
   - **Gross Pay**: "What is the gross pay amount?"
   - **Net Pay**: "What is the net pay amount?"
   - **Pay Period**: "What is the pay period?"
   - **Account Number**: "What is the account number?"
   - **Bank Name**: "What is the bank name?"
   - **Statement Date**: "What is the statement date?"

#### Step 9: Processing Status Monitoring
1. **Textract API polls AWS** for job completion:
   ```python
   while True:
       response = textract_client.get_document_analysis(JobId=job_id)
       status = response['JobStatus']
       if status in ['SUCCEEDED', 'FAILED']:
           break
       await asyncio.sleep(5)
   ```

2. **Frontend polls for status updates**:
   - Sends GET request to `/v1/mortgage/application-status/{id}`
   - Updates progress indicators
   - Shows processing status to user

---

### Phase 4: Data Extraction and Processing

#### Step 10: Results Retrieval
1. **Textract job completes** successfully
2. **API retrieves all results** from AWS Textract:
   ```python
   response = textract_client.get_document_analysis(
       JobId=job_id,
       MaxResults=1000
   )
   ```

3. **Processes paginated results** (if document has multiple pages)
4. **Extracts query answers** from response:
   ```python
   for page in document.pages:
       query_answers = document.get_query_answers(page=page)
       for answer in query_answers:
           extracted_data.append({
               "alias": answer[1],  # Field name
               "text": answer[2],   # Extracted value
               "confidence": answer[3]  # Confidence score
           })
   ```

#### Step 11: Data Validation and Processing
1. **API validates extracted data**:
   - Checks confidence scores (minimum 70%)
   - Validates data formats (dates, amounts, etc.)
   - Removes duplicates and invalid entries

2. **Categorizes document type** based on extracted fields:
   - **Pay Stub**: Contains employee name, employer, pay amounts
   - **Bank Statement**: Contains account number, bank name, balances
   - **Identity Document**: Contains name, ID number, expiration date
   - **Utility Bill**: Contains account number, service provider, amount

3. **Updates document record** with extracted data and document type

---

### Phase 5: Data Storage and Organization

#### Step 12: Database Storage
1. **API stores extracted fields** in Supabase:
   ```sql
   INSERT INTO extracted_fields (
       id, application_id, document_id, field_name, 
       field_value, confidence_score, created_at
   ) VALUES (
       'field-uuid', 'app-uuid', 'doc-uuid', 'employee_name',
       'John Doe', 95.5, NOW()
   )
   ```

2. **Updates application completion percentage**:
   ```sql
   UPDATE applications 
   SET completion_percentage = calculated_percentage
   WHERE id = 'app-uuid'
   ```

3. **Marks document as processed**:
   ```sql
   UPDATE documents 
   SET status = 'PROCESSED', processed_at = NOW()
   WHERE id = 'doc-uuid'
   ```

#### Step 13: Missing Items Calculation
1. **API analyzes current data** against requirements
2. **Identifies missing documents** and fields:
   - Required document types not uploaded
   - Required fields not extracted
   - Low confidence extractions that need review

3. **Updates missing items** in database:
   ```sql
   INSERT INTO missing_items (
       application_id, item_type, item_name, priority, status
   ) VALUES (
       'app-uuid', 'DOCUMENT', 'Pay Stub', 'HIGH', 'MISSING'
   )
   ```

---

### Phase 6: Frontend Updates and User Feedback

#### Step 14: Real-time Updates
1. **Frontend receives updated application status**
2. **Updates progress bar** with new completion percentage
3. **Refreshes extracted fields tab** with new data:
   - Shows field name, value, and confidence score
   - Color-codes confidence levels (green = high, yellow = medium, red = low)
   - Allows user to edit low-confidence extractions

4. **Updates missing items tab**:
   - Shows required documents not yet uploaded
   - Lists missing fields from uploaded documents
   - Provides upload buttons for missing documents

#### Step 15: User Interaction with Results
1. **User can view extracted data** in organized format
2. **User can edit low-confidence extractions**:
   - Click on field value to edit
   - Frontend sends update to API
   - API updates database with corrected value

3. **User can upload additional documents**:
   - Returns to Step 4 for new document processing
   - System continues until all requirements met

4. **User can download extracted data**:
   - Frontend generates PDF or Excel report
   - Includes all extracted fields and confidence scores

---

### Phase 7: Application Completion

#### Step 16: Completion Check
1. **API checks if all requirements are met**:
   - All required documents uploaded
   - All required fields extracted
   - All confidence scores above threshold

2. **If complete, updates application status**:
   ```sql
   UPDATE applications 
   SET status = 'COMPLETED', completed_at = NOW(), completion_percentage = 100
   WHERE id = 'app-uuid'
   ```

3. **Generates completion notification** for user

#### Step 17: Final Report Generation
1. **API generates comprehensive report**:
   - All extracted data organized by document type
   - Confidence scores for each field
   - Missing items summary
   - Processing timeline

2. **Stores report in database** and S3
3. **Frontend displays completion summary**
4. **User can download final report**

---

## 🔧 Technical Process Flow

### Data Flow Diagram
```
User Input → Frontend Validation → API Validation → S3 Storage → 
Textract Processing → Data Extraction → Database Storage → 
Frontend Updates → User Review → Application Completion
```

### Error Handling Process
1. **Upload Errors**: File validation, size limits, format issues
2. **Processing Errors**: Textract failures, timeout issues
3. **Data Errors**: Low confidence extractions, missing fields
4. **System Errors**: Database connection, API failures

### Performance Optimizations
1. **Async Processing**: Non-blocking document analysis
2. **Caching**: Frequently accessed application data
3. **Batch Processing**: Multiple document uploads
4. **Progress Tracking**: Real-time status updates

---

## 📊 System Metrics and Monitoring

### Key Performance Indicators
- **Processing Time**: Average time per document
- **Accuracy Rate**: Percentage of successful extractions
- **User Completion Rate**: Applications completed vs started
- **Error Rate**: Failed uploads and processing errors

### Monitoring Points
1. **API Response Times**: Endpoint performance
2. **Textract Job Status**: Processing success rates
3. **Database Performance**: Query execution times
4. **Frontend Performance**: Page load times and user interactions

---

## 🔒 Security and Compliance

### Data Security
1. **File Encryption**: All files encrypted in S3
2. **API Authentication**: Secure endpoint access
3. **Database Security**: Encrypted data storage
4. **User Data Privacy**: PII protection measures

### Compliance Features
1. **Audit Trail**: Complete processing history
2. **Data Retention**: Configurable retention policies
3. **Access Controls**: Role-based permissions
4. **Encryption**: End-to-end data protection

---

This workflow ensures a smooth, efficient, and secure document processing experience from initial upload to final completion, with comprehensive error handling and user feedback throughout the entire process.
