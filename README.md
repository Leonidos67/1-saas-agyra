# AI Assistant Dashboard

A modern SaaS CRM dashboard for managing AI-powered customer support agents and tickets. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Dashboard Overview**: Comprehensive analytics with charts and graphs
- **Ticket Management**: View and manage support tickets with AI analysis
- **Employee Management**: Manage human and AI support agents
- **Real-time Monitoring**: Track agent performance and customer satisfaction
- **Responsive Design**: Works on all device sizes

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Recharts (for data visualization)
- React Router DOM
- Framer Motion
- Heroicons

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd ai-assistant-dashboard
```

3. Install dependencies:
```bash
npm install
```

## Development

To run the application in development mode:

```bash
npm start
```

The application will start at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

## Deployment

This project can be deployed to GitHub Pages or Vercel:

### GitHub Pages
```bash
npm run deploy
```

### Vercel (recommended)
This project is configured for easy deployment to Vercel. Simply connect your GitHub repository to Vercel, and it will automatically build and deploy when you push changes.

Alternatively, you can deploy manually using the Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Common/          # Shared components
│   ├── Dashboard/       # Dashboard-specific components
│   ├── DetailsPanel/    # Details panel components
│   ├── Employees/       # Employee management components
│   └── Layout/          # Layout components
├── data/               # Mock data
├── pages/              # Page components
├── styles/             # Global styles
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## License

This project is open source and available under the [MIT License](LICENSE).