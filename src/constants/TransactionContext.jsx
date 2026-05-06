import { createContext, useReducer, useEffect } from "react";

export const TransactionContext = createContext();

const initialState = {
  transactions: JSON.parse(localStorage.getItem("transactions")) || [],
};

function transactionReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id
            ? { ...t, ...action.payload.updatedData }
            : t,
        ),
      };
    default:
      return state;
  }
}

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  const dataAdd = (formData) => {
    const newData = { id: crypto.randomUUID(), ...formData };
    dispatch({ type: "ADD_TRANSACTION", payload: newData });
  };

  const dataDelete = (id) =>
    dispatch({ type: "DELETE_TRANSACTION", payload: id });

  const dataEdit = (id, updatedData) =>
    dispatch({ type: "EDIT_TRANSACTION", payload: { id, updatedData } });

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        dataAdd,
        dataDelete,
        dataEdit,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
