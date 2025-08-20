# 🔄 Complete Workflow Guide

## 📋 Table of Contents
1. [Initial Setup](#initial-setup)
2. [Development Workflow](#development-workflow)
3. [Testing Workflow](#testing-workflow)
4. [Deployment Workflow](#deployment-workflow)
5. [Maintenance Workflow](#maintenance-workflow)
6. [Troubleshooting Workflow](#troubleshooting-workflow)

---

## 🚀 Initial Setup

### Step 1: Repository Setup
```bash
# Clone the repository
git clone https://github.com/Iamviratian1/mortgage-document-processor.git
cd mortgage-document-processor

# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Mortgage Document Processing System"
git remote add origin https://github.com/Iamviratian1/mortgage-document-processor.git
git branch -M main
git push -u origin main
```

### Step 2: Environment Setup

#### 2.1 AWS Configuration
1. **Create AWS Account** (if not exists)
   - Go to https://aws.amazon.com/
   - Sign up for AWS account
   - Set up billing information

2. **Create IAM User**
   ```bash
   # AWS CLI setup
   aws configure
   # Enter your AWS Access Key ID
   # Enter your AWS Secret Access Key
   # Enter your default region (e.g., us-east-1)
   # Enter your output format (json)
   ```

3. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-mortgage-documents-bucket
   aws s3api put-bucket-versioning --bucket your-mortgage-documents-bucket --versioning-configuration Status=Enabled
   ```

4. **Enable Textract Service**
   - Go to AWS Console → Textract
   - Enable Textract service
   - Note down the service limits

#### 2.2 Supabase Configuration
1. **Create Supabase Account**
   - Go to https://supabase.com/
   - Sign up and create new project

2. **Get Project Credentials**
   - Go to Settings → API
   - Copy Project URL and anon public key

3. **Run Database Schema**
   ```sql
   -- Copy and paste the contents of supabase_simplified_schema.sql
   -- Execute in Supabase SQL Editor
   ```

#### 2.3 Environment Variables
Create `.env` file in `mortgage-document-processor/textract/`:
```env
# AWS Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_DEFAULT_REGION=us-east-1
S3_BUCKET=your-mortgage-documents-bucket

# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key

# Application Configuration
FRONTEND_PORT=3002
MORTGAGE_API_PORT=3001
TEXTRACT_API_PORT=3000
```

### Step 3: Dependencies Installation

#### 3.1 Backend Dependencies
```bash
# Navigate to backend directory
cd mortgage-document-processor/textract

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 3.2 Frontend Dependencies
```bash
# Navigate to root directory
cd ../../

# Install Node.js dependencies
npm install
```

### Step 4: Verify Installation
```bash
# Test backend installation
cd mortgage-document-processor/textract/src
python -c "import fastapi; print('FastAPI installed successfully')"
python -c "import boto3; print('AWS SDK installed successfully')"

# Test frontend installation
cd ../../
npm run build
```

---

## 🔧 Development Workflow

### Daily Development Process

#### Step 1: Start Development Environment
```bash
# Terminal 1: Start Textract API Server
cd mortgage-document-processor/textract/src
python api_server.py

# Terminal 2: Start Mortgage API Server
cd mortgage-document-processor/textract/src
python mortgage_api.py

# Terminal 3: Start React Frontend
cd ../../
npm start
```

#### Step 2: Development Tasks
1. **Frontend Development**
   ```bash
   # Make changes to React components
   # Files: src/components/*.js
   
   # Test changes in browser
   # Open: http://localhost:3002
   ```

2. **Backend Development**
   ```bash
   # Make changes to Python files
   # Files: mortgage-document-processor/textract/src/*.py
   
   # Restart servers after changes
   # Ctrl+C to stop, then restart
   ```

#### Step 3: Code Changes Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... edit files ...

# Test changes
npm test  # Frontend tests
python -m pytest  # Backend tests

# Commit changes
git add .
git commit -m "Add new feature: description"

# Push to remote
git push origin feature/new-feature

# Create Pull Request on GitHub
```

#### Step 4: Code Review Process
1. **Create Pull Request**
   - Go to GitHub repository
   - Click "Compare & pull request"
   - Fill out PR template
   - Request reviews

2. **Review Process**
   - Review code changes
   - Run tests
   - Check documentation
   - Approve or request changes

3. **Merge to Main**
   ```bash
   git checkout main
   git pull origin main
   git merge feature/new-feature
   git push origin main
   ```

---

## 🧪 Testing Workflow

### Unit Testing
```bash
# Backend Testing
cd mortgage-document-processor/textract
python -m pytest tests/ -v

# Frontend Testing
npm test
```

### Integration Testing
```bash
# Test API endpoints
curl -X POST http://localhost:3001/v1/mortgage/start-application \
  -H "Content-Type: application/json" \
  -d '{"applicant_name": "Test User"}'

# Test document upload
curl -X POST http://localhost:3000/v1/aws/qna \
  -F "file=@test-document.pdf"
```

### End-to-End Testing
1. **Manual Testing Checklist**
   - [ ] Start new application
   - [ ] Upload single document
   - [ ] Upload multiple documents
   - [ ] Verify field extraction
   - [ ] Check application status
   - [ ] Test error handling

2. **Browser Testing**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

### Performance Testing
```bash
# Load testing with Apache Bench
ab -n 100 -c 10 http://localhost:3001/v1/mortgage/application-status/test-id

# Memory usage monitoring
# Use browser DevTools → Performance tab
```

---

## 🚀 Deployment Workflow

### Development Deployment

#### Step 1: Build Application
```bash
# Build frontend
npm run build

# Test production build
npm run serve
```

#### Step 2: Environment Configuration
```bash
# Production environment variables
cp .env .env.production
# Edit .env.production with production values
```

### Production Deployment

#### Option 1: AWS Deployment
```bash
# Deploy to AWS EC2
# 1. Launch EC2 instance
# 2. Install dependencies
sudo yum update -y
sudo yum install -y python3 nodejs npm

# 3. Clone repository
git clone https://github.com/Iamviratian1/mortgage-document-processor.git

# 4. Setup environment
cd mortgage-document-processor
# Copy .env.production to .env

# 5. Install dependencies
cd mortgage-document-processor/textract
pip3 install -r requirements.txt
cd ../../
npm install

# 6. Build frontend
npm run build

# 7. Start services with PM2
npm install -g pm2
pm2 start ecosystem.config.js
```

#### Option 2: Docker Deployment
```bash
# Create Dockerfile
# Build and run containers
docker-compose up -d
```

#### Option 3: Heroku Deployment
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-mortgage-app

# Set environment variables
heroku config:set AWS_ACCESS_KEY_ID=your_key
heroku config:set AWS_SECRET_ACCESS_KEY=your_secret
heroku config:set SUPABASE_URL=your_url
heroku config:set SUPABASE_KEY=your_key

# Deploy
git push heroku main
```

### Post-Deployment Verification
1. **Health Checks**
   ```bash
   # Check API endpoints
   curl http://your-domain.com/health
   curl http://your-domain.com/v1/mortgage/application-status/test
   ```

2. **Monitor Logs**
   ```bash
   # Application logs
   pm2 logs
   # or
   heroku logs --tail
   ```

3. **Performance Monitoring**
   - Set up AWS CloudWatch
   - Monitor response times
   - Check error rates

---

## 🔧 Maintenance Workflow

### Daily Maintenance
```bash
# Check application status
pm2 status
# or
heroku ps

# Monitor logs
pm2 logs --lines 100
# or
heroku logs --tail

# Check disk space
df -h
```

### Weekly Maintenance
```bash
# Update dependencies
npm update
pip install --upgrade -r requirements.txt

# Backup database
# Supabase provides automatic backups

# Review error logs
# Check for patterns and issues
```

### Monthly Maintenance
```bash
# Security updates
npm audit fix
pip install --upgrade pip

# Performance review
# Analyze response times
# Check resource usage

# Update documentation
# Review and update README.md
# Update API documentation
```

---

## 🐛 Troubleshooting Workflow

### Common Issues and Solutions

#### Issue 1: API Server Won't Start
```bash
# Check if port is in use
netstat -tulpn | grep :3001
# or
lsof -i :3001

# Kill process if needed
kill -9 <PID>

# Check environment variables
echo $AWS_ACCESS_KEY_ID
echo $SUPABASE_URL

# Restart server
python api_server.py
```

#### Issue 2: Frontend Build Fails
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
# Should be 14+ or 16+

# Rebuild
npm run build
```

#### Issue 3: Database Connection Issues
```bash
# Test Supabase connection
curl -X GET "https://your-project.supabase.co/rest/v1/" \
  -H "apikey: your_supabase_key"

# Check environment variables
cat .env | grep SUPABASE

# Verify schema
# Run schema.sql again in Supabase
```

#### Issue 4: AWS Textract Errors
```bash
# Test AWS credentials
aws sts get-caller-identity

# Check S3 bucket access
aws s3 ls s3://your-bucket-name

# Verify Textract permissions
aws textract list-document-analysis-jobs
```

### Debug Mode
```bash
# Enable debug logging
export DEBUG=*
python api_server.py

# Browser debugging
# Open DevTools (F12)
# Check Console and Network tabs
```

### Emergency Procedures
```bash
# Rollback to previous version
git log --oneline
git checkout <previous-commit-hash>

# Restart all services
pm2 restart all
# or
heroku restart

# Contact support
# Create issue on GitHub
# Include error logs and steps to reproduce
```

---

## 📊 Monitoring and Analytics

### Application Monitoring
```bash
# Set up monitoring with PM2
pm2 install pm2-server-monit
pm2 install pm2-logrotate

# Monitor CPU and Memory
pm2 monit
```

### Error Tracking
```bash
# Set up Sentry for error tracking
npm install @sentry/react @sentry/tracing

# Configure in your React app
```

### Performance Monitoring
```bash
# Set up AWS CloudWatch
# Monitor API Gateway metrics
# Track Lambda function performance
```

---

## 🔒 Security Workflow

### Security Checklist
- [ ] Environment variables are secure
- [ ] API keys are rotated regularly
- [ ] Dependencies are up to date
- [ ] HTTPS is enabled in production
- [ ] CORS is properly configured
- [ ] Input validation is implemented
- [ ] SQL injection prevention is in place

### Security Updates
```bash
# Regular security audits
npm audit
pip-audit

# Update vulnerable dependencies
npm audit fix
pip install --upgrade package-name
```

---

## 📈 Scaling Workflow

### Horizontal Scaling
```bash
# Load balancer setup
# Multiple server instances
# Database read replicas
```

### Vertical Scaling
```bash
# Increase server resources
# Optimize database queries
# Implement caching
```

---

## 📝 Documentation Workflow

### Code Documentation
```bash
# Update docstrings
# Add inline comments
# Update README.md
```

### API Documentation
```bash
# Update API endpoints
# Document new features
# Maintain changelog
```

---

This workflow guide covers all aspects of your mortgage document processing system from development to production deployment. Follow these steps to ensure smooth operation and maintenance of your application.
