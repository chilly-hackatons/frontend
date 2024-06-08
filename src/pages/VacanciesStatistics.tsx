import { useAuthUser } from '@/app/providers/auth'
import { useFetcVacanciesStatistics } from '@/shared/hooks/useFetcVacanciesStatistics'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'

const VacanciesStatistics = () => {
  const { user } = useAuthUser()

  const { isLoading, vacanciesStatistics } = useFetcVacanciesStatistics(user.id)

  return (
    <div className="container p-4 animate-fade ">
      {isLoading && <LoadingSpinner />}

      {vacanciesStatistics.map((vacancy) => (
        <div key={vacancy.id}>{vacancy.title}</div>
      ))}
    </div>
  )
}

export default VacanciesStatistics
