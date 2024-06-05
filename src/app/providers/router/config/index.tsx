import { RouteProps } from 'react-router-dom'

import {
  CandidatesPage,
  CreatePostPage,
  ErrorPage,
  HomePage,
  PostPage,
  ProfilePage,
  SignInPage,
  SignUpPage,
} from '@/pages'

enum AppRoutes {
  HOME = 'home',
  CANDIDATES = 'candidates',
  CREATE_POST = 'createPost',
  PROFILE = 'profile',
  POST = 'post',
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
  NOTFOUND = 'notFound',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.CANDIDATES]: '/candidates',
  [AppRoutes.CREATE_POST]: '/create-post',
  [AppRoutes.POST]: '/post/:id',
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
