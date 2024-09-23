import { useEffect, useState } from 'react';
import Main from './components/Main';
import Experiences from './components/Experiences';
import Navbar from './components/Navbar';
import Projects from './components/Project';
import Footer from './components/Footer';
import BackgroundView from './Layout/BackgroundView';
import Education from './components/Education';
import Certificate from './components/Certificate';
import Publication from './components/Publication';
import ChatbotComponent from './components/chatbot';

function App() {
  const [loading, setLoading] = useState(true);
  const [education, setEducation]=useState([])
  const [experience, setExperience]=useState([])
  const [project,setProject]=useState([])
  const [certificate,setCertificate]=useState([])
  const [publication,setPublication]=useState([])

  useEffect(()=>{
    getData()
  },[])

  const getData=async()=>{
  try{
    const educationResponse= await fetch('/education')
    const educationData=await educationResponse.json()
    setEducation(educationData.results)
    
    const experienceResponse= await fetch('/experience')
    const experienceData=await experienceResponse.json()
    setExperience(experienceData.results)
    
    
    const ProjectResponse= await fetch('/project')
    const projectData=await ProjectResponse.json()
    setProject(projectData.results)
    
    const certificateResponse= await fetch('/certificate')
    const certificateData=await certificateResponse.json()
    setCertificate(certificateData.results)
    
    const publicationResponse= await fetch('/publication')
    const publicationData=await publicationResponse.json()
    setPublication(publicationData.results)
    
    // console.log(certificateResponse)
    
    // console.log(education)
    setLoading(false)

  } 

  catch(error){
    console.error("error while fetching data")
    setLoading(false)
  }

  }
  if (loading) {
      return <div>Loading...</div>;  // Show a loading message or spinner while fetching data
  }

  return (
    <BackgroundView>
      <div className='font-poppins select-none text-black bg-white dark:bg-[#20262E] dark:text-white  transition duration-500'>
        <Navbar />
        <Main />
        <Education education={education}/>
        <Experiences experience={experience}/>
        <Projects project={project}/>
        <Certificate certificate={certificate}/>
        <Publication publication={publication}/>
        <ChatbotComponent/>
        <Footer/>
      </div>
    </BackgroundView>
  )
}

export default App