import { formatDistanceToNow } from 'date-fns'

import { Badge } from '@/shared/ui/badge'

const text =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quidem.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quidem.'

export const ApplicantCard = () => {
  return (
    <button className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">Это тайтл?</div>
          </div>
          <div className="ml-auto text-xs">
            {formatDistanceToNow(new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
      <div className="line-clamp-4 text-xs text-muted-foreground">
        {text.slice(0, 250)}
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="default">react</Badge>
      </div>
    </button>
  )
}
