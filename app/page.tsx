import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import VitrinAraclar from "@/components/VitrinAraclar";
import Hakkimizda from "@/components/Hakkimizda";
import Blog from "@/components/Blog";
import Iletisim from "@/components/Iletisim";
import Ekibimiz from "@/components/Ekibimiz";
import Yorumlar from "@/components/Yorumlar";
import Footer from "@/components/Footer";
import ScrollButtons from "@/components/ScrollButtons";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <SplashScreen />
      <Header />
      <Hero />
      <Marquee />
      <VitrinAraclar />
      <Hakkimizda />
      <Blog />
      <Ekibimiz />
      <Yorumlar />
      <Iletisim />
      <Footer />
      <ScrollButtons />
    </main>
  );
}
