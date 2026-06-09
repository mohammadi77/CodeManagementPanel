import { useContext, useState, useEffect, useRef, useMemo } from 'react';
import TransactionListTable from '../../components/TransactionListTable/TransactionListTable';
import Modal from '../../components/Modal/Modal';
import AddTransactionModal from '../../components/AddTransactionModal/AddTransactionModal';
import Delete from '../../components/Delete/Delete';
import { TransactionContext } from '../../contexts/TransactionContext';
import Modal_Edit_Delete from '../../components/Modal_Edit_Delete/Modal_Edit_Delete';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import DangerIcon from '../../assets/icons/DangerCircle.svg';
import plus from '../../assets/icons/Plus.svg';
import Button_Date from '../../components/Button_Date/Button_Date';
import SortOrderDropdown from '../../components/SortOrderDropdown/SortOrderDropdown';
import { filterByDateRange, sortTransactions } from '../../utils/dateHelpers';
import './TransactionList.css';

// تابع کمکی: تبدیل ارقام انگلیسی به فارسی (بدون تغییر جداکننده‌ها)
const convertDigitsToPersian = (str) => {
  if (!str) return '';
  return str.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

function TransactionList() {
  const { transactions, dataAdd, dataDelete, dataEdit, loading, error } =
    useContext(TransactionContext);

  // State مودال‌ها و منو
  const [modalAdd, setModalAdd] = useState(false);
  const [menuInfo, setMenuInfo] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const menuRef = useRef(null);

  // State فیلتر و مرتب‌سازی
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sortOrder, setSortOrder] = useState(null);

  // محاسبه لیست اصلی: فیلتر + مرتب‌سازی (مقادیر اصلی برای منطق پشت صحنه)
  const filteredAndSortedTransactions = useMemo(() => {
    if (!transactions) return [];
    const filtered = filterByDateRange(transactions, fromDate, toDate);
    if (sortOrder === null) return filtered;
    return sortTransactions(filtered, sortOrder);
  }, [transactions, fromDate, toDate, sortOrder]);

  // لیست نمایشی: تاریخ و شرح با اعداد فارسی (برای نمایش در جدول)
  const displayTransactions = useMemo(() => {
    return filteredAndSortedTransactions.map((item) => ({
      ...item,
      date: convertDigitsToPersian(item.date),
      description: convertDigitsToPersian(item.description),
    }));
  }, [filteredAndSortedTransactions]);

  // توابع کمکی
  const toggleAddModal = () => setModalAdd(!modalAdd);
  const toggleDeleteModal = () => setModalDelete(!modalDelete);
  const toggleEditModal = () => setModalEdit(!modalEdit);

  const handleMenuClick = (e, id) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuInfo({ id, x: rect.right, y: rect.bottom });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuInfo(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    toggleDeleteModal();
    setMenuInfo(null);
  };

  const confirmDelete = () => {
    if (deleteId) dataDelete(deleteId);
    toggleDeleteModal();
    setDeleteId(null);
  };

  const handleEditClick = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
      setEditTransaction(transaction);
      toggleEditModal();
    }
    setMenuInfo(null);
  };

  const closeEditModal = () => {
    setEditTransaction(null);
    toggleEditModal();
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      <div className="div-Home">
        <div className="div-First">
          <div className="header-list">
            <h2>تراکنش ها</h2>
            <button onClick={toggleAddModal} className="cursor-pointer">
              <img src={plus} id="icon" alt="" />
              افزودن تراکنش
            </button>
          </div>

          {/* نوار ابزار فیلتر و مرتب‌سازی */}
          <div className="filter-sort-toolbar">
            <Button_Date value={fromDate} onChange={setFromDate} label="از تاریخ" />
            <Button_Date value={toDate} onChange={setToDate} label="تا تاریخ" />

            <div className="sort-controls">
              <SortOrderDropdown
                value={sortOrder}
                onChange={setSortOrder}
                placeholder="انتخاب کنید"
              />
            </div>
          </div>

          {filteredAndSortedTransactions.length === 0 ? (
            <div className="empty">
              <img src={DangerIcon} alt="" />
              <span>هیچ تراکنشی با فیلترهای انتخاب شده یافت نشد!</span>
            </div>
          ) : (
            <TransactionListTable
              transactions={displayTransactions}
              onMenuClick={handleMenuClick}
            />
          )}
        </div>
      </div>

      {/* مودال افزودن */}
      {modalAdd && (
        <Modal toggleModal={toggleAddModal}>
          <AddTransactionModal toggleModal={toggleAddModal} dataAdd={dataAdd} />
        </Modal>
      )}

      {/* منوی کشویی */}
      {menuInfo && (
        <Modal_Edit_Delete
          ref={menuRef}
          x={menuInfo.x}
          y={menuInfo.y}
          id={menuInfo.id}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onClose={() => setMenuInfo(null)}
        />
      )}

      {/* مودال حذف */}
      {modalDelete && (
        <Modal toggleModal={toggleDeleteModal}>
          <Delete dataDelete={confirmDelete} toggleModal={toggleDeleteModal} id={deleteId} />
        </Modal>
      )}

      {/* مودال ویرایش */}
      {modalEdit && (
        <Modal toggleModal={closeEditModal}>
          <AddTransactionModal
            toggleModal={closeEditModal}
            dataAdd={dataAdd}
            dataEdit={dataEdit}
            editData={editTransaction}
          />
        </Modal>
      )}
    </>
  );
}

export default TransactionList;
