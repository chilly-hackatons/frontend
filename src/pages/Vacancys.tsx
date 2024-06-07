import { Link } from 'react-router-dom'

import { useFetchVacancys } from '@/shared/hooks/useFetchVacancys'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { VacancyCard } from '@/shared/ui/vacancy-card'

const Vacancys = () => {
  const { vacancys, loading } = useFetchVacancys()

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  return (
    <div className="container p-4 animate-fade flex flex-col gap-4">
      {vacancys.map((vacancy) => (
        <Link key={vacancy.id} to={`/vacancy/${vacancy.id}`}>
          <VacancyCard key={vacancy.id} {...vacancy} />
        </Link>
      ))}
    </div>
  )
}

export default Vacancys
