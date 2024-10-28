# ExpenseTracker

A modern, responsive expense tracking application built with React and Vite. Track your expenses, visualize spending patterns, and manage your financial data with ease.

![ExpenseTracker](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

- 📊 Interactive dashboard with expense visualization
- 📱 Fully responsive design for all devices
- 📈 Real-time charts and statistics
- 🗂️ Category-based expense tracking
- 📅 Historical expense analysis
- 💰 Multi-currency support
- 🔄 Local storage persistence
- ⚡ Lightning-fast performance with Vite

## Tech Stack

- React 18
- Vite
- React Router
- Chart.js
- Framer Motion
- TailwindCSS
- Lucide Icons
- date-fns

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
expense-tracker/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   └── main.jsx         # Application entry point
├── public/              # Static assets
└── package.json        # Project dependencies and scripts
```

## Features in Detail

### Dashboard
- Overview of total expenses
- Daily expense trends
- Category distribution
- Recent transactions
- Quick expense addition

### History
- Monthly expense breakdown
- Category-wise analysis
- Interactive charts
- Detailed transaction history

### Settings
- User preferences management
- Currency selection
- Data management
- Profile settings

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI Components styled with [TailwindCSS](https://tailwindcss.com)
- Charts powered by [Chart.js](https://www.chartjs.org)