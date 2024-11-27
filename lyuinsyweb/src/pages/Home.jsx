import BestSellerSection from "../sections/BestSellerSection";
import HolidayCollectionSection from "../sections/HolidayCollectionSection";
import IntroSection from "../sections/IntroSection";
import ReviewsSection from "../sections/ReviewsSection";
import CollectionsSection from "../sections/CollectionsSection";
import ScrollAnimation from "../components/ScrollAnimation";

const Home = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <ScrollAnimation>
        <IntroSection />
      </ScrollAnimation>

      {/* Best Sellers Section */}
        <BestSellerSection />

      {/* Customer Reviews Section */}
      <ScrollAnimation>
        <ReviewsSection />
      </ScrollAnimation>

      {/* Holiday Collection Grid */}
      <ScrollAnimation>
        <HolidayCollectionSection />
        </ScrollAnimation>

      {/* Collection Grid */}
      <ScrollAnimation>
        <CollectionsSection />
        </ScrollAnimation>
    </div>
  );
};

export default Home;