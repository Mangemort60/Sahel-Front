import layeredWaves from '../../assets/layeredWaves.svg'
import { FormRequest } from './FormRequest'
import { QuoteReview } from './QuoteReview'

export const FormSection = () => {
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
        <FormRequest />
        <QuoteReview />
      </div>
    </div>
  )
}
