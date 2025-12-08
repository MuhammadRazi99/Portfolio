import React from 'react';

function Education({education}) {
    return (
    <div id="education" className=' sm:pl-[4rem] p-4 mx-7 mt-4 sm:mt-0 sm:pt-16 pb-20 sm:px-4 sm:py-0'>
      <div>
        <h1 className='w-72 mb-8 tracking-wider font-semibold text-2xl sm:text-2xl md:text-2xl lg:text-2.5xl'>
          Education
        </h1>
      </div>
      {
      (!education || education.length === 0)
      ? (<p>Education is currently unavailable. Please check back soon.</p>)
      :(education.map(e => (
        <div key={e.id}  className='flex flex-col mt-10 items-center justify-center'>
        <div className='flex flex-col sm:flex-row gap-10 ml-4 w-full'>
          {/* Left Section - Degree Name and Years */}
          <div className="text-lg sm:text-right sm:w-[20%]">
              <h1 className="font-medium">{e.degree}</h1>
              <h3 className="text-sm text-gray-500 my-1 dark:text-[#ccc]">
                {e.years}
              </h3>
            </div>
            {/* Middle Section - Timeline Dot and Line */}
          <div className="hidden sm:flex relative">
              <div className="absolute top-0 bottom-0 left-[12px] border-l-2 border-dotted border-gray-400 dark:border-gray-600"></div>
              <div className="relative z-10 bg-[#2e8b57] p-2 rounded-full"></div>
            </div>
            
          <div className='flex flex-col mt-1'>
            <h1 className='text-lg mb-2 font-semibold'>{e.school}</h1>
            <p className="mt-2 text-custom-18 leading-relaxed text-sm dark:text-[#ccc]">
              CGPA: {e.cgpa}
            </p>
          </div>
        </div>
      </div>
      )))} 
    </div>
  );
}

export default Education;
 