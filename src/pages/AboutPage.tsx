import React from 'react';
import { ShieldCheck, Truck, Clock, Award, Users, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-indigo-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">About AdiShop</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            This end-term project by Aditeey Singh is driven by a mission to demonstrate how high-quality design and seamless functionality can make online shopping intuitive, engaging, and enjoyable for users.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"
                alt="Our team"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-400 mb-4">
                Created by Aditeey Singh in 2025, this project was developed as part of an end-term submission, aimed at showcasing skills in modern web development and user experience design.
              </p>
              <p className="text-gray-400 mb-4">
                What began as a conceptual exercise quickly evolved into a full-fledged online shopping experience prototype. The focus was on clean design, intuitive navigation, and responsive performance across devices.
              </p>
              <p className="text-gray-400">
                This site features a curated layout that simulates a real-world e-commerce platform, demonstrating how thoughtful design and structured components can enhance user interaction and satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These core principles guide everything we do and define how we serve our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck size={40} className="text-purple-500" />,
                title: "Quality & Trust",
                description: "We stand behind every product we sell and prioritize building long-term trust with our customers."
              },
              {
                icon: <Users size={40} className="text-purple-500" />,
                title: "Customer Focus",
                description: "Every decision we make starts with considering our customers' needs and experiences."
              },
              {
                icon: <Award size={40} className="text-purple-500" />,
                title: "Excellence",
                description: "We're committed to continuous improvement and exceeding expectations in everything we do."
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-8 text-center shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose AdiShop</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We strive to deliver the best shopping experience possible. Here's what sets us apart.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck size={24} className="text-purple-500" />,
                title: "Fast Shipping",
                description: "Free shipping on orders over $50, with quick delivery options available."
              },
              {
                icon: <ShieldCheck size={24} className="text-purple-500" />,
                title: "Secure Payments",
                description: "Your payment information is always protected with industry-standard encryption."
              },
              {
                icon: <Clock size={24} className="text-purple-500" />,
                title: "Easy Returns",
                description: "30-day hassle-free return policy on all purchases."
              },
              {
                icon: <Award size={24} className="text-purple-500" />,
                title: "Quality Guarantee",
                description: "Every product is quality-checked and backed by our satisfaction guarantee."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-800 bg-opacity-50 mb-6">
            <Mail size={28} className="text-white" />
          </div>
          
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Have questions, feedback, or need assistance? Our customer service team is here to help.
          </p>
          
          <a
            href="mailto:support@adishop.com"
            className="bg-white text-purple-900 hover:bg-gray-100 py-3 px-8 rounded-md transition-colors font-medium inline-block shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;