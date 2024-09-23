import React from 'react';

function Publication({publication}) {
  return (
    <div id="publications" className='sm:pl-[8rem] p-8 mx-7 mt-4 sm:mt-0 sm:pt-16 pb-20 sm:px-4 sm:py-0'>
      <div>
        <h1 className='w-72 mb-8 tracking-wider font-semibold text-2xl sm:text-2xl md:text-2xl lg:text-2.5xl'>
          Publications
        </h1>
      </div>

      {
        publication.map(p => (
        <div key={p.id} className=' flex flex-col mt-10 items-center justify-center'>
        <div className="w-2/4 max-[670px]:w-3/4 flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-center mt-4">{p.title}</h2>
          <h3 className='text-sm text-center my-1 dark:text-[#ccc]'>{p.publishers}</h3>
          <a href={p.url} target="_blank" rel="noopener noreferrer" 
            className="mt-4 px-4 py-2 bg-[#ec6e59] text-white rounded-lg no-underline hover:no-underline">
            Read
          </a>
        </div>
        </div>
       ))} 
    </div>
  );
}

export default Publication;
 