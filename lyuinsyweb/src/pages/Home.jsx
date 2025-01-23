import BestSellerSection from "../sections/BestSellerSection";
import HolidayCollectionSection from "../sections/HolidayCollectionSection";
import IntroSection from "../sections/IntroSection";
import ReviewsSection from "../sections/ReviewsSection";
import CollectionsSection from "../sections/CollectionsSection";
import ScrollAnimation from "../components/ScrollAnimation";
import VideoSection from "../sections/VideoSection";
import VideoSection2 from "../sections/VideoSection2";
import VideoSection3 from "../sections/VideoSection3";

const Home = () => {

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <ScrollAnimation>
        <IntroSection />
      </ScrollAnimation>

      {/* Best Sellers Section */}
        <BestSellerSection />

      {/* Holiday Collection Grid */}
      <ScrollAnimation>
        <HolidayCollectionSection />
        </ScrollAnimation>
        {/* Video Section */}
        <VideoSection />
        
      <ScrollAnimation>
        <CollectionsSection />
        </ScrollAnimation>
        <VideoSection2 />
{/* Customer Reviews Section */}
<ScrollAnimation>
        <ReviewsSection />
      </ScrollAnimation>
      {/* Collection Grid */}
    </div>
  );
};

export default Home;