const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '48533468cd5de7cdb6304cffcf372f83',
    originalImage: (imgPath: any) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath: any) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;