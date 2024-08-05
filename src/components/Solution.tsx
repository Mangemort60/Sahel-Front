import profiter from '../assets/profiter.jpg'
import clefs from '../assets/clefs.webp'
import simplicity from '../assets/simplicity.jpg'
import reaction from '../assets/rocket.webp'
import puzzle from '../assets/puzzle.webp'

const Solution = () => {
  return (
    <div className="max-w-2/3 sm:w-2/3  sm:mx-auto mb-20 mx-2">
      <div className="flex flex-col gap-4 items-start mt-20">
        <h1 className="text-3xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          Votre nettoyage en un clic :
          <br /> simple, flexible, efficace.
        </h1>
        <p className="text-secondaryLightBlue text-xl">
          Découvrez notre service de ménage conçu pour vous offrir une
          expérience de nettoyage sans tracas, que vous soyez présent ou absent
          de votre domicile.
        </p>
      </div>

      <div className="space-y-8">
        <div className="sm:flex gap-4 ">
          <div className="sm:w-1/2 ">
            <img src={clefs} alt="" />
          </div>
          <div className="sm:w-1/2 sm:p-16 sm:m-auto text-secondaryLightBlue">
            <p className="text-xl font-bold pb-4">Avant votre arrivée</p>
            <p>
              Notre équipe de nettoyage se charge de tout avant votre arrivée au
              Maroc. Vous pourrez nous transmettre vos clés facilement et en
              toute sécurité selon des méthodes qui vous conviendront. Retrouvez
              votre espace impeccable, propre et rangé dès votre arrivée.
            </p>
          </div>
        </div>
        <blockquote className="relative sm:left-24">
          <svg
            className="absolute -top-6 sm:-left-8 w-16 h-16 text-sahelLight"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
              fill="currentColor"
            ></path>
          </svg>

          <div className="relative">
            <p className="text-xl text-secondaryLightBlue md:text-4xl md:leading-normal dark:text-white my-20">
              <em>Un nettoyage parfait pour un séjour parfait au Maroc. </em>
            </p>
          </div>
        </blockquote>
        <div className="sm:flex gap-4 ">
          <div className="sm:w-1/2 sm:order-1">
            <img src={profiter} alt="" />
          </div>
          <div className="sm:w-1/2 sm:p-16 sm:m-auto text-secondaryLightBlue">
            <p className="text-xl font-bold pb-4">Après votre arrivée</p>
            <p>
              Ne perdez pas de temps et profitez pleinement de votre séjour
              pendant que nous nous occupons du nettoyage. Nos services sont
              flexibles et s'adaptent à vos besoins, vous offrant un
              environnement propre accueuillant. Notre équipe est discrète et
              efficace, garantissant que vous puissiez vous détendre sans
              interruption.
            </p>
          </div>
        </div>
      </div>
      <hr className="m-16" />
      <div className="flex flex-col space-y-12">
        <h2 className="text-4xl sm:text-6xl mr-auto text-secondaryDarkBlue font-extrabold">
          Les points fort du système Sahel
        </h2>
        <div className="h-auto p-2 sm:flex sm:justify-center m-auto sm:gap-8 space-y-8 sm:space-y-0">
          <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] w-1/3">
            <img src={simplicity} alt="" className="w-40" />
            <p className="text-2xl text-secondaryBlue">Simplicité</p>
            <p className="text-sm  text-secondaryLightBlue">
              Planifiez votre ménage à partir d’un système de réservation pensé
              pour être le plus simple et rapide possible.
            </p>
          </div>
          <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] w-1/3">
            <img src={reaction} alt="" className="w-40" />
            <p className="text-2xl text-secondaryBlue">Réactivité</p>
            <p className="text-sm  text-secondaryLightBlue">
              Suivez en temps réel l'avancement de votre prestation. Une
              messagerie dédiée est disponible pour chacune de vos prestations,
              vous permettant de poser vos questions et de recevoir des réponses
              rapides. Avec Sahel, vous restez informé à chaque étape.{' '}
            </p>
          </div>
          <div className="shadow-md rounded-sm flex flex-col items-center p-6  space-y-4 h-auto max-w-[300px] w-1/3">
            <img src={puzzle} alt="" className="w-40" />
            <p className="text-2xl text-secondaryBlue">Flexibilité</p>
            <p className="text-sm  text-secondaryLightBlue">
              Nous nous adaptons à vos contraintes en matière d’accès au
              logement et vous offrons la possibilité de réserver votre ménage
              du jour au lendemain
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Solution
