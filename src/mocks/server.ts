// src/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Initialize the MSW server with your handlers
export const server = setupServer(...handlers);