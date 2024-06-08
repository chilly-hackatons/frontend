import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useFetchVacancys } from '@/shared/hooks/useFetchVacancys'
import { Input } from '@/shared/ui/input'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { useDebounce } from '@/shared/ui/multi-select'
import { VacancyCard } from '@/shared/ui/vacancy-card'

const Vacancys = () => {
  const [search, setSearch] = useState('')

  const searchDebouncedValue = useDebounce(search, 500)

  const { vacancys, loading } = useFetchVacancys(searchDebouncedValue)

  const isVacancyEmpty = vacancys.length === 0

  return (
    <div className="container p-4 animate-fade flex flex-col gap-4">
      <div className="flex gap-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск"
        />
      </div>

      {loading && (
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {isVacancyEmpty && search && (
        <div className="flex items-center justify-center mt-20">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            🥺 Ничего не найдено 🥺
          </h3>
        </div>
      )}

      {vacancys.map((vacancy) => (
        <Link key={vacancy.id} to={`/vacancy/${vacancy.id}`}>
          <VacancyCard key={vacancy.id} {...vacancy} />
        </Link>
      ))}
    </div>
  )
}

export default Vacancys
