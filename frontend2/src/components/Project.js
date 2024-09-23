import React,{useState} from 'react';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";

function Projects({project=[]}) {
  
  const [expanded, setExpanded] = useState(new Array(project.length).fill(false));
  const [autoScroll, setAutoScroll] = useState(true);
  
  const toggleReadMore = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setAutoScroll(!expanded[id]);
  };
  
  const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: autoScroll,
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
    
      if (!project  || project.length === 0) {
        return <p>No projects to display</p>;
      }
    
      return (
        <div id="projects" className='sm:pl-[8rem] p-8 mx-7 mt-4 sm:mt-0 sm:pt-16 pb-20 sm:px-4 sm:py-0'>
            <div>
            <h1 className='w-72 mb-8 tracking-wider font-semibold text-2xl sm:text-2xl md:text-2xl lg:text-2.5xl'>
              Projects
            </h1>
          </div>
        <Slider {...settings} className="w-full">
          {project.map(p => (
            <div key={p.id} className={`flex flex-col items-center p-2 bg-gray-100 w-[600px] h-[580px] rounded-lg shadow-md ${expanded[p.id]? 'overflow-y-auto':'overflow-hidden' }`}>
              
              <div className="flex justify-center items-center">
              <img src={p.image} alt={p.title} className={`w-[500px] h-[300px] rounded-lg ${expanded[p.id]?'object-contain':'object-cover'}`}/>
              </div>
              
              <h2 className="text-xl text-center font-semibold mt-4">{p.title}</h2>
              
              <div className="flex justify-center items-center">
              <ul className={`w-[90%] sm:w-[80%] font-light text-custom-18 h-[20%] leading-relaxed text-sm dark:text-[#ccc] pt-3${expanded[p.id] ? "" : "line-clamp-2 overflow-hidden text-ellipsis"}`}>
              {p.description
                .split('\n')
                .slice(0, expanded[p.id] ? p.description.split('\n').length : 2) // Show 2 items if not expanded, else show all
                .map((line, index) => (
                  <li key={index} className="mb-2">
                    - {line.trim()}
                  </li>
              ))}
              </ul>
              </div>
              

              
              <div className='w-full flex justify-center items-center gap-4 relative mt-4 '>
              <a href={p.url} target="_blank" rel="noopener noreferrer" 
                className=" px-4 bg-[#ec6e59] text-white rounded-lg no-underline hover:no-underline">
                Demo
              </a>
              <button
                onClick={() => toggleReadMore(p.id)}
                className="px-4 text-white bg-blue-500 rounded-lg "
              >
                {expanded[p.id] ? "Read less" : "Read more"}
              </button>
              </div>
            
            </div>
          ))}
        </Slider>
        </div>
      );
}

export default Projects;
