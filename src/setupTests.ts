// Setup for React 18 act environment
import { configure } from '@testing-library/dom';

// Setup DOM testing environment
Object.defineProperty(window, 'IS_REACT_ACT_ENVIRONMENT', {
  writable: true,
  value: true,
});

// Configure testing library to not throw on missing act warnings
configure({ testIdAttribute: 'data-testid' });
