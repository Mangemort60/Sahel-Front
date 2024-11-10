import {
  MdSupervisorAccount,
  MdTrackChanges,
  MdVisibility,
} from 'react-icons/md'

import { FaChalkboardTeacher, FaMoneyBillWave } from 'react-icons/fa'

const HowCleaningWorks = () => {
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
        <h2>
          <span className="text-9xl text- text-secondaryDarkBlue font-bold">
            1
          </span>
          Devis
        </h2>
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

export default HowCleaningWorks
