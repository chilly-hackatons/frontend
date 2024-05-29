import { MultipleSelector } from '@/shared/ui/multi-select'
import { FirstForm } from '@/widgets/RegisterForm/components/FirstForm'
import { RegistrationForm } from '@/widgets/RegisterForm/RegistrationForm'

const OPTIONS = [
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
    <div className="flex h-screen items-center justify-center">
      <RegistrationForm>
        <div>
          <FirstForm />
        </div>
        <div>
          <MultipleSelector defaultOptions={OPTIONS} />
        </div>
        <div>Form 3</div>
        <div>Form 4</div>
        <div>Form 5</div>
      </RegistrationForm>
    </div>
  )
}

export default SignUp
