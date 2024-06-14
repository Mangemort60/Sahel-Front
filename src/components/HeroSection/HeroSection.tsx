import { Button } from '../common/Button'
import homeImage from '../../assets/homeImage.webp'

export const HeroSection = ({ formSectionRef }) => {
  const handleSubscribeClick = () => {
    // Faire défiler la page jusqu'au FormSection
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div
        className="h-screen flex items-center p-10 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div>
          <h1 className="sm:text-7xl text-5xl font-bold sm:w-2/3">
            VOS VACANCES COMMENCENT SUR LE SEUIL DE LA PORTE.
          </h1>
          <p className="sm:text-4xl mt-8 text-3xl sm:w-2/3">
            Profitez pleinement de votre séjour sans les tracas du quotidien
          </p>
          <Button
            label={'souscrire'}
            hoverColor={'hover:bg-darkerKaki'}
            bgColor={'bg-kaki'}
            onClick={handleSubscribeClick}
          />
        </div>
      </div>
    </>
  )
}
