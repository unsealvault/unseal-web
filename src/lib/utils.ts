export { cn } from "cn"

export function calculateDeliveryDate(duration: string): string {
  const targetDate = new Date();

  switch (duration) {
    case '6_months':
      targetDate.setMonth(targetDate.getMonth() + 6);
      break;
    case '1_year':
      targetDate.setFullYear(targetDate.getFullYear() + 1);
      break;
    case '3_years':
      targetDate.setFullYear(targetDate.getFullYear() + 3);
      break;
    case '5_years':
      targetDate.setFullYear(targetDate.getFullYear() + 5);
      break;
    default:
      targetDate.setFullYear(targetDate.getFullYear() + 1);
  }

  return targetDate.toISOString();
}