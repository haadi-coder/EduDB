import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: 'http://localhost:3000/api' });

export default function Home() {
  return <main className="">nothing</main>;
}
