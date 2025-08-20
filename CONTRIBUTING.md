# Contributing to Mortgage Document Processing System

Thank you for your interest in contributing to the Mortgage Document Processing System! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Provide error messages and stack traces
- Include your operating system and browser information

### Suggesting Enhancements
- Use the GitHub issue tracker with the "enhancement" label
- Clearly describe the feature you'd like to see
- Explain why this feature would be useful

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📋 Development Setup

### Prerequisites
- Python 3.6+
- Node.js 14+
- Git

### Local Development
1. Clone your fork: `git clone https://github.com/Iamviratian1/mortgage-document-processor.git`
2. Install backend dependencies:
   ```bash
   cd mortgage-document-processor/textract
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```bash
   cd ../../
   npm install
   ```
4. Set up environment variables (see README.md)
5. Start the development servers

## 🧪 Testing

### Backend Testing
- Run Python tests: `python -m pytest`
- Ensure all API endpoints work correctly
- Test with various document formats

### Frontend Testing
- Run React tests: `npm test`
- Test all components and user flows
- Ensure responsive design works on different screen sizes

## 📝 Code Style

### Python
- Follow PEP 8 style guidelines
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Keep functions small and focused

### JavaScript/React
- Use ESLint and Prettier for code formatting
- Follow React best practices
- Use functional components with hooks
- Keep components small and reusable

## 🔒 Security

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Validate all user inputs
- Follow security best practices

## 📚 Documentation

- Update README.md if you add new features
- Add comments to complex code
- Update API documentation if endpoints change
- Include setup instructions for new dependencies

## 🚀 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation is updated
- [ ] No sensitive data is included
- [ ] Changes are tested locally

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Other

## Testing
Describe how you tested your changes

## Screenshots (if applicable)
Add screenshots for UI changes
```

## 🎯 Areas for Contribution

### High Priority
- Bug fixes
- Security improvements
- Performance optimizations
- Documentation improvements

### Medium Priority
- New document type support
- UI/UX improvements
- Additional field extraction
- Testing coverage

### Low Priority
- Code refactoring
- Minor UI tweaks
- Additional features

## 📞 Getting Help

- Check existing issues and pull requests
- Join our discussions in GitHub
- Review the documentation in README.md
- Ask questions in GitHub issues

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to make this project better! 🚀
