export const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  let d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export function isBetween(d, start, end) {
  if (!start || !end) return false;
  const t = d.getTime(), s = start.getTime(), e = end.getTime();
  return t > Math.min(s, e) && t < Math.max(s, e);
}

export function isSameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}