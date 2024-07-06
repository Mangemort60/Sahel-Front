import { useAppSelector } from '../../redux/hooks'
import { BookingRequest } from './BookingRequest'
import { FormRequest } from './FormRequest'
import { QuoteReview } from './QuoteReview'
import imgForm from '../../assets/form.webp'
import React from 'react'

export const FormSection = React.forwardRef((_, ref) => {
  const currentStep = useAppSelector((state) => state.form.currentStep)

  const renderStep = () => {
    switch (currentStep) {
      case 'form':
        return <FormRequest />
      case 'review':
        return <QuoteReview />
      case 'booking':
        return <BookingRequest />
      default:
        return null
    }
  }

  return (
    <div ref={ref}>
      <div className="min-h-screen sm:flex sm:flex-row flex-col sm:justify-evenly justify-between items-center p-4 text-white sm:bg-cover sm:bg-center sm:bg-[url('../../assets/layeredWaves.webp')] bg-none">
        <div className="sm:w-1/2">
          <h1 className="text-secondaryDarkBlue sm:text-4xl text-3xl font-medium sm:mt-0 mt-8">
            Obtenez votre devis instantanément !
          </h1>
          <p className="text-secondaryBlue my-4">
            Complétez simplement le formulaire ci-contre pour recevoir un prix
            juste et transparent.
            <br />
            Aucune inscription requise.
          </p>
          <img
            src={imgForm}
            alt=""
            className=" w-full sm:w-full sm:mt-24 hidden sm:flex"
          />
        </div>
        <div className="bg-white w-full my-auto flex max-w-[460px] min-h-[750px] sm:px-8 py-4 px-2 sm:shadow-lg sm:rounded-sm">
          {renderStep()}
        </div>
      </div>
    </div>
  )
})
