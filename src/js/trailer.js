export async function openYoutubeTrailer(movieData) {
  try {
    const movieTitleForSearch = encodeURIComponent(movieData.title);
    const apiKey = 'AIzaSyBGEBT2TOthR5IeC42NMx-jS-6ozWXTgmM'; // Podmień to na swój klucz API
    const apiEndpoint = `https://www.googleapis.com/youtube/v3/search?q=${movieTitleForSearch}+trailer&key=${apiKey}&type=video`;

    const response = await fetch(apiEndpoint);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      const youtubeURL = `https://www.youtube.com/watch?v=${videoId}`;
      window.open(youtubeURL, '_blank');
    } else {
      console.error('Niestety nie znaleziono trailera dla tego filmu.');
    }
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania trailera z YouTube:', error);
  }
}
