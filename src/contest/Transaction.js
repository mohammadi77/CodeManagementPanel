export const getInitialData = () => {
  const savedData = localStorage.getItem("transactions");
  return savedData ? JSON.parse(savedData) : [];
};

export const addTransaction = (setData, formData) => {
  const newData = {
    date: formData.date,
    income: formData.income || 0,
    cost: formData.cost || 0,
    description: formData.description,
  };

  setData((prevData) => [newData, ...prevData]);
};

export const deleteTransaction = (setData, id) => {
  setData((prevData) => prevData.filter((_, i) => i !== id));
};
