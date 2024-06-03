import { differenceInMonths, parseISO } from 'date-fns'

interface JobExperience {
  date: {
    from: string
    to: string
  }
  aboutWork: string
  companyTitle: string
}

const getWordForm = (num: number, forms: [string, string, string]): string => {
  const n = Math.abs(num) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) {
    return forms[2]
  }
  if (n1 > 1 && n1 < 5) {
    return forms[1]
  }
  if (n1 === 1) {
    return forms[0]
  }
  return forms[2]
}

export const calculateTotalExperience = (jobs: JobExperience[]): string => {
  let totalMonths = 0

  if (jobs.length === 0) {
    return 'Без опыта работы'
  }

  jobs.forEach((job) => {
    const from = parseISO(job.date.from)
    const to = parseISO(job.date.to)

    totalMonths += differenceInMonths(to, from)
  })

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  const yearsForm = getWordForm(years, ['год', 'года', 'лет'])
  const monthsForm = getWordForm(months, ['месяц', 'месяца', 'месяцев'])

  return `${years} ${yearsForm} и ${months} ${monthsForm}`
}
