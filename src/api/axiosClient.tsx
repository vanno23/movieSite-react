import apiConfig from "./apiConfig";

const axiosClient = async (type: string, page?: number, query?: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/${type}?api_key=${apiConfig.apiKey}${query ? `&query=${query}` : ''}&page=${page || 1}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
}

export default axiosClient;
