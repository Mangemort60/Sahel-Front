import {
  MdSupervisorAccount,
  MdTrackChanges,
  MdVisibility,
} from 'react-icons/md'

import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClipboardList,
  FaEnvelopeOpenText,
  FaHome,
  FaKey,
  FaMoneyBillWave,
} from 'react-icons/fa'
import Solution from '../components/Solution'

const HowCleaningWorks = () => {
  return (
    <div className="m-2">
      <div className="mx-auto my-12 space-y-12 max-w-[775px]">
        <h1 className="text-sahelRegular font-bold text-md ">Ménage</h1>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          Un service de Ménage Simple, Flexible et Efficace
        </h1>
        <p>
          Chez Sahel, nous vous offrons un service de ménage qui se distingue
          par son professionnalisme et son adaptabilité. Notre équipe
          expérimentée s'engage à respecter vos exigences avec une flexibilité
          totale, que vous soyez présent ou non. Nous accordons une importance
          primordiale à la sécurité et à la confiance, en garantissant une
          gestion rigoureuse de l'accès à votre domicile et en assurant la
          protection de vos biens. Tout au long de notre intervention, vous{' '}
          bénéficiez d’un suivi personnalisé et d’une communication
          transparente, pour que vous ayez l’esprit tranquille à chaque étape.
          Avec Sahel, vous pouvez être sûr que votre espace est entre de bonnes
          mains, vous offrant ainsi une sérénité totale.{' '}
        </p>
        <Solution />
        <div className="space-y-12 mb-12 bg-gradient-to-br from-[#dce2e8] to-white p-8">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            Votre réservation en 6 étapes
          </h1>

          {/* Étape 1 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaClipboardList className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Devis
              </h3>
              <p className="text-gray-600">
                Remplissez vos informations et obtenez votre devis en quelques
                secondes.
              </p>
            </div>
          </div>

          {/* Étape 2 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaCalendarAlt className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Réservation
              </h3>
              <p className="text-gray-600">
                Sélectionnez une date de ménage souhaité en fonction de vos
                disponibilités et contraintes.
              </p>
            </div>
          </div>

          {/* Étape 3 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaMoneyBillWave className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Paiement
              </h3>
              <p className="text-gray-600">
                Procédez au paiement par les moyens de votre choix.
              </p>
            </div>
          </div>

          {/* Étape 4 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaEnvelopeOpenText className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Instructions
              </h3>
              <p className="text-gray-600">
                Une fois la réservation confirmée, obtenez vos instructions par
                mail.
              </p>
            </div>
          </div>

          {/* Étape 5 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaKey className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-semibold text-secondaryLightBlue mb-2">
                    Option 1 : Je transmets mes clés
                  </h4>
                  <p className="text-gray-600">
                    Suivez les instructions de remise des clés. Nous vous
                    indiquerons le processus une fois vos clés reçues.
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-secondaryLightBlue mb-2">
                    Option 2 : Je suis présent
                  </h4>
                  <p className="text-gray-600">
                    Préparez votre domicile pour une visite sans remise des
                    clés.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Étape 6 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <div className="flex items-center text-secondaryDarkBlue md:mr-8">
              <FaHome className="text-[#183b56] text-6xl mr-4" />
            </div>
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Prestation terminée
              </h3>
              <p className="text-gray-600">
                Profitez d’un logement propre dès les premiers instants de votre
                arrivée.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            Respect Rigoureux de Notre Cahier des Charges{' '}
          </h1>
          <p>
            Chez Sahel, nous adhérons strictement à notre propre cahier des
            charges, conçu pour garantir des prestations de ménage de la plus
            haute qualité. Ce document définit avec précision les normes et les
            procédures que nous appliquons lors de chaque intervention, assurant
            ainsi un service uniforme et irréprochable. De l'utilisation de
            produits écologiques à la gestion sécurisée des accès, en passant
            par le respect des délais et la qualité du suivi client, chaque
            aspect de notre travail est encadré par des standards rigoureux. En
            respectant ce cahier des charges, nous vous assurons un service de
            ménage professionnel qui répond à vos attentes, tout en garantissant
            une sérénité totale.{' '}
          </p>
        </div>{' '}
      </div>
    </div>
  )
}

export default HowCleaningWorks
