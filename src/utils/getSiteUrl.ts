const getSiteUrl = (): string => {
  return import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_SITE_URL
    : import.meta.env.VITE_SITE_URL
}

export default getSiteUrl
