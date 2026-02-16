import OptimizedImage from "../components/OptimizedImage";
import JewelryWoman from "../assets/images/gradinetwomanbg/womanpinkbg.png";
import JewelryWomanMobile from "../assets/images/gradinetwomanbg/phonepinkwomanbg.png";
import { Link } from "react-router-dom";
import VideoSection from "./VideoSection3";

export default function IntroSection() {
  return (
    <section className="relative flex">
      {/* Image */}
      <div className="w-full relative">
        {/* <VideoSection /> */}
        {/* Desktop Image  */}
        <img
          src={JewelryWoman}
          alt="Колекция от елегантни бижута"
          className="hidden md:flex w-full h-[40rem] lg:w-full lg:h-[60rem] object-cover lg:object-cover lg:object-center"
          style={{ objectPosition: "right" }}
        />
        <img
          src={JewelryWomanMobile}
          alt="Колекция от елегантни бижута"
          className="w-full md:hidden h-[40rem] object-cover"
          style={{ objectPosition: "right" }}
        />
        {/* Content Overlay */}
        <div className="absolute bottom-10 lg:bottom-72 left-0 lg:w-1/2 bg-white bg-opacity-75 hover:bg-opacity-85 flex flex-col items-start p-4 lg:p-8 transition-opacity">
          <h1 className="text-4xl lg:text-5xl font-serif text-text mb-6 drop-shadow-lg">
            Открийте вашия перфектен аксесоар
          </h1>
          <p className="text-xl text-text mb-8 leading-relaxed">
            Открийте нашата колекция, където всяко бижу разказва уникална
            история и подчертава вашия стил.
          </p>
          <div className="space-y-4">
            <Link
              to="/collection/all"
              className="bg-black text-white border border-black px-8 py-4 font-medium w-full lg:w-auto hover:bg-white hover:text-black"
            >
              Покажи Колекцията
            </Link>
            <div className="text-text text-sm animate-pulse">
              Безплатно опаковане на подаръци | Доставка за следващия ден |
              Гаранция за празници
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
