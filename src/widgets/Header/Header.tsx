import { Link } from 'react-router-dom'

import { useAuthUser } from '@/app/providers/auth'
import { RoutePath } from '@/app/providers/router/config'
import { LogoIcon } from '@/shared/icons/LogoIcon'
import { NavItem } from '@/shared/ui/nav-item'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/shared/ui/navigation-menu'
import { HeaderProfileInfo } from '@/shared/ui/profile-info'

export const Header = () => {
  const { isAuthenticated, user } = useAuthUser()

  if (!isAuthenticated) {
    return null
  }

  const isRecruiter = user?.type === 'RECRUITER'

  return (
    <header className="container p-4 flex justify-between animate-fade">
      <Link to={RoutePath.home}>
        <LogoIcon />
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavItem href={RoutePath.home} title="Главная" />
          </NavigationMenuItem>

          {isRecruiter && (
            <NavigationMenuItem>
              <NavItem href={RoutePath.candidates} title="Кандидаты" />
            </NavigationMenuItem>
          )}

          {isRecruiter && (
            <NavigationMenuItem>
              <NavItem href={RoutePath.candidates} title="Вакансии" />
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <HeaderProfileInfo />
    </header>
  )
}
