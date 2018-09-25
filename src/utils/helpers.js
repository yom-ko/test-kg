export default function IsLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDuration(startDate, endDate) {
  // startDate/endDate must be strings of the format '2018-08-20'
  const startDateAr = startDate.split('-');
  const endDateAr = endDate.split('-');

  const [startYear, startMonth, startDay] = startDateAr;
  const [, endMonth, endDay] = endDateAr;

  const months = {
    '01': { dayCount: 31 },
    '02': { dayCount: IsLeapYear(Number(startYear)) ? 29 : 28 },
    '03': { dayCount: 31 },
    '04': { dayCount: 30 },
    '05': { dayCount: 31 },
    '06': { dayCount: 30 },
    '07': { dayCount: 31 },
    '08': { dayCount: 31 },
    '09': { dayCount: 30 },
    10: { dayCount: 31 },
    11: { dayCount: 30 },
    12: { dayCount: 31 }
  };

  const startDateNumber = Number(startDay);
  const endDateNumber = Number(endDay);

  const startMonthDayCount = months[startMonth].dayCount;

  const isSameMonth = startMonth === endMonth;

  return endDateNumber - startDateNumber + 1 + (!isSameMonth && startMonthDayCount);
}
