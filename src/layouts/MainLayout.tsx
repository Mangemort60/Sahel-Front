import Header from '../components/Header'
import Footer from '../components/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default MainLayout
