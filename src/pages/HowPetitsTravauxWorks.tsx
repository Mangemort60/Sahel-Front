import {
  FaClipboardList,
  FaCheckCircle,
  FaMoneyBillWave,
  FaKey,
  FaTools,
  FaHome,
  FaFileInvoice,
  FaHammer,
} from 'react-icons/fa'

const HowPetitsTravauxWorks = () => {
  return (
    <div className="m-2">
      <div className="mx-auto my-12 space-y-12 max-w-[775px]">
        <h1 className="text-sahelRegular font-bold text-md ">Petits-travaux</h1>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          Un service de petits travaux pensé pour faciliter l’entretien de votre
          logement hors période estivale
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Réservez facilement votre service de petits travaux, et laissez notre
          équipe évaluer vos besoins, organiser et coordonner toutes les étapes
          nécessaires à leur réalisation.
          <strong>
            Nous veillons à chaque détail, de l’évaluation initiale à la
            finalisation des travaux, pour vous garantir une gestion fluide et
            efficace.
          </strong>
        </p>
        <div className="bg-gray-50 p-6 rounded-md">
          <h3 className="text-2xl font-semibold text-secondaryDarkBlue mb-4">
            Votre espace personnel dédié
          </h3>
          <p className="text-gray-600 mb-4 text-lg">
            Un chat est disponible depuis votre espace personnel afin de
            structurer l’ensemble des échanges nécessaires :
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-lg">
            <li>Notre compréhension de vos travaux</li>
            <li>Votre suivi des travaux en cours</li>
            <li>La bonne conduite du projet</li>
          </ul>
        </div>
        <hr />
        <div className="space-y-12 mb-12 bg-gradient-to-t from-[#dce2e8] to-white p-8">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            Votre réservation en 8 étapes
          </h1>

          {/* Étape 1 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <FaClipboardList className="text-[#183b56] text-6xl mr-4 " />
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Pré-demande
              </h3>
              <p className="text-gray-600">
                Remplissez le formulaire dédié avec les informations nécessaires
                sur vos travaux.
              </p>
            </div>
          </div>

          {/* Étape 2 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <FaCheckCircle className="text-[#183b56] text-6xl mr-4" />

            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Validation de la pré-demande
              </h3>
              <p className="text-gray-600">
                Notre équipe examine votre pré-demande et vous contacte via
                l’espace dédié si nécessaire.
              </p>
            </div>
          </div>

          {/* Étape 3 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <FaMoneyBillWave className="text-[#183b56] text-6xl mr-4" />

            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Paiement des frais de service
              </h3>
              <p className="text-gray-600">
                Procédez au paiement des frais pour couvrir la logistique, y
                compris l’envoi des clés.
              </p>
            </div>
          </div>

          {/* Étape 4 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <FaKey className="text-[#183b56] text-6xl mr-4" />

            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Réception des clés
              </h3>
              <p className="text-gray-600">
                Nous réceptionnons vos clés et planifions une visite pour
                évaluer les travaux.
              </p>
            </div>
          </div>

          {/* Étape 5 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <FaTools className="text-[#183b56] text-6xl mr-4" />{' '}
            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Évaluation technique
              </h3>
              <p className="text-gray-600">
                Une visite technique est effectuée pour estimer la faisabilité
                et le coût des travaux.
              </p>
            </div>
          </div>

          {/* Étape 6 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <FaFileInvoice className="text-[#183b56] text-6xl mr-4" />

            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Devis personnalisé
              </h3>
              <p className="text-gray-600">
                Recevez un devis détaillé pour vos travaux, que vous pouvez
                approuver directement depuis l’espace client.
              </p>
            </div>
          </div>

          {/* Étape 7 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <FaHammer className="text-[#183b56] text-6xl mr-4" />

            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Réalisation des travaux
              </h3>
              <p className="text-gray-600">
                Une fois le devis approuvé et payé, les travaux commencent sous
                la supervision de notre équipe.
              </p>
            </div>
          </div>

          {/* Étape 8 */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            <FaHome className="text-[#183b56] text-6xl mr-4" />

            <div className="flex-1">
              <h3 className="text-4xl text-secondaryLightBlue font-semibold mb-2">
                Finalisation
              </h3>
              <p className="text-gray-600">
                Une fois les travaux terminés, nous vous retournons les clés
                avec un rapport final.
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            Respect Rigoureux de Notre Cahier des Charges{' '}
          </h1>
          <p className="text-lg">
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

export default HowPetitsTravauxWorks
