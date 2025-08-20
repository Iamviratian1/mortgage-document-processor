# 🏦 Mortgage Document Processing System

A comprehensive AI-powered mortgage document processing system with modern React frontend and Python backend for automated document classification, field extraction, and application tracking.

## 🎯 Features

- **AI-Powered Document Processing**: Uses AWS Textract for intelligent document analysis
- **Modern React Frontend**: Beautiful, responsive web interface
- **Document Classification**: Automatically identifies document types (bank statements, pay stubs, etc.)
- **Field Extraction**: Extracts relevant information from documents
- **Application Management**: Track mortgage applications with unique IDs
- **Real-time Processing**: Instant feedback and progress tracking
- **Multi-Document Support**: Process multiple documents simultaneously

## 🚀 Quick Start

### Prerequisites
- Python 3.6+
- Node.js 14+
- AWS account with Textract access
- Supabase account

### 1. Clone the Repository
```bash
git clone https://github.com/Iamviratian1/mortgage-document-processor.git
cd mortgage-document-processor
```

### 2. Environment Setup
Create `.env` file in `mortgage-document-processor/textract/`:
```env
# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_DEFAULT_REGION=us-east-1
S3_BUCKET=your_s3_bucket_name

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

### 3. Database Setup
Run the SQL schema in your Supabase SQL Editor:
- Copy contents of `mortgage-document-processor/textract/supabase_simplified_schema.sql`
- Execute in Supabase SQL Editor

### 4. Install Dependencies
```bash
# Backend dependencies
cd mortgage-document-processor/textract
pip install -r requirements.txt

# Frontend dependencies
cd ../../
npm install
```

### 5. Start the System
```bash
# Terminal 1: Start Textract API
cd mortgage-document-processor/textract/src
python api_server.py

# Terminal 2: Start Mortgage API
cd mortgage-document-processor/textract/src
python mortgage_api.py

# Terminal 3: Start React Frontend
cd ../../
npm start
```

### 6. Access the System
- **Frontend**: http://localhost:3002
- **Mortgage API**: http://localhost:3001
- **Textract API**: http://localhost:3000

## 📁 Project Structure

```
textract/
├── mortgage-document-processor/     # Backend Python services
│   └── textract/
│       ├── src/
│       │   ├── api_server.py       # Textract API server
│       │   ├── mortgage_api.py     # Mortgage application API
│       │   ├── document_processor.py # Document processing logic
│       │   └── config/             # Configuration files
│       ├── requirements.txt        # Python dependencies
│       └── supabase_simplified_schema.sql
├── src/                            # React frontend
│   ├── components/                 # React components
│   ├── App.js                      # Main app component
│   └── index.js                    # App entry point
├── public/                         # Static assets
├── package.json                    # Frontend dependencies
└── README.md                       # This file
```

## 🔧 API Endpoints

### Mortgage API (Port 3001)
- `POST /v1/mortgage/start-application` - Create new application
- `POST /v1/mortgage/upload-document` - Upload single document
- `POST /v1/mortgage/upload-multiple-documents` - Upload multiple documents
- `GET /v1/mortgage/application-status/{id}` - Get application status

### Textract API (Port 3000)
- `POST /v1/aws/qna` - AWS Textract document analysis

## 🎨 Frontend Features

- **Modern UI**: React-based with styled-components
- **Tabbed Interface**: User Profile, Extracted Fields, Missing Items
- **Drag & Drop**: Intuitive file upload interface
- **Real-time Updates**: Live status updates without page refresh
- **Mobile Responsive**: Works on desktop and mobile devices

## 🔄 Backend Technologies

- **FastAPI**: High-performance Python web framework
- **AWS Textract**: AI-powered document analysis
- **Supabase**: PostgreSQL database with real-time capabilities
- **Python 3.6+**: Modern Python with async support

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

### Debug Mode
- Open browser Developer Tools (F12)
- Check Console tab for JavaScript errors
- Check Network tab for API request/response details
- Review server logs for backend errors

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the detailed documentation in `FRONTEND_README.md`
3. Check the setup guide in `SETUP_GUIDE.md`
4. Open an issue on GitHub

---

**Ready for Production Deployment! 🏦📄✨**

*This system provides a complete solution for mortgage document processing with AI-powered field extraction and modern web interface.*
