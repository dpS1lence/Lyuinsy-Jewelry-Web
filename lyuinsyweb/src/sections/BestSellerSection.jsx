import Jewelry1 from "../assets/images/8.png";
import Jewelry2 from "../assets/images/6.png";
import Jewelry3 from "../assets/images/5.png";
import { useNavigate } from "react-router-dom";

export default function BestSellerSection() {
    const navigate = useNavigate();

    const handleReserveClick = () => {
        navigate({
            pathname: '/item-purchase-direct/' + 2
        });
    };

    return (
        <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-8">
          <div className="text-center relative">
            <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-5xl animate-bounce">🎄</span>
            <h2 className="text-5xl font-serif mb-6 text-gray-900">Holiday Bestsellers</h2>
            <p className="text-gray-600 text-xl">
              <span className="mr-2">✨</span>
              Create magical moments with our exquisite collection
              <span className="ml-2">✨</span>
            </p>
          </div>

            <div className="flex items-center justify-center mt-12 mb-12">
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent w-32"></div>
                <span className="mx-4 text-2xl">✧</span>
                <div className="h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent w-32"></div>
            </div>
          
          <div className="space-y-40">
            {/* Best Seller 1 */}
            <div className="relative">
              <span className="absolute -top-8 right-4 text-2xl">🎁</span>
              <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-3/5">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative">
                      <img src={Jewelry1} alt="Diamond Eternity Ring" className="w-full h-[600px] object-cover"/>
                      <div className="absolute top-6 right-6">
                        <span className="bg-emerald-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg">
                          ✧ HOLIDAY SPECIAL ✧
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/5">
                  <h2 className="text-4xl font-serif mb-8">The Perfect Holiday Gift</h2>
                  <div className="space-y-6 mb-12">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Our <span className="font-semibold text-gray-800">signature Diamond Eternity Ring</span> embodies the spirit of endless love. Each diamond is meticulously selected to create a <span className="font-semibold text-gray-800">perfect circle of brilliance</span>.
                    </p>
                    <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-8">
                      <li>Premium 18k white gold setting</li>
                      <li>15 round brilliant diamonds (2.5 carats total)</li>
                      <li>Lifetime warranty included</li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-light line-through text-gray-400">$2,499</span>
                        <span className="text-4xl font-bold text-emerald-700">$1,624</span>
                      </div>
                      <span className="text-emerald-700">★★★★★ (128)</span>
                    </div>
                    <div className="text-sm text-emerald-700 font-semibold">
                      🎁 Complimentary gift wrapping & next-day delivery
                    </div>
                    <button onClick={handleReserveClick} className="w-3/4 mx-auto block bg-emerald-700 text-white py-4 rounded-full hover:bg-emerald-800 transition">
                      Reserve Now for Christmas
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Seller 2 */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
                <div className="lg:w-3/5">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative">
                      <img src={Jewelry2} alt="Sapphire Pendant" className="w-full h-[600px] object-cover"/>
                      <div className="absolute top-6 right-6">
                        <span className="bg-emerald-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg">
                          ✧ HOLIDAY SPECIAL ✧
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/5">
                  <h2 className="text-4xl font-serif mb-8">A Touch of Winter Magic</h2>
                  <div className="space-y-6 mb-12">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Our <span className="font-semibold text-gray-800">Royal Sapphire Pendant</span> captures the essence of winter's beauty. The <span className="font-semibold text-gray-800">deep blue Ceylon sapphire</span> is perfectly complemented by brilliant-cut diamonds.
                    </p>
                    <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-8">
                      <li>Rare Ceylon sapphire centerpiece</li>
                      <li>Diamond halo setting</li>
                      <li>Platinum chain included</li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-light line-through text-gray-400">$1,899</span>
                        <span className="text-4xl font-bold text-emerald-700">$1,139</span>
                      </div>
                      <span className="text-emerald-700">★★★★★ (96)</span>
                    </div>
                    <div className="text-sm text-emerald-700 font-semibold">
                      ❄️ Order now for guaranteed Christmas delivery
                    </div>
                    <button onClick={handleReserveClick} className="w-3/4 mx-auto block bg-emerald-700 text-white py-4 rounded-full hover:bg-emerald-800 transition">
                      Reserve Now for Christmas
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Seller 3 */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-3/5">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="relative">
                      <img src={Jewelry3} alt="Pearl Bracelet" className="w-full h-[600px] object-cover"/>
                      <div className="absolute top-6 right-6">
                        <span className="bg-emerald-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg">
                          ✧ HOLIDAY SPECIAL ✧
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-2/5">
                  <h2 className="text-4xl font-serif mb-8">Winter's Finest Pearls</h2>
                  <div className="space-y-6 mb-12">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Our <span className="font-semibold text-gray-800">South Sea Pearl Bracelet</span> brings elegance to any holiday celebration. Each pearl is <span className="font-semibold text-gray-800">carefully selected</span> for its exceptional luster.
                    </p>
                    <ul className="text-gray-600 text-lg leading-relaxed list-disc pl-8">
                      <li>Premium South Sea pearls</li>
                      <li>18k yellow gold settings</li>
                      <li>Signature gift packaging</li>
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-light line-through text-gray-400">$1,599</span>
                        <span className="text-4xl font-bold text-emerald-700">$1,119</span>
                      </div>
                      <span className="text-emerald-700">★★★★½ (84)</span>
                    </div>
                    <div className="text-sm text-emerald-700 font-semibold">
                      🎄 Includes luxury holiday gift box
                    </div>
                    <button onClick={handleReserveClick} className="w-3/4 mx-auto block bg-emerald-700 text-white py-4 rounded-full hover:bg-emerald-800 transition">
                      Reserve Now for Christmas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
)};