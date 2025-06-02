# React TypeScript Webpack Tailwind Project

A modern React application built with TypeScript, bundled with Webpack, and styled with Tailwind CSS.

## Features

- ⚛️ **React 18** - Latest React with TypeScript support
- 🔧 **TypeScript** - Type-safe JavaScript
- ⚡ **Webpack 5** - Fast bundling with hot reload
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧪 **Jest & Testing Library** - Comprehensive testing framework
- 🚀 **Modern tooling** - PostCSS, Autoprefixer

## Getting Started

### Prerequisites

Make sure you have Node.js installed (version 14 or higher).

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm start
# or
npm run dev
```

The application will open at `http://localhost:3000` with hot reload enabled.

### Build for Production

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate test coverage report:
```bash
npm run test:coverage
```

The coverage report will be generated in the `coverage` directory.

## Project Structure

```
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── __tests__/         # Test files directory
│   │   └── utils.test.ts  # Utility function tests
│   ├── App.tsx            # Main App component
│   ├── App.test.tsx       # App component tests
│   ├── index.tsx          # Entry point
│   ├── index.css          # Tailwind CSS imports
│   ├── setupTests.ts      # Jest setup file
│   └── utils.ts           # Utility functions
├── coverage/              # Test coverage reports (generated)
├── jest.config.js         # Jest configuration
├── webpack.config.js      # Webpack configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start development server
- `npm run dev` - Start development server and open browser
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Technologies Used

- React 18
- TypeScript
- Webpack 5
- Tailwind CSS
- Jest & React Testing Library
- PostCSS
- Autoprefixer

## Testing

This project includes a comprehensive testing setup with Jest and React Testing Library.

### Test Structure

- **Component Tests**: Tests for React components using `@testing-library/react`
- **Unit Tests**: Tests for utility functions and business logic
- **Integration Tests**: Tests that verify component interactions

### Writing Tests

Example component test:
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

test('renders component correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});
```

Example utility function test:
```typescript
import { myUtilFunction } from './utils';

test('utility function works correctly', () => {
  expect(myUtilFunction('input')).toBe('expected output');
});
```

### Test Coverage

The project is configured to generate test coverage reports. Run `npm run test:coverage` to see:
- Line coverage
- Function coverage
- Branch coverage
- Statement coverage

Coverage reports are generated in the `coverage/` directory and can be viewed in your browser.

## License

MIT
