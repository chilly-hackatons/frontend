import { Link } from 'react-router-dom'

import { RoutePath } from '@/app/providers/router/config'
import { Button } from '@/shared/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

export const LoginForm = () => {
    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Вход</CardTitle>
                <CardDescription>
                    Введите свой адрес электронной почты ниже, чтобы войти в свою учетную
                    запись
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Войти
                    </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                    У вас нет учетной записи?
                    <br />
                    <Link to={RoutePath.signUp} className="underline">
                        Зарегистрироваться
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}
