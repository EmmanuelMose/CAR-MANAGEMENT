import React from 'react';

const About: React.FC = () => {
  return (
    <main className="min-h-screen px-6 py-10 bg-gray-50 text-gray-800">
      
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          About Our Car Management System
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Your all-in-one platform to manage vehicles, customers, bookings, and maintenance efficiently.
        </p>
      </section>

      
      <section className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            We aim to simplify and streamline all aspects of vehicle management, whether you're running a car rental business, a repair shop, or a dealership. Our solution gives you real-time insights, automation tools, and a user-friendly interface to stay in control.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-base md:text-lg">
            <li>Customer and Vehicle Records Management</li>
            <li>Reservation and Booking System</li>
            <li>Maintenance & Insurance Tracking</li>
            <li>Payment Integration and Reporting</li>
          </ul>
        </div>
      </section>

      <section className="text-center mb-12">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose Us?</h3>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6 text-lg">
          Our system is built with modern technologies, focusing on security, scalability, and speed. It's tailored to meet the unique needs of businesses managing vehicle operations.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-500 text-black rounded hover:bg-green-600 transition">
            Learn More
          </button>
          <button className="px-6 py-2 bg-blue-500 text-black-600 rounded hover:bg-green-600 transition">
            Contact Us
          </button>
        </div>
      </section>

      
      <footer className="border-t pt-8 text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Car Management System. All rights reserved.
      </footer>
    </main>
  );
};

export default About;
