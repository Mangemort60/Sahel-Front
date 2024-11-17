import React from 'react'
import { FaChalkboardTeacher, FaMoneyBillWave } from 'react-icons/fa'
import {
  MdSupervisorAccount,
  MdTrackChanges,
  MdVisibility,
} from 'react-icons/md'

export const TheftPrevention = () => {
  return (
    <div className="w-2/3 m-auto mt-12 max-w-[920px]">
      <div>
        {' '}
        <h1 className="text-4xl sm:text-6xl text-secondaryDarkBlue font-extrabold mb-4 ">
          Prévention contre le vol : Votre tranquillité assurée lors de nos
          prestations{' '}
        </h1>
        <p className="my-6">
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
      </div>
      <div className="flex flex-col space-y-4">
        {/* Carte Opérateur - Prend toute la largeur */}
        <div className="flex flex-col sm:h-60 items-center p-4   bg-[#ece2d6a8] shadow-sm rounded-md text-center  sm:justify-center">
          <MdSupervisorAccount
            className="w-14 h-14 mb-2 sm:mb-0 sm:mr-4"
            color="#183b56"
          />
          <div>
            <h3 className="font-bold text-3xl text-[#183b56]">Opérateur</h3>
            <p className="text-lg text-left mt-2">
              L 'opérateur de Sahel conserve les clés et s'assure du bon
              fonctionnement des opérations à chaque étape.
            </p>
          </div>
        </div>

        {/* Grille pour les autres cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Carte Formation */}
          <div className="flex flex-col items-center p-4 bg-[#e4e0c5a8] shadow-sm rounded-md text-center">
            <FaChalkboardTeacher className="w-14 h-14 mb-2" color="#183b56" />
            <h3 className="font-bold text-3xl text-[#183b56]">Formation</h3>
            <p className="text-lg text-left mt-2">
              Nous formons notre personnel sur un socle de valeur et de bonnes
              pratiques dont la prévention contre le vol.
            </p>
          </div>
          {/* Carte Rémunération */}
          <div className="flex flex-col items-center p-4 bg-[#d4dfeca8] shadow-sm rounded-md text-center">
            <FaMoneyBillWave className="w-14 h-14 mb-2" color="#183b56" />
            <h3 className="font-bold text-3xl text-[#183b56]">Rémunération</h3>
            <p className="text-lg text-left mt-2">
              Nous rémunérons notre personnel au-dessus du prix du marché.
            </p>
          </div>
          {/* Carte Traçabilité */}
          <div className="flex flex-col items-center p-4 bg-[#c9b9c1a8] shadow-sm rounded-md text-center">
            <MdTrackChanges className="w-14 h-14 mb-2" color="#183b56" />
            <h3 className="font-bold text-3xl text-[#183b56]">Traçabilité</h3>
            <p className="text-lg text-left mt-2">
              Chaque prestation est insérée dans notre système d'information
              nous permettant de suivre l'exécution.
            </p>
          </div>
          {/* Carte Vigilance */}
          <div className="flex flex-col items-center p-4 bg-[#cedbcfa8] shadow-sm rounded-md text-center">
            <MdVisibility className="w-14 h-14 mb-2" color="#183b56" />
            <h3 className="font-bold text-3xl text-[#183b56]">Vigilance</h3>
            <p className="text-lg text-left mt-2">
              Nous vous invitons à la vigilance et à ne pas laisser des objets
              de valeur en évidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
