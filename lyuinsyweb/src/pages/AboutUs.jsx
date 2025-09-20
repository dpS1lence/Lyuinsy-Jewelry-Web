import ScrollAnimation from "../components/ScrollAnimation";
import Jewelry1 from "../assets/images/woman.png";
import Jewelry2 from "../assets/images/logo.jpg";

const AboutUs = () => {
  return (
    <ScrollAnimation>
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 md:p-8">
        <div className="w-3/4">
        <h1 className="text-3xl md:text-4xl font-serif mb-4 text-text">За Нас</h1>
        <img src={Jewelry1} alt="Jewelry Showcase" className="h-64 object-cover rounded-lg mb-6" />
        <p className="text-base md:text-lg text-text mb-6">
          Добре дошли в нашия бижутерски свят, където изкуството и елегантността се срещат. Ние предлагаме уникални и ръчно изработени бижута, вдъхновени от природата и съвременния дизайн.
        </p>
        <ul className="list-disc list-inside mb-6 text-base md:text-lg text-text">
          <li>Уникални дизайни, вдъхновени от природата</li>
          <li>Ръчно изработени с внимание към детайла</li>
          <li>Произведения на изкуството, които разказват истории</li>
        </ul>
        <p className="text-base md:text-lg text-text mb-6">
          Всеки наш продукт е създаден с внимание към детайла и с любов, за да отразява индивидуалността на всеки, който го носи. Ние вярваме, че бижутата не са просто аксесоари, а израз на личен стил и идентичност.
        </p>
        <img src={Jewelry2} alt="Jewelry Crafting" className="h-64 object-cover rounded-lg mb-6" />
        <p className="text-base md:text-lg text-text mb-6">
          Присъединете се към нашата общност и открийте как нашите бижута могат да добавят блясък и елегантност към вашия живот. Ние сме тук, за да ви вдъхновим и да ви помогнем да намерите перфектното бижу, което да носите с гордост.
        </p>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default AboutUs;