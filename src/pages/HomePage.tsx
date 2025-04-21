import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const { state } = useShop();
  
  // Filter featured products - use top rated products
  const featuredProducts = [...state.products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4);
  
  // Get unique categories
  const categories = [...new Set(state.products.map(p => p.category))];
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Discover the Latest in <span className="text-purple-500">Fashion & Tech</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Shop the season's most exclusive items at amazing prices. Quality products, fast delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md transition-colors font-medium"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="bg-transparent hover:bg-gray-800 text-white border border-gray-600 py-3 px-6 rounded-md transition-colors font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg"
              alt="Fashion collection"
              className="max-w-full h-auto rounded-lg shadow-2xl"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our curated collections of the finest products across multiple categories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group"
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="p-8 text-center">
                    <h3 className="text-xl font-semibold mb-2 capitalize">
                      {category}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Explore our {category} collection
                    </p>
                    <span className="inline-block text-purple-500 group-hover:text-purple-400 transition-colors">
                      Shop Now <ArrowRight size={16} className="inline ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-gray-400 mt-2">
                Our most popular products based on sales and ratings
              </p>
            </div>
            
            <Link
              to="/products"
              className="text-purple-500 hover:text-purple-400 flex items-center transition-colors"
            >
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Don't just take our word for it. See what our customers have to say about their shopping experience with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Cristiano Ronaldo",
                text: "I love shopping here! The quality is top-notch and the prices are unbeatable. Highly recommend!",
                rating: 5
              },
              {
                name: "Michelee Obama",
                text: "The customer service is fantastic! They helped me find exactly what I was looking for.",
                rating: 4                
              },
              {
                name: " Elon Musk",
                text: "Great selection of products at competitive prices. The new arrivals are always on trend.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                      className={i < testimonial.rating ? "" : "text-gray-600"}
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">{testimonial.text}</p>
                <p className="font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to get exclusive offers, early access to new products, and style tips from our team.
          </p>
          
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow py-3 px-4 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-r-md transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;