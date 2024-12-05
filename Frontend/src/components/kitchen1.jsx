import React from 'react';
import Navbar from './Navbar'; // Ensure you have the Navbar component imported

function Kitchen1() {
  return (
    <>
    <Navbar/>
      <main className="font-poppins dark-text-white">
        {/* Hero Section */}
        <section className="bg-orange-500 text-white text-center py-20">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold">Mess Menu</h1>
            <p className="mt-4 text-lg md:text-xl">
              Mouth-watering South Indian meals just for you folks.
            </p>
          </div>
        </section>

        {/* Menu Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Menu</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">WEEK</th>
                    <th className="border border-gray-300 px-4 py-2">Breakfast</th>
                    <th className="border border-gray-300 px-4 py-2">Lunch</th>
                    <th className="border border-gray-300 px-4 py-2">Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">MONDAY</td>
                    <td className="border border-gray-300 px-4 py-2">Dosa / Upma</td>
                    <td className="border border-gray-300 px-4 py-2">South Veg thali / South Chicken thali</td>
                    <td className="border border-gray-300 px-4 py-2">Shrimp Curry &amp; Chapati/Roti & Rice</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">TUESDAY</td>
                    <td className="border border-gray-300 px-4 py-2">Dosa / Upma</td>
                    <td className="border border-gray-300 px-4 py-2">Curd Rice / Lemon Rice</td>
                    <td className="border border-gray-300 px-4 py-2">Pulav / curd rice</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">WEDNESDAY</td>
                    <td className="border border-gray-300 px-4 py-2">Vada / Medu Vada</td>
                    <td className="border border-gray-300 px-4 py-2">Rice-Rasam / Jeera Rice-Rasam</td>
                    <td className="border border-gray-300 px-4 py-2">Chicken Chettinad &amp; Chapati/Roti & Rice</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">THURSDAY</td>
                    <td className="border border-gray-300 px-4 py-2">Dosa / Upma</td>
                    <td className="border border-gray-300 px-4 py-2">Kuzhambu & Plain Rice / Aviyal & Plain Rice</td>
                    <td className="border border-gray-300 px-4 py-2">Tomato Chawal</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">FRIDAY</td>
                    <td className="border border-gray-300 px-4 py-2">Bisi Bele Bath / Appam</td>
                    <td className="border border-gray-300 px-4 py-2">Chicken Thali / Pulav</td>
                    <td className="border border-gray-300 px-4 py-2">Bhindi Masala &amp; Chapati/Roti & Rice & Sweet</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">SATURDAY</td>
                    <td className="border border-gray-300 px-4 py-2">Uppit / Masala Dosa</td>
                    <td className="border border-gray-300 px-4 py-2">Veg thali / Chicken thali</td>
                    <td className="border border-gray-300 px-4 py-2">Bhindi Masala &amp; Chapati/Roti & Rice & Sweet</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">SUNDAY</td>
                    <td className="border border-gray-300 px-4 py-2">Idli Sambar / Rava Idli/Rava Dosa</td>
                    <td className="border border-gray-300 px-4 py-2">Veg thali / Chicken thali</td>
                    <td className="border border-gray-300 px-4 py-2">Veg Biryani / Pulav & Sweet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Kitchen1;
