import React from 'react';
import { baseURL } from '../Constants';

function Achievement({achievement}) {
    return (
    <div id="achievement" className=' sm:pl-[4rem] p-4 mx-7 mt-4 sm:mt-0 sm:pt-16 pb-20 sm:px-4 sm:py-0'>
      <div>
        <h1 className='w-72 mb-8 tracking-wider font-semibold text-2xl sm:text-2xl md:text-2xl lg:text-2.5xl'>
          Achievement
        </h1>
      </div>

      {!achievement || achievement.length === 0
      ? (<p>Achievements are currently unavailable. Please check back soon.</p>)
      : (<div className="space-y-12 max-w-4xl mx-auto">
        {achievement.map((e, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-lg p-6 sm:p-8"
            style={{
              borderLeft: "6px solid #2e8b57", // A subtle border to enhance visuals
            }}
          >
            {/* Image Section */}
            <div className="flex-shrink-0 w-full sm:w-1/2">
              <img
                src={`${baseURL}${e.image.image}`}
                alt={e.title}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>

            {/* Text Section */}
            <div className="flex-1 mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-4">{e.title}</h2>
              <p className="text-gray-700">{e.description}</p>
            </div>
          </div>
        ))}
      </div>)}
    </div>
  );
}

export default Achievement;