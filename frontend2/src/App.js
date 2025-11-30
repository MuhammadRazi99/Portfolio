import { useQuery } from "@tanstack/react-query";
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
import Achievement from './components/Achievement';

import {
  fetchEducation,
  fetchExperience,
  fetchProjects,
  fetchCertificates,
  fetchPublications,
  fetchAchievements
} from "./api";

function App() {

  const eduQuery = useQuery({
    queryKey: ["education"],
    queryFn: fetchEducation,
  });

  const expQuery = useQuery({
    queryKey: ["experience"],
    queryFn: fetchExperience,
  });

  const projQuery = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const certQuery = useQuery({
    queryKey: ["certificates"],
    queryFn: fetchCertificates,
  });

  const pubQuery = useQuery({
    queryKey: ["publications"],
    queryFn: fetchPublications,
  });

  const achQuery = useQuery({
    queryKey: ["achievements"],
    queryFn: fetchAchievements,
  });

  const isLoading =
    eduQuery.isLoading ||
    expQuery.isLoading ||
    projQuery.isLoading ||
    certQuery.isLoading ||
    pubQuery.isLoading ||
    achQuery.isLoading;

  const isError =
    eduQuery.isError ||
    expQuery.isError ||
    projQuery.isError ||
    certQuery.isError ||
    pubQuery.isError ||
    achQuery.isError;

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;
  if (isError) return <div className="text-center mt-20">Error loading data</div>;

  return (
    <BackgroundView>
      <div className='font-poppins select-none text-black bg-white dark:bg-[#20262E] dark:text-white transition duration-500'>
        <Navbar />
        <Main />

        <Education education={eduQuery.data?.results} />
        <Experiences experience={expQuery.data?.results} />
        <Achievement achievement={achQuery.data?.results} />
        <Projects project={projQuery.data?.results} />
        <Certificate certificate={certQuery.data?.results} />
        <Publication publication={pubQuery.data?.results} />

        <ChatbotComponent />
        <Footer />
      </div>
    </BackgroundView>
  );
}

export default App;