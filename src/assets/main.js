const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCOJZ1tna8yj8mAEITPkHNCQ&part=snippet%2Cid&order=date&maxResults=10";

const content = null || document.getElementById("content");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8bb578efadmsh8f5aed01323a46dp113efcjsn3d2a911fc53a',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

fetch(API, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

//ejecutar programa automáticamente
(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
    ${videos.items.map(video => `
    <a href='https://www.youtube.com/watch?v=${video.id.videoId}' target='blank'>
      <div class="group relative">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full" />
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title}
          </h3>
        </div>
      </div>
    </a>
    `
      )
      .slice(0, 4)
      .join("")}
    `;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
encodeURI