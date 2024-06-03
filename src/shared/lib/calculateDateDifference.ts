import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parseISO,
  subMonths,
  subYears,
} from 'date-fns'

/**
 * Функция для вычисления разницы между двумя датами в формате "X years Y months Z days".
 * @param date1Str - Первая дата в формате строки ISO.
 * @param date2Str - Вторая дата в формате строки ISO.
 * @returns Строка, представляющая разницу в годах, месяцах и днях.
 */
export const calculateDateDifference = (
  date1Str: string,
  date2Str: string,
): string => {
  // Преобразование строковых дат в объекты Date
  const date1 = parseISO(date1Str)
  const date2 = parseISO(date2Str)

  // Вычисление разницы в годах
  const yearsDifference = differenceInYears(date2, date1)

  // Вычитаем количество лет из date2 для вычисления оставшихся месяцев
  const dateAfterSubtractingYears = subYears(date2, yearsDifference)

  // Вычисление разницы в месяцах
  const monthsDifference = differenceInMonths(dateAfterSubtractingYears, date1)

  // Вычитаем количество месяцев из dateAfterSubtractingYears для вычисления оставшихся дней
  const dateAfterSubtractingMonths = subMonths(
    dateAfterSubtractingYears,
    monthsDifference,
  )

  // Вычисление разницы в днях
  const daysDifference = differenceInDays(dateAfterSubtractingMonths, date1)

  return `${yearsDifference} years ${monthsDifference} months ${daysDifference} days`
}
