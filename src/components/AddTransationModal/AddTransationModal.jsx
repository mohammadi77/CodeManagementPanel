// import "./AddTransationModal.css";
// import { addTransaction, getTransactions } from "../../contest/Transaction";
// import React, { useState } from "react";
// import CloseIcon from "../../assets/icons/Button Close.svg";

// function AddTransationModal({ toogleModal }) {
//   // state برای فرم
//   const [formData, setFormData] = useState({
//     date: "",
//     amount: "",
//     type: "income",
//     description: "",
//   });

//   // وقتی کاربر input را تغییر داد
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // وقتی فرم submit شد
//   const handleSubmit = (e) => {
//     e.preventDefault(); // جلوگیری از reload صفحه

//     // تبدیل amount و type به نام‌های مشابه submit
//     const submit = {
//       date: formData.date,
//       income: formData.type === "income" ? Number(formData.amount) : 0,
//       cost: formData.type === "expense" ? Number(formData.amount) : 0,
//       description: formData.description,
//     };

//     addTransaction(submit); // اضافه کردن تراکنش به آرایه    // اینجا می‌توانی submit را در آرایه یا context ذخیره کنی
//     console.log(getTransactions());
//     toogleModal(); // بستن مودال بعد از ثبت
//   };

//   return (
//     <div className="add-Transation">
//       <div>
//         <h4>افزودن تراکنش</h4>
//         <img src={CloseIcon} alt="بستن" onClick={toogleModal} />
//       </div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           تاریخ
//           <div className="date-input">
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </label>
//         <label>
//           مبلغ (تومان)
//           <input
//             type="number"
//             name="amount"
//             value={formData.amount}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <div id="type">
//           <span>نوع تراکنش</span>
//           <div>
//             <label>
//               <input
//                 type="radio"
//                 name="type"
//                 value="income"
//                 checked={formData.type === "income"}
//                 onChange={handleChange}
//               />
//               درآمد
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="type"
//                 value="expense"
//                 checked={formData.type === "expense"}
//                 onChange={handleChange}
//               />
//               هزینه
//             </label>
//           </div>
//         </div>
//         <label>
//           شرح
//           <input
//             type="text"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </label>
//         <div>
//           <input type="button" onClick={toogleModal} value="انصراف" />
//           <input type="submit" value="ثبت" />
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AddTransationModal;
import React, { useState } from "react";
import CloseIconD from "../../assets/icons/Button Close.svg";
import CloseIconM from "../../assets/icons/Line 1.svg";
import "./AddTransationModal.css";
import { addTransaction } from "../../contest/Transaction";

function AddTransationModal({ toogleModal }) {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "income",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submit = {
      date: formData.date,
      income: formData.type === "income" ? Number(formData.amount) : 0,
      cost: formData.type === "expense" ? Number(formData.amount) : 0,
      description: formData.description,
    };

    addTransaction(submit);
    toogleModal();
  };

  return (
    <div className="add-Transation">
      <div className="header-modal">
        {" "}
        <img
          src={CloseIconM}
          alt="بستن"
          onClick={toogleModal}
          id="CloseIconM"
        />
        <h4>افزودن تراکنش</h4>
        <img
          src={CloseIconD}
          alt="بستن"
          onClick={toogleModal}
          id="CloseIconD"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          تاریخ
          <div className="date-input">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </label>
        <label>
          مبلغ (تومان)
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <div id="type">
          <span>نوع تراکنش</span>
          <div>
            <label>
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === "income"}
                onChange={handleChange}
              />
              درآمد
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === "expense"}
                onChange={handleChange}
              />
              هزینه
            </label>
          </div>
        </div>
        <label>
          شرح
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <div className="modal-buttons">
          <input type="button" onClick={toogleModal} value="انصراف" />
          <input type="submit" value="ثبت" />
        </div>
      </form>
    </div>
  );
}

export default AddTransationModal;
