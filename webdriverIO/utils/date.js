export default function formatDate(format, date) {
  let formatedDate = date || null;
  if (!formatedDate) formatedDate = Date.now();

  const d = new Date(formatedDate);
  const year = `${d.getFullYear()}`;
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  switch (format) {
    case 'yyyymmdd':
    case 'yyyy-mm-dd':
    case 'yyyy/mm/dd':
      formatedDate = `${year}-${month}-${day}`;
      break;
    case 'mmddyyyy':
    case 'mm-dd-yyyy':
    case 'mm/dd/yyyy':
      formatedDate = `${month}-${day}-${year}`;
      break;
    case 'ddmmyyyy':
    case 'dd-mm-yyyy':
    case 'dd/mm/yyyy':
      formatedDate = `${day}-${month}-${year}`;
      break;
    default:
      formatedDate = `${year}-${month}-${day}`;
  }

  return formatedDate;
}
