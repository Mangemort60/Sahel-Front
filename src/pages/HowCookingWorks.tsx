import { FaClock, FaMoon, FaUtensils } from 'react-icons/fa'
import Solution from '../components/Solution'

const HowCookingWorks = () => {
  return (
    <div className="m-2">
      <div className="mx-auto my-12 space-y-12 max-w-[775px]">
        <h1 className="text-sahelRegular font-bold text-md ">Cuisine</h1>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          Un service de Cuisine Simple, Flexible et Efficace
        </h1>
        <p className="text-lg">
          Profitez pleinement de vos vacances sans vous soucier des repas !
          Laissez notre cuisinière préparer un délicieux déjeuner pendant que
          vous explorez les ruelles ensoleillées du Maroc ou savourez un moment
          de détente en famille. Le soir, partez pour une balade estivale sous
          le ciel marocain, en sachant que votre dîner sera prêt à votre retour.
          Que ce soit pour alléger vos journées ou pour vivre des vacances
          sereines, notre service de cuisine s’adapte à vos besoins pour que
          chaque moment soit parfait. Le service cuisine de Sahel est
          spécialement conçu afin de vous offrir la possibilité de vous
          décharger de cette tâche quotidienne et profiter pleinement de vos
          vacances. À la demande, vous êtes en mesure de réserver une cuisinière
          expérimentée, capable de satisfaire vos envies de plats traditionnels
          ou communs. Une occasion spéciale ? Indiquez simplement le nombre de
          personnes présentes sur la plateforme et réservez une cuisinière pour
          la soirée. Envie de profiter pleinement de vos vacances sans vous
          soucier de l’organisation des repas ? Indiquez le nombre de personnes
          quotidiennes, sélectionnez les dates ainsi que la périodicité requise.
        </p>
        <div className="space-y-12 mb-12">
          <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
            Comment ça fonctionne ?
          </h1>
          <p className="text-lg">
            Pour répondre à vos besoins, nous vous proposons trois plages
            horaires flexibles : le midi pour un déjeuner savoureux, le soir
            pour un dîner agréable, et toute la journée pour une prise en charge
            complète de vos repas. Adaptez le service à votre emploi du temps et
            profitez pleinement de chaque instant de vos vacances.
          </p>
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#a5bda1] to-white p-6 rounded-sm flex items-center gap-x-3">
              <FaUtensils className="text-secondaryDarkBlue text-7xl" />
              <div>
                <h3 className="text-2xl font-bold text-secondaryDarkBlue mb-4">
                  Midi - Déjeuner
                </h3>
                <p className="text-gray-600 text-lg">
                  La cuisinière se rend disponible entre{' '}
                  <strong>11h et 14h</strong> afin de préparer votre déjeuner
                  selon vos envies.
                </p>
              </div>
            </div>
            {/* Soir - Dîner */}
            <div className="bg-gradient-to-br from-[#a59caf] to-white p-6 rounded-sm flex items-center gap-x-3">
              <FaMoon className="text-secondaryDarkBlue text-7xl" />
              <div>
                <h3 className="text-2xl font-bold text-secondaryDarkBlue mb-4">
                  Soir - Dîner
                </h3>
                <p className="text-gray-600 text-lg">
                  La cuisinière se rend disponible entre{' '}
                  <strong>18h et 21h</strong> pour préparer votre dîner, en
                  tenant compte de vos préférences culinaires.
                </p>
              </div>
            </div>
            {/* Journée Complète */}
            <div className="bg-gradient-to-br from-[#a5b5bd] to-white p-6 rounded-sm flex items-center gap-x-3">
              <FaClock className="text-secondaryDarkBlue text-7xl" />
              <div>
                <h3 className="text-2xl font-bold text-secondaryDarkBlue mb-4">
                  Journée Complète
                </h3>
                <p className="text-gray-600 text-lg">
                  Disponible dès <strong>9h</strong>, la cuisinière peut
                  préparer vos repas pour toute la journée : petit-déjeuner,
                  déjeuner, goûter et dîner, selon vos besoins.
                </p>
              </div>
            </div>{' '}
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

export default HowCookingWorks
