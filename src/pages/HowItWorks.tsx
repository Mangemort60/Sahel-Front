import {
  MdSupervisorAccount,
  MdTrackChanges,
  MdVisibility,
} from 'react-icons/md'
import devis from '../assets/form.svg'
import reservation from '../assets/calendar.svg'
import payment from '../assets/paymentCard.svg'
import instructions from '../assets/mail.svg'
import keys from '../assets/keys-svgrepo-com.svg'
import valid from '../assets/checkCircle.svg'
import calendarUser from '../assets/calendarUser.svg'
import arrow from '../assets/arrowRight.png'
import { FaChalkboardTeacher, FaMoneyBillWave } from 'react-icons/fa'

const HowItWorks = () => {
  return (
    <div className="m-2">
      <div className="mx-auto my-12 space-y-5 max-w-[775px]">
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
          protection de vos biens. Tout au long de notre intervention, vous
          bénéficiez d’un suivi personnalisé et d’une communication
          transparente, pour que vous ayez l’esprit tranquille à chaque étape.
          Avec Sahel, vous pouvez être sûr que votre espace est entre de bonnes
          mains, vous offrant ainsi une sérénité totale.{' '}
        </p>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          Votre prestation en 6 étapes
        </h1>
      </div>
      <div className="grid grid-cols-3 grid-rows-6 gap-x-12 max-w-[775px] m-auto">
        <div className="relative right-10 space-y-8 my-auto col-start-2 row-start-1  w-52 h-3/4 flex flex-col items-center  text-center shadow-md p-2">
          <div className="bg-[#d28b6f] text-white rounded-sm w-full text-4xl font-bold">
            1
          </div>
          <div>
            <img src={devis} alt="Devis" className="w-16 m-auto my-6" />
            <span className="text-2xl font-bold">Devis</span>
            <div className="text-xs mt-4 text-start text-secondaryBlue">
              Remplissez vos informations et obtenez votre devis en quelques
              secondes.
            </div>
          </div>
          <div className="w-24">
            <img
              src={arrow}
              alt=""
              className="rotate-90 mt-28 sm:mt-36 w-full"
            />
          </div>
        </div>
        <div className="relative right-10 space-y-8 my-auto col-start-2 row-start-2  w-52 h-3/4 flex flex-col items-center  text-center shadow-md p-2">
          <div className="bg-[#d28b6f] text-white rounded-sm w-full text-4xl font-bold">
            2
          </div>
          <div>
            <img
              src={reservation}
              alt="Reservation"
              className="w-16 m-auto my-6"
            />
            <span className="text-2xl font-bold">Reservation</span>
            <div className="text-xs mt-4 text-start text-secondaryBlue">
              Sélectionnez une date de ménage souhaité en fonction de vos
              disponibilités et contraintes.
            </div>
          </div>
          <div className="w-24">
            <img
              src={arrow}
              alt=""
              className="rotate-90 mt-28 sm:mt-36 w-full"
            />
          </div>
        </div>
        <div className="relative right-10 space-y-8  my-auto col-start-2 row-start-3  w-52 h-3/4 flex flex-col items-center  text-center shadow-md p-2">
          <div className="bg-[#d28b6f] text-white rounded-sm w-full text-4xl font-bold">
            3
          </div>
          <div>
            <img src={payment} alt="Paiement" className="w-16 m-auto my-6" />
            <span className="text-2xl font-bold">Paiement</span>
            <div className="text-xs mt-4 text-start text-secondaryBlue">
              Procédez au paiement par les moyens de votre choix
            </div>
          </div>
          <div className="w-24">
            <img
              src={arrow}
              alt=""
              className="rotate-90 mt-28 sm:mt-36 w-full"
            />
          </div>
        </div>
        <div className="relative right-10 space-y-8  my-auto col-start-2 row-start-4  w-52 h-3/4 flex flex-col items-center  text-center shadow-md p-2">
          <div className="bg-[#d28b6f] text-white rounded-sm w-full text-4xl font-bold">
            4
          </div>
          <div>
            <img
              src={instructions}
              alt="Instructions"
              className="w-16 m-auto my-6"
            />
            <span className="text-2xl font-bold">Instructions</span>
            <div className="text-xs mt-4 text-start text-secondaryBlue">
              Une fois la réservation confirmée, obtenez vos instructions par
              mail.
            </div>
          </div>
        </div>
        <div className="relative left-2 mx-auto row-start-5 sm:w-44 w-40 h-auto flex flex-col items-center justify-between text-center sm:mt-12">
          <p className="mx-auto mt-auto row-start-4 col-start-1 italic text-secondaryBlue">
            Je serais absent lors de la prestation
          </p>
          <div className="w-24">
            <img src={arrow} alt="" className="rotate-90 w-full" />
          </div>
          <div className="shadow-md p-2 h-[392px]">
            <div className="bg-[#d28b6f] text-white rounded-sm w-full text-4xl font-bold">
              5
            </div>
            <div>
              <img
                src={keys}
                alt="Reception des clefs"
                className="w-16 m-auto my-6"
              />
              <span className="text-2xl font-bold">Reception des clefs</span>
              <div className="text-xs mt-4 text-start text-secondaryBlue">
                Suivez les instructions de remise des clés. Nous vous
                indiquerons le processus une fois vos clés reçues.
              </div>
            </div>
          </div>
        </div>

        <div className="relative sm:right-0 right-12 mx-auto col-start-2 row-start-6  sm:w-44 w-40 h-96 flex flex-col items-center  text-center shadow-md p-2 mt-12 sm:mt-20">
          <div className="bg-[#d28b6f] text-white rounded-sm w-full text-4xl font-bold">
            6
          </div>
          <div>
            <img
              src={valid}
              alt="Prestation terminée"
              className="w-16 m-auto my-6"
            />
            <span className="text-2xl font-bold">Prestation terminée</span>
            <div className="text-xs mt-4 text-start text-secondaryBlue">
              Profitez d’un logement propre dès les premiers instants de votre
              arrivée.
            </div>
          </div>
        </div>

        <div className="relative right-20 m-auto col-start-3 row-start-5 sm:w-44 w-40 h-auto flex flex-col items-center justify-between text-center sm:mt-12">
          <p className="mx-auto mt-auto row-start-4 col-start-3 italic text-secondaryBlue">
            Je serais présent lors de la prestation
          </p>
          <div className="w-24">
            <img src={arrow} alt="" className="rotate-90 w-full" />
          </div>
          <div className="shadow-md p-2 h-[392px]">
            <div className="bg-[#d28b6f] text-white rounded-sm w-full text-4xl font-bold">
              5
            </div>
            <div>
              <img
                src={calendarUser}
                alt="Je suis disponible"
                className="w-16 m-auto my-6"
              />
              <span className="text-2xl font-bold">Je suis disponible</span>
              <div className="text-xs mt-4 text-start text-secondaryBlue">
                Rendez-vous disponible à la date et l’horaire indiqué afin que
                nous puissions entamer la prestation.
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mx-auto relative right-20 col-start-3 row-start-6 sm:w-44 w-40 h-96 flex flex-col items-center text-center shadow-md p-2 mt-12 sm:mt-20">
          <div className="bg-[#d28b6f] text-white rounded-sm w-full text-4xl font-bold">
            6
          </div>
          <div>
            <img
              src={valid}
              alt="Prestation terminée"
              className="w-16 m-auto my-6"
            />
            <span className="text-2xl font-bold">Prestation terminée</span>
            <div className="text-xs mt-4 text-start text-secondaryBlue">
              Profitez d’un logement propre dès les premiers instants de votre
              arrivée.
            </div>
          </div>
        </div> */}
      </div>
      <div className="mx-auto space-y-8 max-w-[775px]">
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          Respect Rigoureux de Notre Cahier des Charges{' '}
        </h1>
        <p>
          Chez Sahel, nous adhérons strictement à notre propre cahier des
          charges, conçu pour garantir des prestations de ménage de la plus
          haute qualité. Ce document définit avec précision les normes et les
          procédures que nous appliquons lors de chaque intervention, assurant
          ainsi un service uniforme et irréprochable. De l'utilisation de
          produits écologiques à la gestion sécurisée des accès, en passant par
          le respect des délais et la qualité du suivi client, chaque aspect de
          notre travail est encadré par des standards rigoureux. En respectant
          ce cahier des charges, nous vous assurons un service de ménage
          professionnel qui répond à vos attentes, tout en garantissant une
          sérénité totale.{' '}
        </p>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold ">
          Prévention contre le vol : Votre tranquillité assurée lors de nos
          prestations{' '}
        </h1>
        <p>
          La sécurité de vos biens est notre priorité absolue. Pour garantir
          votre tranquillité d'esprit et prévenir tout risque de vol, nous avons
          mis en place une politique de prévention rigoureuse, structurée autour
          de cinq piliers fondamentaux. Au cœur de cette démarche se trouve
          l'Opérateur, véritable pierre angulaire de notre système de sécurité.
          <br />
          L'Opérateur est chargé de la gestion et de la supervision de chaque
          prestation, veillant personnellement à ce que chaque étape soit
          exécutée dans le respect des normes les plus strictes. Grâce à son
          rôle central, il assure la coordination des autres piliers –
          Formation, Rémunération, Traçabilité, et Vigilance – qui viennent
          renforcer notre engagement à protéger vos biens.
          <br /> Ensemble, ces piliers forment une approche globale et
          proactive, où chaque action est pensée pour minimiser les risques et
          garantir la sécurité de vos biens tout au long de notre intervention.{' '}
        </p>
        {/* Carte 4 - Opérateur */}
        <div className="flex flex-col space-y-4">
          {/* Carte Opérateur - Prend toute la largeur */}
          <div className="flex flex-col sm:h-60 items-center p-4 bg-gray-100 shadow-sm rounded-sm text-center  sm:justify-center">
            <MdSupervisorAccount className="w-12 h-12 mb-2 sm:mb-0 sm:mr-4" />
            <div>
              <h3 className="font-bold text-lg">Opérateur</h3>
              <p className="text-sm">
                L'opérateur de Sahel conserve les clés et s'assure du bon
                fonctionnement des opérations à chaque étape.
              </p>
            </div>
          </div>

          {/* Grille pour les autres cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {/* Carte Formation */}
            <div className="flex flex-col items-center p-4 bg-gray-100 shadow-sm rounded-sm text-center">
              <FaChalkboardTeacher className="w-12 h-12 mb-2" />
              <h3 className="font-bold text-lg">Formation</h3>
              <p className="text-sm">
                Nous formons notre personnel sur un socle de valeur et de bonnes
                pratiques dont la prévention contre le vol.
              </p>
            </div>

            {/* Carte Rémunération */}
            <div className="flex flex-col items-center p-4 bg-gray-100 shadow-sm rounded-sm text-center">
              <FaMoneyBillWave className="w-12 h-12 mb-2" />
              <h3 className="font-bold text-lg">Rémunération</h3>
              <p className="text-sm">
                Nous rémunérons notre personnel au-dessus du prix du marché.
              </p>
            </div>

            {/* Carte Traçabilité */}
            <div className="flex flex-col items-center p-4 bg-gray-100 shadow-sm rounded-sm text-center">
              <MdTrackChanges className="w-12 h-12 mb-2" />
              <h3 className="font-bold text-lg">Traçabilité</h3>
              <p className="text-sm">
                Chaque prestation est insérée dans notre système d'information
                nous permettant de suivre l'exécution.
              </p>
            </div>

            {/* Carte Vigilance */}
            <div className="flex flex-col items-center p-4 bg-gray-100 shadow-sm rounded-sm text-center">
              <MdVisibility className="w-12 h-12 mb-2" />
              <h3 className="font-bold text-lg">Vigilance</h3>
              <p className="text-sm">
                Nous vous invitons à la vigilance et à ne pas laisser des objets
                de valeur en évidence.
              </p>
            </div>
          </div>
        </div>{' '}
      </div>
    </div>
  )
}

export default HowItWorks
