// src/contexts/TransactionContext.jsx
import { createContext } from 'react';
import { useApi } from '../hooks/useApi';

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const api = useApi();

  return <TransactionContext.Provider value={api}>{children}</TransactionContext.Provider>;
}
