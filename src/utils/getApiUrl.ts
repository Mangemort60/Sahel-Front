const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL
}

export default getApiUrl
