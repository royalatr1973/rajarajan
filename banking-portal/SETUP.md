# 🚀 Quick Setup Guide

## Prerequisites
- Node.js v14+ installed
- npm v6+ installed

## Installation Steps

### 1. Install Dependencies

```bash
cd banking-portal/backend
npm install
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# The default values work for development
# For production, update JWT_SECRET and other secrets
```

### 3. Start the Server

```bash
# Development mode (auto-restart on changes)
npm run dev

# Or production mode
npm start
```

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:5000
```

## 🔑 Login Credentials

### Customer Account
- **Username**: `john.doe`
- **Password**: `Banking@123`
- **OTP**: Check terminal console

### Admin Account
- **Username**: `admin`
- **Password**: `Banking@123`
- **OTP**: Check terminal console

## 📝 Important Notes

1. **OTP in Console**: For demo purposes, OTPs are printed to the server console
2. **Mock Data**: All data is stored in memory and resets on server restart
3. **CAPTCHA**: Any input is accepted for demo (just type something)
4. **Port**: Default port is 5000 (change in .env if needed)

## 🛠 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3000
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Cannot Connect to Server
1. Check if server is running: `npm start`
2. Check firewall settings
3. Verify port is not blocked

## 📚 Next Steps

1. Explore the dashboard
2. Try fund transfers with OTP verification
3. Test bill payments
4. Check admin panel (login as admin)
5. Review API documentation in README.md

## 🔒 Security Reminder

⚠️ This is a **DEMO** application. Before production use:
- Replace mock database with real database
- Integrate real SMS/Email gateways
- Update JWT_SECRET with strong secret
- Enable HTTPS
- Implement proper logging and monitoring
- Conduct security audit
- Add compliance measures

## 💡 Features to Explore

- ✅ Multi-factor authentication
- ✅ Multiple transfer modes (NEFT, RTGS, IMPS, UPI)
- ✅ Bill payments across 6 categories
- ✅ Admin panel with user management
- ✅ Responsive design (test on mobile)
- ✅ Dark mode support
- ✅ Interactive support chatbot

## 📞 Need Help?

- Check README.md for detailed documentation
- Review API endpoints in docs/
- Check server console for errors and OTPs

---

**Happy Banking! 🏦**
