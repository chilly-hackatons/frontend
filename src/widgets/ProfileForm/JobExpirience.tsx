import { BriefcaseBusiness } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'

export const JobExpirience = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <BriefcaseBusiness className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-base text-muted-foreground group-hover:text-primary">
            Добавить место работы
          </p>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить место работы</DialogTitle>
          <DialogDescription>
            Заполните информацию по опыту работы
          </DialogDescription>
        </DialogHeader>
        contect
        <DialogFooter>
          <Button className="w-full mt-4">Добавить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
