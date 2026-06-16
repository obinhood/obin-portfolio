import { useLenis } from "@/lib/useLenis";
import Grain from "@/components/layout/Grain";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Beyond from "@/components/sections/Beyond";
import Contact from "@/components/sections/Contact";

export default function App() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <Grain />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
