# 🏦 SecureBank - Modern Online Banking Portal

A complete, responsive, and secure web application for online banking with both frontend UI/UX and backend functionality.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Status](https://img.shields.io/badge/status-demo-orange.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Demo Credentials](#demo-credentials)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Pages Overview](#pages-overview)
- [Development](#development)
- [License](#license)

## ✨ Features

### 🔐 Authentication & Security
- Secure user login with email/username and password
- Multi-factor authentication via SMS OTP
- CAPTCHA validation for bot protection
- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- Session timeout for inactivity
- Account lockout after failed login attempts
- Password reset functionality

### 💼 Account Management
- Multiple account types (Savings, Current, Fixed Deposit)
- Current and available balance display
- Masked account numbers for security
- Account summary dashboard
- Real-time balance updates

### 💸 Fund Transfer
- Multiple transfer modes: NEFT, RTGS, IMPS, UPI
- Beneficiary management (add, edit, delete)
- Two-step OTP verification for transfers
- Transfer limit validation per mode
- Real-time balance update
- Transaction history with detailed information
- Confirmation popup before submission

### 📄 Bill Payments & Recharge
- Multiple bill categories:
  - Electricity
  - Mobile
  - DTH (Direct to Home)
  - Credit Card
  - Gas
  - Broadband
- Real-time bill fetching simulation
- Multiple payment providers
- Payment history tracking
- Mobile/DTH recharge functionality

### 👤 User Profile & Settings
- Update personal information
- Change password securely
- Manage notification preferences (SMS/Email)
- Theme switcher (Light/Dark mode)
- Profile picture upload support
- MFA enable/disable

### 💬 Customer Support
- Interactive chatbot with FAQ responses
- Live chat simulation
- 24/7 support contact information
- Email and phone support options
- Common query responses

### 🔧 Admin Panel
- Role-based access control
- User management dashboard
- View all users and their status
- Activate/deactivate user accounts
- Unlock locked accounts
- Transaction monitoring
- Security activity logs
- Generate transaction reports
- System statistics and analytics

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Collapsible mobile menu
- Adaptive layouts

## 🛠 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Interactive functionality
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting
- **validator** - Input validation
- **uuid** - Unique ID generation

### Security
- JWT token authentication
- Password hashing (bcrypt)
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- SQL injection prevention
- XSS protection

## 📁 Project Structure

```
banking-portal/
├── backend/
│   ├── data/
│   │   └── mockData.js          # In-memory database with sample data
│   ├── middleware/
│   │   └── auth.js               # Authentication middleware
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── account.js            # Account management routes
│   │   ├── transfer.js           # Fund transfer routes
│   │   ├── billpay.js            # Bill payment routes
│   │   └── admin.js              # Admin panel routes
│   ├── utils/
│   │   └── otp.js                # OTP generation and verification
│   ├── .env.example              # Environment variables template
│   ├── package.json              # Dependencies
│   └── server.js                 # Main server file
├── frontend/
│   ├── css/
│   │   └── main.css              # Main stylesheet
│   ├── js/
│   │   ├── auth.js               # Authentication logic
│   │   └── dashboard.js          # Dashboard functionality
│   ├── index.html                # Login page
│   ├── dashboard.html            # Main dashboard
│   ├── accounts.html             # Account summary
│   ├── transfer.html             # Fund transfer
│   ├── billpay.html              # Bill payment
│   ├── profile.html              # User profile
│   ├── support.html              # Customer support
│   └── admin.html                # Admin panel
├── docs/
│   └── API.md                    # API documentation
└── README.md                     # This file
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd banking-portal
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Configure Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=24h
SESSION_TIMEOUT=1800000
OTP_EXPIRY=300000
BCRYPT_ROUNDS=10
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_TIME=900000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment (development/production) | development |
| `JWT_SECRET` | Secret key for JWT tokens | (required) |
| `JWT_EXPIRE` | JWT token expiration time | 24h |
| `SESSION_TIMEOUT` | Session timeout in milliseconds | 1800000 (30 min) |
| `OTP_EXPIRY` | OTP expiration time in milliseconds | 300000 (5 min) |
| `BCRYPT_ROUNDS` | Bcrypt hashing rounds | 10 |
| `MAX_LOGIN_ATTEMPTS` | Maximum login attempts before lockout | 5 |
| `LOCKOUT_TIME` | Account lockout duration in milliseconds | 900000 (15 min) |

## 🎮 Running the Application

### Development Mode

```bash
# From backend directory
cd backend
npm run dev
```

### Production Mode

```bash
# From backend directory
cd backend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:5000
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🔑 Demo Credentials

### Customer Account
- **Username**: `john.doe` or `jane.smith`
- **Password**: `Banking@123`
- **OTP**: Check server console for generated OTP

### Admin Account
- **Username**: `admin`
- **Password**: `Banking@123`
- **OTP**: Check server console for generated OTP

### Test Accounts
| User | Role | Email | Accounts | Balance |
|------|------|-------|----------|---------|
| John Doe | Customer | john.doe@example.com | 2 | $170,650.75 |
| Jane Smith | Customer | jane.smith@example.com | 1 | $89,750.50 |
| Admin | Administrator | admin@bankportal.com | N/A | N/A |

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/login`
Login with credentials and CAPTCHA validation.

**Request:**
```json
{
  "username": "john.doe",
  "password": "Banking@123",
  "captcha": "passed"
}
```

**Response:**
```json
{
  "success": true,
  "requiresMFA": true,
  "otpIdentifier": "USR001-1698765432000",
  "message": "OTP sent to your registered phone number."
}
```

#### POST `/api/auth/verify-otp`
Verify OTP and complete login.

**Request:**
```json
{
  "otpIdentifier": "USR001-1698765432000",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "USR001",
    "username": "john.doe",
    "email": "john.doe@example.com",
    "fullName": "John Doe",
    "role": "customer"
  }
}
```

### Account Endpoints

#### GET `/api/accounts`
Get all accounts for authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "accounts": [
    {
      "accountId": "ACC1001",
      "accountType": "Savings",
      "accountNumber": "****3456",
      "balance": 125450.75,
      "currency": "USD"
    }
  ]
}
```

#### GET `/api/accounts/:accountId/transactions`
Get transaction history for specific account.

### Transfer Endpoints

#### POST `/api/transfer/initiate`
Initiate fund transfer (sends OTP).

**Request:**
```json
{
  "fromAccountId": "ACC1001",
  "toAccountNumber": "2234567890123456",
  "amount": 1000.00,
  "transferMode": "NEFT",
  "remarks": "Payment for services"
}
```

#### POST `/api/transfer/execute`
Execute transfer after OTP verification.

### Bill Payment Endpoints

#### GET `/api/billpay/categories`
Get bill payment categories and providers.

#### POST `/api/billpay/fetch-bill`
Fetch bill details.

#### POST `/api/billpay/pay`
Pay bill.

### Admin Endpoints

#### GET `/api/admin/dashboard`
Get admin dashboard statistics.

#### GET `/api/admin/users`
Get all users.

#### PUT `/api/admin/users/:userId/status`
Update user status (activate/deactivate/unlock).

For complete API documentation, see [docs/API.md](docs/API.md).

## 🔒 Security Features

### Authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT token-based authentication
- ✅ Multi-factor authentication (MFA) with OTP
- ✅ CAPTCHA validation
- ✅ Account lockout after failed attempts
- ✅ Session timeout for inactivity

### API Security
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Auth rate limiting (5 login attempts per 15 minutes)
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation and sanitization
- ✅ SQL injection prevention
- ✅ XSS protection

### Data Protection
- ✅ Masked account numbers
- ✅ Encrypted HTTPS communication (in production)
- ✅ Secure password reset flow
- ✅ No sensitive data in logs
- ✅ Environment variables for secrets

## 📄 Pages Overview

### 1. Login Page (`index.html`)
- Clean, professional design
- Username/password authentication
- CAPTCHA validation
- OTP verification for MFA
- Forgot password link
- Demo credentials display

### 2. Dashboard (`dashboard.html`)
- Welcome message with user name
- Quick stats (accounts, balance)
- Quick access tiles
- Account overview cards
- Recent transactions table
- Responsive layout

### 3. Accounts (`accounts.html`)
- List of all user accounts
- Account details with balance
- Transaction history table
- Filter by account
- Download statements (planned)

### 4. Fund Transfer (`transfer.html`)
- Multiple transfer modes
- Beneficiary selection
- Amount validation
- OTP verification
- Transfer confirmation
- Success/failure notifications

### 5. Bill Payment (`billpay.html`)
- Bill categories grid
- Provider selection
- Bill fetch functionality
- Payment processing
- Payment history

### 6. Profile & Settings (`profile.html`)
- Personal information update
- Email and phone management
- Theme switcher (light/dark)
- Notification preferences
- Password change
- Security settings

### 7. Support (`support.html`)
- Interactive chatbot
- FAQ responses
- Contact information
- 24/7 support details

### 8. Admin Panel (`admin.html`)
- Dashboard statistics
- User management
- Transaction monitoring
- Activity logs
- Reports generation

## 👨‍💻 Development

### Running in Development

```bash
cd backend
npm run dev
```

The server will automatically restart on file changes using nodemon.

### Code Structure

- **Backend**: RESTful API with Express.js
- **Frontend**: Vanilla JavaScript with modern ES6+
- **Styling**: CSS3 with CSS variables for theming
- **Data**: Mock in-memory database (replace with MongoDB/PostgreSQL in production)

### Adding New Features

1. **Backend Route**: Create route file in `backend/routes/`
2. **API Logic**: Add business logic
3. **Frontend Page**: Create HTML file in `frontend/`
4. **JavaScript**: Add interaction logic
5. **Update Navigation**: Add links in header

### Testing

```bash
# Test user credentials
Username: john.doe
Password: Banking@123
OTP: Check server console
```

### Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Update `JWT_SECRET` with strong secret key
3. Configure real database (MongoDB/PostgreSQL)
4. Integrate real SMS/Email gateways for OTP
5. Enable HTTPS
6. Set up proper logging
7. Configure backup strategy

## 🐛 Known Issues

- **Mock Data**: Currently uses in-memory storage (data resets on server restart)
- **OTP Display**: OTP is printed to console (integrate real SMS gateway in production)
- **File Uploads**: Profile picture upload needs backend implementation
- **Real-time Updates**: WebSocket integration needed for real-time notifications

## 🚧 Planned Features

- [ ] Real database integration (MongoDB/PostgreSQL)
- [ ] Real SMS gateway integration (Twilio, AWS SNS)
- [ ] Email service integration (SendGrid, AWS SES)
- [ ] Transaction download/export (PDF, CSV)
- [ ] Advanced reporting and analytics
- [ ] WebSocket for real-time notifications
- [ ] Recurring payments/scheduled transfers
- [ ] Investment portfolio tracking
- [ ] Credit score tracking
- [ ] Loan application module

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Developer: Banking Portal Team
- Design: Inspired by modern banks (HDFC, ICICI, Revolut)

## 📞 Support

For support and queries:
- Email: support@securebank.com
- Phone: 1-800-BANK-HELP
- Website: https://securebank.example.com

## 🙏 Acknowledgments

- Design inspiration from modern banking portals
- Security best practices from OWASP
- UI patterns from Material Design and modern web standards

---

**⚠️ Disclaimer**: This is a demo application for educational and portfolio purposes. Do not use in production without proper security audits, real database implementation, and compliance with banking regulations.

**Made with ❤️ for secure and modern banking experiences**
