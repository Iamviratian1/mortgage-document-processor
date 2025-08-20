# 🚀 Quick Setup Guide for Mortgage Document Processor

## Prerequisites
- Python 3.6+ installed
- Node.js 14+ installed
- AWS account with Textract access
- Supabase account

## Step 1: Environment Setup

1. **Create `.env` file** in `mortgage-document-processor/textract/`:
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

## Step 2: Database Setup

1. **Run the SQL schema** in your Supabase SQL Editor:
   - Copy and paste the contents of `mortgage-document-processor/textract/supabase_simplified_schema.sql`
   - Execute the SQL commands

## Step 3: Install Dependencies

1. **Backend dependencies:**
```bash
cd mortgage-document-processor/textract
pip install -r requirements.txt
```

2. **Frontend dependencies:**
```bash
npm install
```

## Step 4: Start the System

1. **Start Textract API (Terminal 1):**
```bash
cd mortgage-document-processor/textract/src
python api_server.py
```

2. **Start Mortgage API (Terminal 2):**
```bash
cd mortgage-document-processor/textract/src
python mortgage_api.py
```

3. **Start React Frontend (Terminal 3):**
```bash
npm start
```

## Step 5: Access the System

- **Frontend**: http://localhost:3002
- **Mortgage API**: http://localhost:3001
- **Textract API**: http://localhost:3000

## Testing the System

1. **Start a new application**
2. **Upload a test document** (PDF or image)
3. **Check the extracted fields**
4. **Monitor the progress**

## Troubleshooting

- **Port conflicts**: Stop any existing servers on ports 3000, 3001, 3002
- **AWS errors**: Verify your AWS credentials and S3 bucket
- **Database errors**: Check Supabase connection and schema
- **Frontend issues**: Clear browser cache and restart

## Support

For issues or questions, check the main README.md file for detailed documentation.
