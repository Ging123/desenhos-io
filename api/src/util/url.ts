export default function apiUrl() {
  if(process.env.MODE! === 'DEV') return process.env.LOCAL_HOST!;
  return process.env.PRODUCTION_HOST!
}