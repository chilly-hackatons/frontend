import { SignUpProvider } from '@/pages/SignUp/SignUpContext'
import { Steps } from '@/widgets/RegisterForm/components/Steps'
import { RegistrationForm } from '@/widgets/RegisterForm/RegistrationForm'

export const OPTIONS = [
  { label: 'nextjs', value: 'Nextjs' },
  { label: 'Vite', value: 'vite' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'Remix', value: 'remix' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Ember', value: 'ember' },
  { label: 'React', value: 'react' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Astro', value: 'astro' },
]

const SignUp = () => {
  return (
    <div className="flex items-center justify-center">
      <SignUpProvider>
        <RegistrationForm>
          <Steps />
        </RegistrationForm>
      </SignUpProvider>
    </div>
  )
}

export default SignUp
