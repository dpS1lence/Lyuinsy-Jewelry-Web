import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function OrderConfirmation() {
  const location = useLocation();
  const { orderData, totalPrice, formData } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!orderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-5 bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Съжаляваме, но няма налична информация за поръчката.
          </h2>
          <Link 
            to="/" 
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition duration-300"
          >
            Към началната страница
          </Link>
        </div>
      </div>
    );
  }

  const { mainItem, orderedItems } = orderData;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message Section */}
        <div className="text-center mb-12">
          <div className="bg-emerald-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Благодарим Ви за поръчката!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Вашата поръчка е успешно приета.
          </p>
          <p className="text-lg text-gray-500">
            Ще получите имейл с потвърждение на посочения от Вас адрес.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Детайли на поръчката
            </h2>
          </div>

          {/* Customer Information */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Информация за доставка</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Име</p>
                <p className="font-medium text-gray-900">{formData?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Телефон</p>
                <p className="font-medium text-gray-900">{formData?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Имейл</p>
                <p className="font-medium text-gray-900">{formData?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Адрес за доставка</p>
                <p className="font-medium text-gray-900">{formData?.address}</p>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Поръчани продукти</h3>
            
            {/* Main Product */}
            <div className="mb-6 border-b border-gray-200 pb-6">
              <div className="flex items-center">
                <img
                  src={mainItem.image}
                  alt={mainItem.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-6">
                  <h4 className="text-lg font-medium text-gray-900">{mainItem.name}</h4>
                  <p className="text-gray-500 mt-1">{mainItem.description}</p>
                  <p className="text-emerald-600 font-medium mt-2">
                    {mainItem.actualPrice.toFixed(2)} лв.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Products */}
            {orderedItems.length > 0 && (
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-gray-900">Допълнителни продукти</h4>
                {orderedItems.map((item) => (
                  <div key={item.$id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="ml-6">
                      <h5 className="text-base font-medium text-gray-900">{item.name}</h5>
                      <p className="text-emerald-600 font-medium mt-1">
                        {item.actualPrice.toFixed(2)} лв.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Total Price */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center">
                <div className="text-gray-500">Доставка</div>
                <div className="text-gray-900">10.00 лв.</div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-gray-500">Отстъпка</div>
                <div className="text-emerald-600">-5.00 лв.</div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <div className="text-lg font-medium text-gray-900">Обща сума</div>
                <div className="text-xl font-bold text-emerald-600">
                  {totalPrice.toFixed(2)} лв.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-emerald-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-medium text-emerald-800 mb-4">Следващи стъпки</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-emerald-700">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              Ще получите имейл с потвърждение на поръчката
            </li>
            <li className="flex items-center text-emerald-700">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
              Ще Ви уведомим, когато поръчката бъде изпратена
            </li>
            <li className="flex items-center text-emerald-700">
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
            className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-full hover:bg-emerald-700 transition duration-300 text-lg font-medium"
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
