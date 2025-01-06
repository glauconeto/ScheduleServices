import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceCard = ({ image, title, description }) => (
  <div className="w-full max-w-sm m-2">
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="p-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  </div>
);

const HomePage = () => {
  const services = [
    {
      image: "/api/placeholder/350/200?text=Consultations",
      title: 'Comprehensive Consultations',
      description: 'Personalized medical assessments with our experienced healthcare professionals.'
    },
    {
      image: "/api/placeholder/350/200?text=Preventive+Care",
      title: 'Preventive Care',
      description: 'Proactive health screenings and wellness checks to keep you at your best.'
    },
    {
      image: "/api/placeholder/350/200?text=Scheduling",
      title: 'Flexible Scheduling',
      description: 'Convenient appointment times to fit your busy lifestyle.'
    },
    {
      image: "/api/placeholder/350/200?text=Specialized+Services",
      title: 'Specialized Services',
      description: 'Targeted treatments and specialized medical care for your unique health needs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Wellness Medical Center</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Committed to providing exceptional healthcare with compassion and expertise.
        </p>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Services</h2>
          <div className="flex flex-wrap justify-center">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                image={service.image}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </section>

        <section className="bg-white shadow-md rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Schedule Your Appointment</h3>
          <p className="mb-6 text-gray-700">
            Ready to take the first step towards better health? Book your appointment today.
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors">
            Book Now
          </button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <div>
          <p>© 2024 Wellness Medical Center. All Rights Reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-blue-300">Contact</a>
            <a href="#" className="hover:text-blue-300">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;