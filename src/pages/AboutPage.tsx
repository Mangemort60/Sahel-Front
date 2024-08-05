import valeur from '../assets/valeurs.webp'
import secure from '../assets/secure.png'
import quality from '../assets/quality.png'
import affordable from '../assets/affordable.png'
import ethical from '../assets/ethical.png'
import transparency from '../assets/transparency.png'
import handshake from '../assets/handshake.png'
import arrowRight from '../assets/arrowRight.png'
import lookingForward from '../assets/looking-forward.webp'

const AboutPage = () => {
  return (
    <div className="font-sans sm:w-2/3 mx-2 sm:m-auto max-w-[900px]">
      <div className="my-12 space-y-5">
        <h1 className="text-start text-sahelRegular font-bold text-md ">
          Qui sommes nous ?
        </h1>
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold m-0">
          Nos séjours au Maroc nous ont inspirés à rendre les vôtres
          exceptionnels
        </h1>
        {/* <div className="flex justify-center space-x-12 py-4">
          <div>
            <img
              className="rounded-full object-cover sm:w-52"
              src="https://picsum.photos/150/150"
              alt="Nessime"
            />
            <p className="text-center">nom-fonction</p>
          </div>
          <div>
            <img
              className="rounded-full object-cover sm:w-52"
              src="https://picsum.photos/150/150"
              alt="Hafid"
            />
            <p className="text-center">nom - fonction</p>
          </div>
        </div> */}
      </div>
      <div className="px-2 space-y-8">
        <p>
          Comme beaucoup, nous empruntons la voiture ou l'avion chaque année
          afin de rentrer dans notre pays le temps d'un été. Après plusieurs
          années, nous sommes partis d'un constat assez simple. Réaliser le
          premier nettoyage de notre logement, payer nos factures annuelles ou
          entreprendre des petits travaux après un voyage plus ou moins long est
          éreintant et n’est plus adapté à nos modes de vie.
        </p>
        <h2 className="text-4xl text-secondaryDarkBlue font-extrabold">
          Pourquoi Sahel ?
        </h2>
        <p>
          Notre idée ? Développer des services aux plus hauts standards
          internationaux : simple, efficace, fiable et abordables afin de
          profiter de notre séjour ! Dans l’objectif de concrétiser notre
          vision, nous mettons en place dès cette année le service de nettoyage
          avec pour ambition d'étoffer nos offres dans le futur
        </p>
        <blockquote className="relative top-2 mb-12">
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
              <em>
                Avec Sahel, les Marocains résidant à l'étranger bénéficient
                enfin d'un service simple et flexible pour optimiser leur séjour
                au Maroc.{' '}
              </em>
            </p>
          </div>
        </blockquote>
        <h2 className="text-4xl text-secondaryDarkBlue font-extrabold">
          Nos Projets futur
        </h2>
        <div className=" hidden sm:flex  max-w-[800px]">
          <img src={lookingForward} alt="" className="" />
        </div>
        <p className="mb-20">
          Nous avons l’ambition de développer nos activités autour de la même
          thématique de services à forte valeur ajoutée vous permettant de
          magnifier vos séjours au Maroc
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-center items-center space-y-8 sm:space-x-6 h-auto">
          <div className="flex items-center mt-8  h-60">
            <div className="ml-6 p-4 bg-white rounded shadow-lg w-64  h-full">
              <h3 className="font-semibold text-center text-2xl mb-2 ">2025</h3>
              <p className="text-gray-600 text-xl ">Service de nettoyage</p>
            </div>
          </div>
          <img src={arrowRight} alt="" className="sm:rotate-0 rotate-90" />
          <div className="flex items-center h-full">
            <div className="ml-6 p-4 bg-white rounded shadow-lg w-64 h-60">
              <h3 className="font-semibold mb-2 text-center text-2xl">
                A venir
              </h3>
              <p className="text-gray-600 text-xl">Service administratif</p>
              <p className="text-gray-600 text-xl">Service de petits travaux</p>
              <p className="text-gray-600 text-xl">Service de gardiennage</p>
            </div>
          </div>
        </div>
        <h2 className="text-4xl text-secondaryDarkBlue font-extrabold pt-8">
          Nos Valeurs
        </h2>
        <p className="mb-20">
          Au cœur de Sahel, nous établissons un socle de valeurs communes
          partagées par l’ensemble des membres. Nous souhaitons que chaque
          valeur s’incarne à travers nos intervention, garantissent votre
          satisfaction ainsi que les aspirations de notre personnel.
        </p>
        <div className=" hidden sm:flex">
          <img src={valeur} alt="" className="" />
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="grid sm:grid-cols-2 sm:grid-rows-3 grid-cols-1 grid-rows-6 gap-4">
            <div className="w-auto">
              <img src={secure} alt="" className="w-12 h-12 mb-2" />
              <p className="text-secondaryDarkBlue text-xl font-bold">
                Discrétion
              </p>
              <ul className="list-disc list-inside">
                <li>Interventions discrètes même en votre présence</li>
                <li>Respect de votre intimité et de votre espace</li>
                <li>Travail efficace sans perturber votre quotidien</li>
              </ul>
            </div>
            <div>
              <img src={quality} alt="" className="w-12 h-12 mb-2" />
              <p className="text-secondaryDarkBlue text-xl font-bold">
                Qualité
              </p>
              <ul className="list-disc list-inside">
                <li>Formation continue de notre personnel</li>
                <li>Rémunération juste et équitable</li>
                <li>Suivi rigoureux des prestations</li>
                <li>Respect strict du cahier des charges</li>
              </ul>
            </div>
            <div>
              <img src={transparency} alt="" className="w-12 h-12 mb-2" />
              <p className="text-secondaryDarkBlue text-xl font-bold">
                Fiabilité & transparence
              </p>
              <ul className="list-disc list-inside">
                <li>Transparence totale depuis votre espace client</li>
                <li>Chat interactif pour une communication en temps réel</li>
                <li>Suivi des opérations en toute simplicité</li>
              </ul>
            </div>
            <div>
              <img src={ethical} alt="" className="w-12 h-12 mb-2" />
              <p className="text-secondaryDarkBlue text-xl font-bold">
                Engagement social
              </p>
              <ul className="list-disc list-inside">
                <li>Rémunération au-dessus des standards du marché</li>
                <li>Conditions de travail respectueuses et saines</li>
                <li>Opportunités de mobilité interne pour nos employés</li>
              </ul>
            </div>
            <div>
              <img src={affordable} alt="" className="w-12 h-12 mb-2" />
              <p className="text-secondaryDarkBlue text-xl font-bold">
                Abordable
              </p>
              <ul className="list-disc list-inside">
                <li>Tarification accessible et adaptée à votre situation</li>
                <li>Maintien d'un service de qualité pour tous les budgets</li>
              </ul>
            </div>
            <div>
              <img src={handshake} alt="" className="w-12 h-12 mb-2" />
              <p className="text-secondaryDarkBlue text-xl font-bold">
                Confiance
              </p>
              <ul className="list-disc list-inside">
                <li>Dispositions pour assurer la qualité du service</li>
                <li>
                  Supervision par un opérateur Sahel pour le respect des
                  processus
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
