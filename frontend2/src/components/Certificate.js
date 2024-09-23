import React from 'react';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";

const Certificate = ({ certificate=[]}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
    responsive: [
      {
        breakpoint: 1024,  // large screens
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,  // medium screens
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,  // small screens
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (!certificate  || certificate.length === 0) {
    return <p>No certificates to display</p>;
  }

  return (
    <div id="certificates" className='sm:pl-[8rem] p-8 mx-7 mt-4 sm:mt-0 sm:pt-16 pb-20 sm:px-4 sm:py-0'>
        <div>
        <h1 className='w-72 mb-8 tracking-wider font-semibold text-2xl sm:text-2xl md:text-2xl lg:text-2.5xl'>
          Certificates
        </h1>
      </div>
    <Slider {...settings} className="w-full">
      {certificate.map(c => (
        <div key={c.id} className="flex flex-col items-center w-[400px] h-[400px] p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex justify-center items-center">
          <img src={c.image} alt={c.title} className="w-[300px] h-[200px] object-cover rounded-lg"/>
          </div>
          <h2 className="text-xl text-center font-semibold mt-4">{c.title}</h2>
          <h3 className='text-sm text-center my-1 dark:text-[#ccc]'>{c.issuer}</h3>
          <div className='w-full flex justify-center'>
          <a href={c.url} target="_blank" rel="noopener noreferrer" 
            className="mt-4 px-4 py-2 bg-[#ec6e59] text-white rounded-lg no-underline hover:no-underline">
            Verify
          </a>
          </div>
        </div>
      ))}
    </Slider>
    </div>
  );
};

export default Certificate;
