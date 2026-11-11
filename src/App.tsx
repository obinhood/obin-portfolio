import { useLenis } from "@/lib/useLenis";
import Grain from "@/components/layout/Grain";
import CustomCursor from "@/components/layout/CustomCursor";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import Statement from "@/components/sections/Statement";
import Work from "@/components/sections/Work";
import Experience from "@/components/sections/Experience";
import Toolkit from "@/components/sections/Toolkit";
import Beyond from "@/components/sections/Beyond";
import Contact from "@/components/sections/Contact";

export default function App() {
  useLenis();

  return (
    <>
      <a
        href="#work"
        className="label fixed left-4 top-4 z-[10002] -translate-y-24 rounded-full bg-ink px-4 py-2 text-paper focus:translate-y-0"
      >
        Skip to work
      </a>
      <Grain />
      <CustomCursor />
      <Nav ready />
      <main>
        <Hero ready />
        <Statement />
        <Work />
        <Experience />
        <Toolkit />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
