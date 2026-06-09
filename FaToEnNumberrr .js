// تابع تبدیل اعداد انگلیسی به فارسی (همان چیزی که در نمودار نیاز دارید)
export const EnToFaNumber = (value) => {
  if (value === undefined || value === null) return '';
  const str = String(value);
  return str
    .replace(/0/g, '۰')
    .replace(/1/g, '۱')
    .replace(/2/g, '۲')
    .replace(/3/g, '۳')
    .replace(/4/g, '۴')
    .replace(/5/g, '۵')
    .replace(/6/g, '۶')
    .replace(/7/g, '۷')
    .replace(/8/g, '۸')
    .replace(/9/g, '۹');
};
