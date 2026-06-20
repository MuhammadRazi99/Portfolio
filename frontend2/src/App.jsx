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
import ChatbotComponent from './components/Chatbot';
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

  const queries = [eduQuery, expQuery, projQuery, certQuery, pubQuery, achQuery];
  const totalQueries = queries.length;
  const finishedCount = queries.filter(q => q.isFetched).length;
  const percentage = Math.round((finishedCount / totalQueries) * 100);
  const isLoading = queries.some(q => q.isLoading);
  const isError = queries.some(q => q.isError);

  if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#20262E] transition">
      <div className="flex flex-col items-center gap-6">
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2e8b57] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        {/* Percentage Text */}
        <p className="text-2xl font-bold text-[#2e8b57] dark:text-[#2e8b57]">
          {percentage}%
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 tracking-wide">
          Loading portfolio...
        </p>
      </div>
    </div>
  );
}

if (isError) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#20262E] transition">
      <div className="text-center">
        <p className="text-sm text-red-500 dark:text-red-400 font-medium">
          Failed to load data
        </p>
      </div>
    </div>
  );
}


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