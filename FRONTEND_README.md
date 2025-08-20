# 🏦 Mortgage Document Processing System

A comprehensive AI-powered mortgage document processing system with modern web interface for automated document classification, field extraction, and application tracking.

## 🚀 Quick Start

### Prerequisites
1. **Mortgage API Server** running on port 3001
2. **Textract API Server** running on port 3000
3. **Python 3.6+** for backend services
4. **Node.js** for React frontend

### Start the System

1. **Start your API servers first:**
   ```bash
   # Terminal 1: Start Textract API
   cd mortgage-document-processor/textract/src
   python api_server.py
   
   # Terminal 2: Start Mortgage API  
   cd mortgage-document-processor/textract/src
   python mortgage_api.py
   ```

2. **Start the React frontend:**
   ```bash
   # Terminal 3: Start Frontend
   npm start
   ```

3. **Open your browser:**
   - The frontend will automatically open at: `http://localhost:3002`
   - Or manually navigate to the URL

## 🎯 Core Features

### ✅ Intelligent Document Processing
- **AI-Powered Classification**: Automatically identifies document types (bank statements, pay stubs, identity documents, etc.)
- **Field Extraction**: Extracts relevant information using AWS Textract
- **Multi-Document Support**: Process multiple documents simultaneously
- **Real-time Processing**: Instant feedback and progress tracking

### ✅ Application Management
- **New Application Creation**: Start fresh mortgage applications with unique IDs
- **Returning User Support**: Continue existing applications with application ID
- **Progress Tracking**: Real-time completion percentage and status updates

### ✅ Advanced Document Upload
- **Single Document Upload**: Upload one document at a time
- **Batch Document Upload**: Upload multiple documents simultaneously
- **Drag & Drop Interface**: Modern, intuitive file selection
- **Progress Indicators**: Real-time upload progress and batch processing results

### ✅ Comprehensive Data Management
- **Extracted Fields Display**: View all extracted information with confidence scores
- **Missing Items Tracking**: See exactly what documents and fields are still needed
- **Document History**: Track all uploaded documents and their processing status
- **Field Validation**: Automatic validation of extracted data

## 🎨 Modern User Interface

### Professional Design
- **React-based Frontend**: Modern, responsive web application
- **Tabbed Interface**: Organized view with User Profile, Extracted Fields, and Missing Items tabs
- **Real-time Updates**: Live status updates without page refresh
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

### Interactive Features
- **Sticky Navigation**: Tabs stay visible while scrolling
- **Loading States**: Visual feedback during processing
- **Success/Error Alerts**: Clear notification system
- **Progress Visualization**: Beautiful progress bars and completion indicators

## 🔧 Technical Architecture

### Backend Technologies
- **FastAPI**: High-performance Python web framework
- **AWS Textract**: AI-powered document analysis and data extraction
- **Supabase**: PostgreSQL database with real-time capabilities
- **Python 3.6+**: Modern Python with async support

### Frontend Technologies
- **React.js**: Modern JavaScript framework
- **Styled Components**: CSS-in-JS for maintainable styling
- **Fetch API**: Modern HTTP requests
- **ES6+**: Latest JavaScript features

### API Integration
- **RESTful APIs**: Clean, documented API endpoints
- **CORS Support**: Cross-origin requests enabled
- **Error Handling**: Comprehensive error management
- **File Upload**: Multi-part form data handling

## 📱 User Experience

### Landing Page
- **Two User Paths**: New Application vs Returning User
- **Clear Instructions**: Step-by-step guidance
- **Professional Presentation**: Clean, modern design

### Application Flow
1. **Start Application**: Create new application or continue existing one
2. **Upload Documents**: Single or batch document upload
3. **Monitor Progress**: Real-time status updates
4. **Review Results**: View extracted data and missing requirements

### Document Processing
- **Supported Formats**: PDF, JPEG, PNG, TIFF
- **Document Types**: Bank statements, pay stubs, identity documents, utility bills, etc.
- **Field Extraction**: Employee name, employer name, gross pay, net pay, account details, etc.

## 🔄 API Endpoints

The system provides these RESTful endpoints:

- `POST /v1/mortgage/start-application` - Create new application
- `POST /v1/mortgage/upload-document` - Upload single document
- `POST /v1/mortgage/upload-multiple-documents` - Upload multiple documents
- `GET /v1/mortgage/application-status/{id}` - Get application status
- `POST /v1/aws/qna` - AWS Textract document analysis

## 🐛 Troubleshooting

### Common Issues

1. **"Failed to start application"**
   - Ensure mortgage API server is running on port 3001
   - Check Supabase connection and credentials
   - Verify database schema is properly set up

2. **"Error uploading document"**
   - Verify Textract API server is running on port 3000
   - Check AWS credentials and S3 bucket configuration
   - Ensure document format is supported (PDF, JPG, PNG, TIFF)

3. **"CORS Error"**
   - Frontend includes CORS headers
   - Ensure you're accessing via `http://localhost:3002`
   - Check API server CORS configuration

4. **"Port already in use"**
   - Stop any existing servers on required ports
   - Check for running Python processes

### Debug Mode
- Open browser Developer Tools (F12)
- Check Console tab for JavaScript errors
- Check Network tab for API request/response details
- Review server logs for backend errors

## 🎉 Success Indicators

- ✅ **Green Progress Bar**: Application completion percentage
- ✅ **Completed Field Cards**: Successfully extracted information
- ✅ **Uploaded Document Cards**: Successfully processed documents
- ✅ **Success Alerts**: Confirmation messages
- ✅ **Extracted Data Display**: Shows all pulled information

## 🚀 Production Readiness

This system is designed for production use with:

1. **Scalable Architecture**: Can handle multiple concurrent users
2. **Error Recovery**: Graceful handling of failures
3. **Data Persistence**: Supabase database for reliable storage
4. **Security**: Environment variable configuration
5. **Monitoring**: Comprehensive logging and error tracking

## 📋 System Requirements

### Development
- Python 3.6+
- Node.js 14+
- AWS Account with Textract access
- Supabase account

### Production
- Linux/Windows server
- 2GB+ RAM
- 10GB+ storage
- Internet connectivity for AWS services

---

**Ready for Production Deployment! 🏦📄✨**

*This system provides a complete solution for mortgage document processing with AI-powered field extraction and modern web interface.*
