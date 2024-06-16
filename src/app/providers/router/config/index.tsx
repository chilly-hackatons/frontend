import { RouteProps } from 'react-router-dom'

import {
  CandidateProfilePage,
  CandidatesFeedback,
  CandidatesPage,
  CreatePostPage,
  CreateVacancyPage,
  ErrorPage,
  HomePage,
  PostPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
  VacanciesStatisticsPage,
  VacancyPage,
  VacancysPage,
} from '@/pages'

enum AppRoutes {
  HOME = 'home',
  CANDIDATES = 'candidates',
  CREATE_POST = 'createPost',
  PROFILE = 'profile',
  CANDIDATE_PROFILE = 'candidateProfile',
  POST = 'post',
  VACANCY = 'vacancy',
  VACANCYS = 'vacancys',
  VACANCY_CREATE = 'createVacancy',
  VACANCIES_STATISTICS = 'vacanciesStatistics',
  CANDIDATES_FEEDBACK = 'candidatesFeedback',
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
  NOTFOUND = 'notFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.CANDIDATES]: '/candidates',
  [AppRoutes.CREATE_POST]: '/create-post',
  [AppRoutes.POST]: '/post/:id',
  [AppRoutes.VACANCY_CREATE]: '/vacancy-create',
  [AppRoutes.VACANCY]: '/vacancy/:id',
  [AppRoutes.VACANCIES_STATISTICS]: '/vacancies-statistics',
  [AppRoutes.CANDIDATES_FEEDBACK]: '/candidates-feedback/:vacancyId',
  [AppRoutes.CANDIDATE_PROFILE]: '/candidate/:id',
  [AppRoutes.VACANCYS]: '/vacancys',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.SIGN_IN]: '/sign-in',
  [AppRoutes.SIGN_UP]: '/sign-up',
  [AppRoutes.NOTFOUND]: '*',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath.home,
    element: <HomePage />,
  },
  [AppRoutes.CANDIDATES]: {
    path: RoutePath.candidates,
    element: <CandidatesPage />,
  },
  [AppRoutes.CREATE_POST]: {
    path: RoutePath.createPost,
    element: <CreatePostPage />,
  },
  [AppRoutes.POST]: {
    path: RoutePath.post,
    element: <PostPage />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    element: <ProfilePage />,
  },
  [AppRoutes.VACANCY]: {
    path: RoutePath.vacancy,
    element: <VacancyPage />,
  },
  [AppRoutes.VACANCYS]: {
    path: RoutePath.vacancys,
    element: <VacancysPage />,
  },
  [AppRoutes.VACANCY_CREATE]: {
    path: RoutePath.createVacancy,
    element: <CreateVacancyPage />,
  },
  [AppRoutes.VACANCIES_STATISTICS]: {
    path: RoutePath.vacanciesStatistics,
    element: <VacanciesStatisticsPage />,
  },
  [AppRoutes.CANDIDATES_FEEDBACK]: {
    path: RoutePath.candidatesFeedback,
    element: <CandidatesFeedback />,
  },
  [AppRoutes.CANDIDATE_PROFILE]: {
    path: RoutePath.candidateProfile,
    element: <CandidateProfilePage />,
  },
  [AppRoutes.SIGN_IN]: {
    path: RoutePath.signIn,
    element: <SignInPage />,
  },
  [AppRoutes.SIGN_UP]: {
    path: RoutePath.signUp,
    element: <SignUpPage />,
  },
  [AppRoutes.NOTFOUND]: {
    path: RoutePath.notFound,
    element: <ErrorPage />,
  },
}
