import React from 'react';

function Experience({experience}) {
  return (
    <div id="experience" className='sm:pl-[8rem] p-8 mx-7 mt-4 sm:mt-0 sm:pt-16 pb-20 sm:px-4 sm:py-0'>
      <div>
        <h1 className='w-72 mb-8 tracking-wider font-semibold text-2xl sm:text-2xl md:text-2xl lg:text-2.5xl'>
          Experience
        </h1>
      </div>

      {
        experience.map(e => (
        <div key={e.id} className='flex flex-col mt-10 items-center justify-center'>
        <div className='flex flex-col sm:flex-row gap-10 ml-4 w-full'>
          <div className='text-lg mb-2 ml-[-3px] mt-[0.1rem]'>
            <h1 className='flex-1 min-w-[120px] sm:min-w-[92px] font-medium'>{e.company}</h1>
            <h3 className='text-sm text-center my-1 dark:text-[#ccc]'>{e.duration}</h3>
          </div>
          <div className='flex relative mt-[5px] flex-col sm:ml-[-29px]  '>
            <p className="p-[1px] border-black dark:border-white rounded-50 bg-transparent ">
              <span className='m-1 bg-[#ec6e59] p-[7px] rounded-full'></span>
            </p>
            <div className='absolute top-[29px] bottom-[-26px] left-[12px] sm:top-[26px] border-dotted border-l-2 border-black dark:border-white '></div>
          </div>
          <div className='flex flex-col mt-1'>
            <h1 className='text-lg mb-2 font-semibold'>{e.title}</h1>
            <p className='sm:w-[80%] font-light text-custom-18 leading-loose text-sm sm:text-justify dark:text-[#ccc]'>
              {e.description}
            </p>
          </div>
        </div>
      </div>
       ))} 
    </div>
  );
}

export default Experience;
 