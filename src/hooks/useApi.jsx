// src/hooks/useApi.js
import { useReducer, useEffect } from 'react';
import useFetch from './useFetch';

const initialState = {
  transactions: [],
  loading: true,
  error: null,
};

function transactionReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload.updatedData : t
        ),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function useApi() {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  const {
    data,
    loading: fetchLoading,
    error: fetchError,
  } = useFetch('http://localhost:3000/transactions', {}, 5000);

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: data });
    }
  }, [data]);

  useEffect(() => {
    if (fetchError) {
      dispatch({ type: 'SET_ERROR', payload: fetchError });
    }
  }, [fetchError]);

  useEffect(() => {
    if (!fetchLoading && !data && !fetchError) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: [] });
    }
  }, [fetchLoading, data, fetchError]);

  const dataAdd = async (formData) => {
    const newTransaction = {
      id: crypto.randomUUID(),
      ...formData,
      amount: Number(formData.amount),
    };
    try {
      const res = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });
      if (!res.ok) throw new Error('خطا در افزودن');
      const saved = await res.json();
      dispatch({ type: 'ADD_TRANSACTION', payload: saved });
    } catch (err) {
      console.error(err);
    }
  };

  const dataDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/transactions/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    } catch (err) {
      console.error(err);
    }
  };

  const dataEdit = async (id, updatedData) => {
    try {
      const res = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updatedData,
          amount: Number(updatedData.amount),
        }),
      });
      const updated = await res.json();
      dispatch({
        type: 'EDIT_TRANSACTION',
        payload: { id, updatedData: updated },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return {
    transactions: state.transactions,
    loading: state.loading,
    error: state.error,
    dataAdd,
    dataDelete,
    dataEdit,
  };
}
