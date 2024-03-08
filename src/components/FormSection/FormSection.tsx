import layeredWaves from '../../assets/layeredWaves.svg'
import { useAppSelector } from '../../redux/hooks'
import { FormRequest } from './FormRequest'
import { QuoteReview } from './QuoteReview'

export const FormSection = () => {
  const isSubmitted = useAppSelector((state) => state.form.isSubmitted)

  console.log(isSubmitted)

  return (
    <div>
      {' '}
      <div
        className="h-screen flex sm:flex-row flex-col sm:justify-evenly justify-between items-center p-4 text-white"
        style={{
          backgroundImage: `url(${layeredWaves})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-black sm:text-5xl sm:w-1/3 text-3xl font-light">
          Remplissez ce formulaire et obtenez votre devis en quelques minutes !
        </h1>
        {isSubmitted ? <QuoteReview /> : <FormRequest />}
      </div>
    </div>
  )
}
