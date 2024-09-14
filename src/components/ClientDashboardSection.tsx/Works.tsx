import { Link } from 'react-router-dom'

const Works = () => {
  return (
    <>
      <div className="flex flex-wrap gap-4 ">
        <Link to="" className="transition transform hover:scale-105  max-w-sm">
          <div className="flex rounded-lg hover:bg-sahelFlashDarkBlue h-full dark:bg-gray-800 bg-sahelFlashBlue p-8 flex-col">
            <div className="flex items-center mb-3">
              <h2 className="text-white dark:text-white font-bold text-xl">
                Réservation n°
              </h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <p className="text-white dark:text-gray-300">
                Type de travaux : Réparation de porte
              </p>
              <p className="text-white dark:text-gray-300">
                Date de la demande : 10 Septembre 2024{' '}
              </p>
              <p className="text-white dark:text-gray-300 mb-2">
                Intervention prévue : à définir{' '}
              </p>
              <hr className="border" />
              <p className="text-white dark:text-gray-300 mt-2">
                Adresse : 123 Rue Exemple, 75001 Paris{' '}
              </p>
              <p className="text-white dark:text-gray-300">
                Statut : En attente de validation{' '}
              </p>
            </div>
          </div>
        </Link>

        <Link to="" className="transition transform hover:scale-105  max-w-sm">
          <div className="flex rounded-lg hover:bg-sahelFlashDarkBlue h-full dark:bg-gray-800 bg-sahelFlashBlue p-8 flex-col">
            <div className="flex items-center mb-3">
              <h2 className="text-white dark:text-white text-lg font-medium">
                Réservation n°
              </h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <p className="text-white dark:text-gray-300">
                Type de travaux : Réparation de porte
              </p>
              <p className="text-white dark:text-gray-300">
                Date de la demande : 10 Septembre 2024{' '}
              </p>
              <p className="text-white dark:text-gray-300">
                Intervention prévue : à définir{' '}
              </p>
              <hr className="border" />
              <p className="text-white dark:text-gray-300">
                Adresse : 123 Rue Exemple, 75001 Paris{' '}
              </p>
              <p className="text-white dark:text-gray-300">
                Statut : En attente de validation{' '}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Works
