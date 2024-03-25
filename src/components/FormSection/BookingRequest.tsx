import { CustomDatePicker } from './CustomDatePicker'
import { AddressForm } from './AddressForm'
import { useAppDispatch } from '../../redux/hooks'
import { setCurrentStep } from '../../redux/slices/formSlice'
import { FaArrowLeft } from 'react-icons/fa'

export const BookingRequest = () => {
  const dispatch = useAppDispatch()

  const handleReturnClick = () => {
    dispatch(setCurrentStep('review'))
  }

  return (
    <div className="flex flex-col gap-3 justify-start items-start p-6 bg-white sm:w-1/3 w-full  mt-4 max-w-[460px] h-auto shadow-lg rounded-md">
      <button
        onClick={() => handleReturnClick()}
        className="text-gray-400 mb-2 flex items-center gap-2"
      >
        <FaArrowLeft />
        <p>Retour</p>
      </button>
      <div className="text-black text-2xl mb-2">Reservez une date</div>
      <div className="">
        <CustomDatePicker />
      </div>
      <AddressForm />
    </div>
  )
}
