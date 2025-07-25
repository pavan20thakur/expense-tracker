# 💰 Expense Tracker

A modern, full-featured expense tracking application built with React, TypeScript, and Supabase. Track your expenses, manage your budget, and gain insights into your spending habits with multi-currency support.

![Expense Tracker](https://img.shields.io/badge/Status-Active-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)

## 🌟 Features

### 💸 **Expense Management**
- ✅ Add, edit, and delete expenses
- 📅 Date-based expense tracking
- 🏷️ Categorize expenses (Food, Transportation, Shopping, etc.)
- 🔄 Real-time expense updates

### 💰 **Salary & Budget Tracking**
- 💼 Set monthly salary
- 📊 Track remaining budget after expenses
- 📈 Savings rate calculation
- ⚠️ Budget overspend alerts

### 🌍 **Multi-Currency Support**
- 💱 Support for multiple currencies (USD, INR, EUR, GBP)
- 🔄 Automatic currency conversion
- 🎯 Indian Rupee (₹) as default currency
- 💲 Formatted currency display

### 📱 **User Experience**
- 🔐 Secure authentication with Supabase Auth
- 📊 Interactive dashboard with financial summary
- 📋 Tabbed interface (Dashboard, Expenses, Settings)
- 🎨 Modern UI with shadcn/ui components
- 📱 Responsive design for all devices

### 📈 **Financial Insights**
- 💯 Expense percentage of salary
- 💰 Remaining amount visualization
- 🏦 Savings rate tracking
- 📊 Monthly expense summaries

## 🚀 Live Demo

**Deployed URL**: [https://lovable.dev/projects/fc33df8b-28ad-4ffb-b6dd-41168fd16067](https://lovable.dev/projects/fc33df8b-28ad-4ffb-b6dd-41168fd16067)

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components

### **Backend & Database**
- **Supabase** - Backend as a Service
- **PostgreSQL** - Relational database
- **Row Level Security (RLS)** - Data security

### **Additional Libraries**
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **date-fns** - Date manipulation
- **Lucide React** - Beautiful icons
- **React Query** - Server state management

## 🏃‍♂️ Getting Started

### **Prerequisites**

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **bun** - Package manager
- **Git** - Version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/pavan20thakur/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or if you're using bun
   bun install
   ```

3. **Environment Setup**
   
   The Supabase configuration is already included in the project. If you want to use your own Supabase instance:
   
   - Create a new project at [supabase.com](https://supabase.com)
   - Update the configuration in `src/integrations/supabase/client.ts`
   - Run the migrations in your Supabase SQL editor

4. **Database Setup**
   
   If using a new Supabase instance, run these SQL commands in your Supabase SQL editor:
   
   ```sql
   -- Run the migration files in order:
   -- 1. supabase/migrations/20250725185650-c2ce08c5-52c9-426b-909b-6a46736db0b9.sql
   -- 2. supabase/migrations/20250725185728-239b5a82-f420-466f-ab04-e8d9bc07d2c6.sql
   -- 3. supabase/migrations/20250726000000-add-salary-feature.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running!

## 📁 Project Structure

```
expense-tracker/
├── 📁 public/                    # Static assets
├── 📁 src/
│   ├── 📁 components/           # React components
│   │   ├── 📁 ui/              # shadcn/ui components
│   │   ├── ExpenseForm.tsx     # Add expense form
│   │   ├── ExpenseList.tsx     # Display expenses
│   │   ├── FinancialSummary.tsx # Dashboard summary
│   │   ├── SalarySettings.tsx  # Salary configuration
│   │   └── ProtectedRoute.tsx  # Route protection
│   ├── 📁 hooks/               # Custom React hooks
│   │   ├── useAuth.ts          # Authentication hook
│   │   ├── useProfile.ts       # User profile hook
│   │   └── use-toast.ts        # Toast notifications
│   ├── 📁 integrations/        # External service integrations
│   │   └── 📁 supabase/        # Supabase configuration
│   ├── 📁 lib/                 # Utility libraries
│   │   ├── auth.ts             # Authentication utilities
│   │   ├── currency.ts         # Currency conversion
│   │   └── utils.ts            # General utilities
│   ├── 📁 pages/               # Page components
│   │   ├── Auth.tsx            # Login/Register page
│   │   ├── Index.tsx           # Main dashboard
│   │   └── NotFound.tsx        # 404 page
│   └── App.tsx                 # Main app component
├── 📁 supabase/                # Database migrations
└── 📄 README.md                # Project documentation
```

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🗄️ Database Schema

### **profiles**
- `id` - UUID primary key
- `user_id` - Foreign key to auth.users
- `email` - User email
- `monthly_salary` - Monthly salary amount
- `currency` - Preferred currency (INR, USD, EUR, GBP)
- `created_at` - Timestamp
- `updated_at` - Timestamp

### **expenses**
- `id` - UUID primary key
- `user_id` - Foreign key to auth.users
- `title` - Expense description
- `amount` - Expense amount
- `category` - Expense category
- `date` - Expense date
- `created_at` - Timestamp
- `updated_at` - Timestamp

## 🎯 Usage Guide

### **Getting Started**
1. **Sign Up** - Create a new account or sign in
2. **Set Salary** - Go to Settings tab and set your monthly salary
3. **Add Expenses** - Use the Dashboard to add your expenses
4. **Track Budget** - Monitor your spending vs. salary

### **Adding Expenses**
1. Fill in the expense title
2. Enter the amount
3. Select a category
4. Choose the date
5. Click "Add Expense"

### **Managing Salary**
1. Go to the Settings tab
2. Enter your monthly salary
3. Select your preferred currency
4. Save settings

## 🚀 Deployment

### **Deploy to Lovable (Recommended)**
1. Open your [Lovable project](https://lovable.dev/projects/fc33df8b-28ad-4ffb-b6dd-41168fd16067)
2. Click Share → Publish
3. Your app will be deployed automatically

### **Deploy to Vercel**
```bash
npm run build
npx vercel --prod
```

### **Deploy to Netlify**
```bash
npm run build
# Upload the dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Pavan Thakur**
- GitHub: [@pavan20thakur](https://github.com/pavan20thakur)

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev) - AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Backend powered by [Supabase](https://supabase.com)
- Icons from [Lucide](https://lucide.dev)

---

⭐ If you found this project helpful, please give it a star on GitHub!
