import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parseISO,
  subMonths,
  subYears,
} from 'date-fns'

/**
 * Функция для вычисления разницы между двумя датами в формате "X лет Y месяцев Z дней".
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

  // Функции для склонения слов
  const getYearsDeclension = (years: number) => {
    if (years % 10 === 1 && years % 100 !== 11) return 'год'
    if (
      years % 10 >= 2 &&
      years % 10 <= 4 &&
      (years % 100 < 10 || years % 100 >= 20)
    )
      return 'года'
    return 'лет'
  }

  const getMonthsDeclension = (months: number) => {
    if (months % 10 === 1 && months % 100 !== 11) return 'месяц'
    if (
      months % 10 >= 2 &&
      months % 10 <= 4 &&
      (months % 100 < 10 || months % 100 >= 20)
    )
      return 'месяца'
    return 'месяцев'
  }

  const getDaysDeclension = (days: number) => {
    if (days % 10 === 1 && days % 100 !== 11) return 'день'
    if (
      days % 10 >= 2 &&
      days % 10 <= 4 &&
      (days % 100 < 10 || days % 100 >= 20)
    )
      return 'дня'
    return 'дней'
  }

  // Создаем массив строк с разницей
  const parts = []
  if (yearsDifference > 0) {
    parts.push(`${yearsDifference} ${getYearsDeclension(yearsDifference)}`)
  }
  if (monthsDifference > 0) {
    parts.push(`${monthsDifference} ${getMonthsDeclension(monthsDifference)}`)
  }
  if (daysDifference > 0) {
    parts.push(`${daysDifference} ${getDaysDeclension(daysDifference)}`)
  }

  return parts.join(' ')
}
