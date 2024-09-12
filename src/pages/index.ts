import { lazy } from 'react'

export const HomePage = lazy(() => import('./Home'))
export const CandidatesPage = lazy(() => import('./Canditates'))
export const CreatePostPage = lazy(() => import('./CreatePost'))
export const PostPage = lazy(() => import('./Post'))
export const VacancyPage = lazy(() => import('./Vacancy'))
export const VacancysPage = lazy(() => import('./Vacancys'))
export const CandidatesFeedback = lazy(() => import('./CandidatesFeedback'))
export const CreateVacancyPage = lazy(() => import('./CreateVacancy'))
export const ProfilePage = lazy(() => import('./Profile'))
export const CandidateProfilePage = lazy(() => import('./CandidateProfile'))
export const SignUpPage = lazy(() => import('./SignUp/SignUp'))
export const SignInPage = lazy(() => import('./SignIn/SignIn'))
export const ErrorPage = lazy(() => import('./Error'))
export const VacanciesStatisticsPage = lazy(
  () => import('./VacanciesStatistics'),
)
