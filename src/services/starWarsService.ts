import axios from 'axios';

export const getPersons = async (pageParam: string) => {
  if (!pageParam) return;
  const response = await axios.get(`https://swapi.dev/api/people/?page=${pageParam.slice(-1)}`);
  return response.data  ;
}