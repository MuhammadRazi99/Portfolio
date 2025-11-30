import { baseURL } from "../Constants";

const fetcher = async (endpoint) => {
  const res = await fetch(`${baseURL}/${endpoint}/`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
};

export const fetchEducation = () => fetcher("education");
export const fetchExperience = () => fetcher("experience");
export const fetchProjects = () => fetcher("project");
export const fetchCertificates = () => fetcher("certificate");
export const fetchPublications = () => fetcher("publication");
export const fetchAchievements = () => fetcher("achievement");
