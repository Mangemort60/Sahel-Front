import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ConfirmationPage = () => {
  const { t } = useTranslation('form')

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-4">
      <h1 className="text-2xl font-semibold text-green-600 mb-4">
        {t('confirmation.title') || 'Demande envoyée !'}
      </h1>
      <p className="text-gray-700 mb-6 max-w-md">
        {t('confirmation.message') ||
          'Merci pour votre demande. Nous vous contacterons très bientôt par email pour finaliser votre réservation.'}
      </p>

      <Link
        to="/"
        className="bg-secondaryRegularBlue text-white px-6 py-2 rounded hover:bg-secondaryLightBlue"
      >
        Retour à l’accueil
      </Link>
    </div>
  )
}

export default ConfirmationPage
