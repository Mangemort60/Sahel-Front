import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { contactSchema } from '../schemas/contactFormSchema'
import getApiUrl from '../utils/getApiUrl'
import toast from 'react-hot-toast'
import { useState } from 'react'
import contactUs from '../assets/contact.webp'

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const apiUrl = getApiUrl()
  type FormData = z.infer<typeof contactSchema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(contactSchema) })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true)
      const response = await axios.post(`${apiUrl}/contact`, data)
      console.log('Message envoyé', response.data)
      reset()
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message")
      if (axios.isAxiosError(error)) {
        console.error(
          "Erreur lors de l'envoi du message:",
          error.response?.data,
        )
      } else {
        console.error('Erreur:', error)
      }
    } finally {
      setIsLoading(false)
      toast.success('Message envoyé avec succès', {
        duration: 4000, // Durée en millisecondes
        style: {
          background: '#649838', // Couleur de fond
          color: '#ffffff', // Couleur du texte
        },
      }) // Optionnel : Réinitialiser le formulaire après soumission réussie
    }
  }
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto font-sans sm:flex sm:flex-row  flex-col ">
      <div className="max-w-xl m-auto ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-secondaryDarkBlue sm:text-4xl ">
            Nous Contacter
          </h1>
          <p className="my-2 text-secondaryRegularBlue ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            voluptas unde. Modi vero quo sequi saepe unde porro officiis hic.
          </p>
        </div>
        <img
          src={contactUs}
          alt=""
          className="w-[400px] m-auto my-4 sm:flex hidden"
        />
      </div>
      <div>
        <div className="mt-12 max-w-lg mx-auto">
          <div className="flex flex-col border rounded-sm shadow-sm p-4 sm:p-6 lg:p-8 ">
            <h2 className="mb-8 text-xl font-semibold text-secondaryDarkBlue">
              Remplissez ce formulaire
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 lg:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block mb-2 text-sm text-secondaryRegularBlue font-medium "
                    >
                      Prénom
                    </label>
                    <input
                      {...register('firstname')}
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    {errors.firstname && (
                      <p className="text-red-500 text-sm">
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm text-secondaryRegularBlue font-medium "
                    >
                      Nom
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      name="name"
                      id="name"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-secondaryRegularBlue font-medium "
                    >
                      Email
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      name="email"
                      id="email"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm text-secondaryRegularBlue font-medium "
                    >
                      Téléphone
                    </label>
                    <input
                      {...register('phoneNumber')}
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="details"
                    className="block mb-2 text-sm text-secondaryRegularBlue font-medium "
                  >
                    Details
                  </label>
                  <textarea
                    {...register('details')}
                    id="details"
                    name="details"
                    rows={4}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  ></textarea>
                  {errors.details && (
                    <p className="text-red-500 text-sm">
                      {errors.details.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <div
                      className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-white rounded-full"
                      role="status"
                      aria-label="loading"
                    ></div>
                  ) : (
                    'Envoyer'
                  )}
                </button>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm text-gray-500 dark:text-neutral-500">
                  Nous reviendrons vers vous sous 24 à 48h
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 grid  items-center gap-4 ">
          <a
            className="group flex flex-col h-full text-center rounded-lg hover:bg-gray-100 p-4 sm:p-6 dark:hover:bg-neutral-500/10"
            href="#"
          >
            <svg
              className="size-9 text-gray-800 mx-auto dark:text-neutral-200"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <div className="mt-5">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                FAQ
              </h3>
              <p className="mt-1 text-gray-500 dark:text-neutral-500">
                Parcourez notre FAQ et trouvez peut-être la réponse à votre
                question
              </p>
              <p className="mt-5 inline-flex items-center gap-x-1 font-medium text-blue-600 dark:text-blue-500">
                Visitez notre FAQ
                <svg
                  className="flex-shrink-0 size-4 transition ease-in-out group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
