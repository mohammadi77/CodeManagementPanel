const months = {
  '۰۱': 'فروردین',
  '۰۲': 'اردیبهشت',
  '۰۳': 'خرداد',
  '۰۴': 'تیر',
  '۰۵': 'مرداد',
  '۰۶': 'شهریور',
  '۰۷': 'مهر',
  '۰۸': 'آبان',
  '۰۹': 'آذر',
  '۱۰': 'دی',
  '۱۱': 'بهمن',
  '۱۲': 'اسفند',
};

export const getPersianMonthName = (dateString) => {
  if (!dateString) return '';

  const parts = dateString.split('/');

  if (parts.length < 2) return '';

  const monthNumber = parts[1];

  return months[monthNumber] || '';
};
