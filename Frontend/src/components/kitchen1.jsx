import React from 'react';

function Kitchen1() {
  return (
    <main className="font-poppins bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 to-amber-600 text-white pt-24 pb-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-down">
              Your Weekly Calendar :)            </h1>
            <p className="text-xl md:text-2xl text-orange-100 font-medium mb-8">
              Experience authentic Indian flavors with our weekly rotation
            </p>
            <div className="absolute bottom-0 left-0 right-0">
              <svg 
                className="w-full text-white dark:text-gray-900" 
                viewBox="0 0 1440 120"
              >
                <path 
                  fill="currentColor" 
                  d="M0 64L80 58.7C160 53 320 43 480 48C640 53 800 75 960 74.7C1120 75 1280 53 1360 42.7L1440 32V120H1360C1280 120 1120 120 960 120C800 120 640 120 480 120C320 120 160 120 80 120H0Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="relative -mt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
                Weekly Menu
                <span className="ml-3 text-orange-500 text-lg font-medium bg-orange-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  Weekly Rotation
                </span>
              </h2>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"/>
                </svg>
                <span>All items served with complementary sides</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700">
              <table className="w-full">
                <thead className="bg-orange-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-5 text-left text-orange-600 dark:text-orange-400 font-semibold uppercase text-sm">
                      Day
                    </th>
                    <th className="px-6 py-5 text-left text-orange-600 dark:text-orange-400 font-semibold uppercase text-sm">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                        </svg>
                        Breakfast
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-orange-600 dark:text-orange-400 font-semibold uppercase text-sm">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                        </svg>
                        Lunch
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left text-orange-600 dark:text-orange-400 font-semibold uppercase text-sm">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"/>
                        </svg>
                        Dinner
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    ['MONDAY', 'Dosa / Upma', 'South Veg thali / South Chicken thali', 'Shrimp Curry & Chapati/Roti & Rice'],
                    ['TUESDAY', 'Dosa / Upma', 'Curd Rice / Lemon Rice', 'Pulav / curd rice'],
                    ['WEDNESDAY', 'Vada / Medu Vada', 'Rice-Rasam / Jeera Rice-Rasam', 'Chicken Chettinad & Chapati/Roti & Rice'],
                    ['THURSDAY', 'Dosa / Upma', 'Kuzhambu & Plain Rice / Aviyal & Plain Rice', 'Tomato Chawal'],
                    ['FRIDAY', 'Bisi Bele Bath / Appam', 'Chicken Thali / Pulav', 'Bhindi Masala & Chapati/Roti & Rice & Sweet'],
                    ['SATURDAY', 'Uppit / Masala Dosa', 'Veg thali / Chicken thali', 'Bhindi Masala & Chapati/Roti & Rice & Sweet'],
                    ['SUNDAY', 'Idli Sambar / Rava Idli/Rava Dosa', 'Veg thali / Chicken thali', 'Veg Biryani / Pulav & Sweet']
                  ].map(([day, breakfast, lunch, dinner], index) => (
                    <tr 
                      key={day}
                      className="hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {day}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {breakfast}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {lunch}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {dinner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>Menu items may vary based on seasonal availability</p>
              <p className="mt-1">Special dietary requests available upon prior notice</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Kitchen1;