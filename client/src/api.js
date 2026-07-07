const API_URL = "http://localhost:5000";

export const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects`);
  return res.json();
};