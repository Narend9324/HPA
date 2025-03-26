import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeGridSection = () => {
  const history = useNavigate();

  const gridItems = [
    {
      title: 'Provider Training Videos',
      imageSrc: '/path/to/image1.jpg',
      link: '/training-videos',
    },
    {
      title: 'NDIS Provider Search',
      imageSrc: '/path/to/image2.jpg',
      link: '/provider-search',
    },
    {
      title: 'Workers Screening Check',
      imageSrc: '/path/to/image3.jpg',
      link: '/workers-screening',
    },
    {
      title: 'Exclusive News & Updates',
      imageSrc: '/path/to/image4.jpg',
      link: '/news-updates',
    },
    {
      title: 'NDIS Webinars',
      imageSrc: '/path/to/image5.jpg',
      link: '/webinars',
    },
    {
      title: 'Audit Process',
      imageSrc: '/path/to/image6.jpg',
      link: '/audit-process',
    },
    {
      title: 'Supporting Documents',
      imageSrc: '/path/to/image7.jpg',
      link: '/supporting-documents',
    },
    {
      title: 'How to Work as an Unregistered Provider',
      imageSrc: '/path/to/image8.jpg',
      link: '/unregistered-provider',
    },
    {
      title: 'Specialized Disability Support',
      imageSrc: '/path/to/image9.jpg',
      link: '/specialized-support',
    },
    {
      title: 'Frequently Asked Questions',
      imageSrc: '/path/to/image10.jpg',
      link: '/faq',
    },
  ];

  const handleNavigation = (link) => {
    history.push(link);
  };

  return (
    <section className="bg-white py-8 px-4 md:px-16">
      {/* Top Header Section */}
      <div className="text-center mb-8 bg-[#0C1F3D] p-10 flex flex-row justify-center items-center rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-50">
          Brought to you by Health Provider Assist
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Exclusively for our customers... your one-stop shop for everything NDIS.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gridItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-blue-900 text-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={item.imageSrc}
              alt={item.title}
              className="w-full h-40 object-cover opacity-70"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <button
                className="mt-2 px-4 py-2 bg-white text-blue-900 font-semibold rounded-md"
                onClick={() => handleNavigation(item.link)}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeGridSection;
