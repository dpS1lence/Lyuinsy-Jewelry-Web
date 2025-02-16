import BestSellerSection from "../sections/BestSellerSection";
import HolidayCollectionSection from "../sections/HolidayCollectionSection";
import IntroSection from "../sections/IntroSection";
import ReviewsSection from "../sections/ReviewsSection";
import CollectionsSection from "../sections/CollectionsSection";
import ScrollAnimation from "../components/ScrollAnimation";
import VideoSection from "../sections/VideoSection";
import VideoSection2 from "../sections/VideoSection2";
import VideoSection3 from "../sections/VideoSection3";
import AboutUsSection from "../sections/AboutUsSection";

const Home = () => {

  return (
    <div className="bg-white">
        <IntroSection />
        <BestSellerSection />
        <AboutUsSection />
        <HolidayCollectionSection />
        <VideoSection />
        <CollectionsSection />
        <VideoSection2 />
        <ReviewsSection />
    </div>
  );
};

export default Home;