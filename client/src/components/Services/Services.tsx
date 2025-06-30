//import React from "react";

const Services = () => {
  const services = [
    {
      title: "Car Diagnostics",
      description: "Quick and accurate diagnostics to identify vehicle issues using the latest technology."
    },
    {
      title: "Routine Maintenance",
      description: "Oil changes, brake checks, fluid refills, and all essential vehicle maintenance services."
    },
    {
      title: "Repair Services",
      description: "From engine problems to bodywork — professional repairs to keep your car running smoothly."
    },
    {
      title: "Insurance & Documentation",
      description: "Assistance with car insurance registration and renewal, as well as vehicle documentation."
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Our Services</h2>
        <div className="space-y-6">
          {services.map((service, index) => (
            <div key={index} className="border border-blue-100 rounded-lg p-4 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-blue-600">{service.title}</h3>
              <p className="text-gray-700 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
