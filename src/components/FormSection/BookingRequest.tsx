import { CustomDatePicker } from './CustomDatePicker'
import { AddressForm } from './AddressForm'
export const BookingRequest = () => {
  return (
    <div className="flex flex-col gap-3 justify-start items-start p-6 bg-white sm:w-1/3 w-full  mt-4 max-w-[460px] h-auto shadow-lg rounded-md">
      <div className="text-black text-2xl mb-3">Reservez une date</div>
      <div className="">
        <CustomDatePicker />
      </div>
      <AddressForm />
    </div>
  )
}
