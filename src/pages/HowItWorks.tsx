import arrowBlue from '../assets/arrowBlue.webp'
import devis from '../assets/form.svg'
import reservation from '../assets/calendar.svg'
import payment from '../assets/paymentCard.svg'
import instructions from '../assets/mail.svg'
import keys from '../assets/keys-svgrepo-com.svg'
import valid from '../assets/checkCircle.svg'
import calendarUser from '../assets/calendarUser.svg'
import arrow from '../assets/arrowRight.png'

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
        <div className="relative left-2 mx-auto col-start-1 row-start-6  sm:w-44 w-40 h-96 flex flex-col items-center  text-center shadow-md p-2 mt-12 sm:mt-20">
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
        <div className="mx-auto relative right-20 col-start-3 row-start-6 sm:w-44 w-40 h-96 flex flex-col items-center text-center shadow-md p-2 mt-12 sm:mt-20">
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
      </div>
      <div className="mx-auto my-12 space-y-5 max-w-[775px]">
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
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          Politique de prévention contre le vol{' '}
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          mollitia expedita eum dolorem eius accusamus id doloribus perferendis
          ipsum error nam magni aperiam labore impedit, neque iure, ducimus
          inventore dolor ab aliquam adipisci explicabo tenetur. Neque
          accusantium officia omnis ipsa minus pariatur numquam placeat, ullam
          saepe natus similique facere tempore.
        </p>
      </div>
    </div>
  )
}

export default HowItWorks
