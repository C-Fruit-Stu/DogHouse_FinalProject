import Aside from "../components/Aside"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Main from "../components/Main"
import Navigation from "../components/Navigation"



function Home() {
  return (
    <>
        <Navigation/>
        <Hero/>
        <Main/>
        <Aside/>
        <Footer/>
    </>
  )
}

export default Home