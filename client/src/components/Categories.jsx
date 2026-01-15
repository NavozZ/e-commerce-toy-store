import React from 'react';
import { Link } from 'react-router';
import { ToyBrick, Car, Dog } from 'lucide-react';

const Categories = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Categories
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        
        {/* Category 1: Blocks & Stacking */}
        <Link to="/search?category=Lego" className="group">
          <div className="bg-beige-100 rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="bg-white rounded-3xl overflow-hidden h-48 w-full flex items-center justify-center">
              <img 
                src="/path/to/blocks-image.jpg" // Replace with actual image path
                alt="Blocks & Stacking Toys"
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4 font-medium text-gray-700 flex items-center justify-center gap-2">
              <ToyBrick size={20} className="text-gray-500 group-hover:text-blue-600" />
              Blocks & Stacking
            </h3>
          </div>
        </Link>

        {/* Category 2: Vehicles */}
        <Link to="/search?category=Vehicles" className="group">
          <div className="bg-beige-100 rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="bg-white rounded-full overflow-hidden h-48 w-48 mx-auto flex items-center justify-center">
              <img 
                src="/path/to/vehicles-image.jpg" // Replace with actual image path
                alt="Wooden Vehicles"
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4 font-medium text-gray-700 flex items-center justify-center gap-2">
              <Car size={20} className="text-gray-500 group-hover:text-blue-600" />
              Vehicles
            </h3>
          </div>
        </Link>

        {/* Category 3: Animals */}
        <Link to="/search?category=Animals" className="group">
          <div className="bg-beige-100 rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="bg-white rounded-full overflow-hidden h-48 w-48 mx-auto flex items-center justify-center">
              <img 
                src="/path/to/animals-image.jpg" // Replace with actual image path
                alt="Dinosaur Toys"
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="mt-4 font-medium text-gray-700 flex items-center justify-center gap-2">
              <Dog size={20} className="text-gray-500 group-hover:text-blue-600" />
              Animals
            </h3>
          </div>
        </Link>

      </div>
    </section>
  );
};

export default Categories;