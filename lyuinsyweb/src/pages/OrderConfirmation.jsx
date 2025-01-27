import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderData, totalPrice, formData } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Reset the upsell timer and active state when order is confirmed
    localStorage.setItem('upsellTimeRemaining', (5 * 60).toString());
    localStorage.setItem('upsellActive', 'true');
  }, []);

  if (!orderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-background">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-text mb-4">
            Съжаляваме, но няма налична информация за поръчката.
          </h2>
          <Link 
            to="/" 
            className="inline-block bg-discount text-white px-6 py-3 rounded-full hover:bg-red transition duration-300"
          >
            Към началната страница
          </Link>
        </div>
      </div>
    );
  }

  const { mainItem, orderedItems } = orderData;

  return (
    <div className="min-h-screen bg-accentbackground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message Section */}
        <div className="text-center mb-12">
          <div className="bg-main rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-text mb-4">
            Благодарим Ви за поръчката!
          </h1>
          <p className="text-xl text-text mb-2">
            Вашата поръчка е успешно приета.
          </p>
          <p className="text-lg text-text">
            Ще получите имейл с потвърждение на посочения от Вас адрес.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-text">
              Детайли на поръчката
            </h2>
          </div>

          {/* Customer Information */}
          <div className="p-6 border-b border-gray-200 bg-accentbackground">
            <h3 className="text-lg font-medium text-text mb-4">Информация за доставка</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-text">Име</p>
                <p className="font-medium text-text">{formData?.name}</p>
              </div>
              <div>
                <p className="text-sm text-text">Телефон</p>
                <p className="font-medium text-text">{formData?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-text">Имейл</p>
                <p className="font-medium text-text">{formData?.email}</p>
              </div>
              <div>
                <p className="text-sm text-text">Адрес за доставка</p>
                <p className="font-medium text-text">{formData?.address}</p>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-text mb-4">Поръчани продукти</h3>
            
            {/* Main Product */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <div className="flex items-center">
                <img
                  src={mainItem.image}
                  alt={mainItem.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-6">
                  <h4 className="text-lg font-medium text-text">{mainItem.name}</h4>
                  <p className="text-text mt-1">{mainItem.description}</p>
                  <p className="text-main font-medium mt-2">
                    {mainItem.actualPrice} лв.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Products */}
            {orderedItems.length > 0 && (
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-text">Допълнителни продукти</h4>
                {orderedItems.map((item) => (
                  <div key={item.$id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="ml-6">
                      <h5 className="text-base font-medium text-text">{item.name}</h5>
                      <p className="text-main font-medium mt-1">
                        {item.actualPrice} лв.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total Price */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center">
                <div className="text-text">Доставка</div>
                <div className="text-text">10.00 лв.</div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-text">Отстъпка</div>
                <div className="text-main">-5.00 лв.</div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <div className="text-lg font-medium text-text">Обща сума</div>
                <div className="text-xl font-bold text-main">
                  {totalPrice} лв.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-main rounded-xl p-6 mb-8">
          <h3 className="text-lg font-medium text-white mb-4">Следващи стъпки</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              Ще получите имейл с потвърждение на поръчката
            </li>
            <li className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              Ще Ви уведомим, когато поръчката бъде изпратена
            </li>
            <li className="flex items-center text-white">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              Очаквайте доставка в рамките на 2-3 работни дни
            </li>
          </ul>
        </div>

        {/* Return to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-buttonPrimary text-white px-8 py-3 rounded-full hover:bg-buttonHover transition duration-300 text-lg font-medium"
          >
            Обратно към началната страница
          </Link>
        </div>
      </div>
    </div>
  );
}

OrderConfirmation.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      orderData: PropTypes.shape({
        mainItem: PropTypes.shape({
          name: PropTypes.string.isRequired,
          image: PropTypes.string.isRequired,
          description: PropTypes.string,
          actualPrice: PropTypes.number.isRequired,
          $id: PropTypes.string.isRequired,
        }).isRequired,
        orderedItems: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            actualPrice: PropTypes.number.isRequired,
            $id: PropTypes.string.isRequired,
          })
        ).isRequired,
      }),
      totalPrice: PropTypes.number,
      formData: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
      }),
    }),
  }),
};
