export const ToPersianWithSeparator = (number) => {
  if (number === null || number === undefined) return "";

  return number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // جداکننده هزارگان
    .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]); // تبدیل به فارسی
};
