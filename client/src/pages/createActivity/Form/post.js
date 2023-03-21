import axios from 'axios';

export default async function postDB(obj) {
  const body = {
    name: obj.name,
    difficulty: Number(obj.difficulty),
    time: Number(obj.time),
    season: obj.season,
    countries: obj.countries,
  };
  const result = await axios.post('activities', body);
  return result;
}
