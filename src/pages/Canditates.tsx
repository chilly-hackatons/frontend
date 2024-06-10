import { useState } from 'react'

import { useFetchCandidates } from '@/shared/hooks/useFetchCandidates'
import { ApplicantCard } from '@/shared/ui/applicant-card'
import { Input } from '@/shared/ui/input'
import { LoadingSpinner } from '@/shared/ui/loading-spinner'
import { useDebounce } from '@/shared/ui/multi-select'

const Canditates = () => {
  const [search, setSearch] = useState('')

  const searchDebouncedValue = useDebounce(search, 500)

  const { candidates, loading } = useFetchCandidates(searchDebouncedValue)

  const isCandidatesEmpty = candidates.length === 0

  return (
    <div className="container p-4  animate-fade flex flex-col gap-6">
      <div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск"
        />
        <p className="text-sm text-muted-foreground pl-2 pt-2">
          Поиск осуществляется по скиллам кандидата ( React, Frontend, Backend и
          т.д )
        </p>
      </div>

      <div className="grid grid-cols-homePosts gap-4">
        {loading && (
          <div className="flex h-screen items-center justify-center animate-fade">
            <LoadingSpinner />
          </div>
        )}

        {isCandidatesEmpty && search && !loading && (
          <div className="flex items-center justify-center mt-20 animate-fade">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              🥺 Ничего не найдено 🥺
            </h3>
          </div>
        )}

        {candidates.map((vacancy) => (
          <ApplicantCard key={vacancy.id} {...vacancy} />
        ))}
      </div>
    </div>
  )
}

export default Canditates
