var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var i=n("7IoHk"),a=n("fHyLY");i=n("7IoHk");n("fMaiS");document.querySelector("#watchlist");let l=JSON.parse(localStorage.getItem("movieWatchlist"))||[];function r(e){const t=e.id;l.some((e=>e.id===t))?i.Notify.failure(`Movie "${e.title}" is already in watchlist.`):(l.push(e),localStorage.setItem("movieWatchlist",JSON.stringify(l)),i.Notify.success(`Added movie "${e.title}" to watchlist.`))}var c=n("knVcn");const s=document.querySelector(".gallery-home"),d=document.getElementById("loadMore");let u,m=1,y=[];async function f(e){0===y.length&&(y=await(0,c.fetchGenres)());const t=y.find((t=>t.id===e));return t?t.name:"Nieznany"}async function p(e){const t=document.getElementById("movieModal"),o=(t.querySelector(".modal-content"),t.querySelector("#modalPoster"));o.src=`https://image.tmdb.org/t/p/w300${e.poster_path}`,o.alt=e.title;t.querySelector("#modalTitle").textContent=e.title.toUpperCase();t.querySelector("#modalRating").textContent=e.vote_average;t.querySelector("#modalPopularity").textContent=e.popularity;t.querySelector("#modalOriginalTitle").textContent=e.original_title;const n=e.genre_ids.map((async e=>await f(e))),i=await Promise.all(n);t.querySelector("#modalGenres").textContent=i.join(", ");t.querySelector("#modalOverview").textContent=e.overview;t.querySelector("#watchedButton").addEventListener("click",(()=>{r(e)}));t.querySelector("#watchlistButton").addEventListener("click",(()=>{q(e)}));t.querySelector("#trailerLink").href=`https://www.youtube.com/results?search_query=${e.title}+trailer`,t.style.display="block",document.addEventListener("keydown",g),t.addEventListener("click",(function(e){e.target===t&&v()}))}function v(){document.getElementById("movieModal").style.display="none",document.removeEventListener("keydown",g)}function g(e){"Escape"===e.key&&v()}f(),document.addEventListener("click",(function(e){const t=e.target.closest(".movie");if(t){const e=Array.from(s.children).indexOf(t);p(u.results[e])}}));async function h(){const e=`https://api.themoviedb.org/3/movie/popular?api_key=55e390226d2f3f6feba5afe684a5a044&language=en-US&page=${m}`;try{const o=await fetch(e);u=await o.json(),0===y.length&&(y=await(0,c.fetchGenres)());for(const e of u.results){const o=document.createElement("div");o.classList.add("movie");const n=await Promise.all(e.genre_ids.map((async e=>await f(e)))),i=(t=e.release_date,new Date(t).getFullYear());o.innerHTML=`\n        <div class="movie-content">\n          <img src="https://image.tmdb.org/t/p/w300${e.poster_path}" alt="${e.title}">\n          <h3 class="movie-title">${e.title.toUpperCase()}</h3>\n          <p class="movie-info">\n            ${n.join(", ")} | ${i}\n          </p>\n        </div>\n      `,s.appendChild(o)}(0,a.hideLoader)(),m++}catch(e){console.error("Błąd pobierania danych:",e)}var t}document.getElementById("modalCloseButton").addEventListener("click",v),d.addEventListener("click",h),h();const w=document.querySelector("#queueButton");let S=JSON.parse(localStorage.getItem("movieQueue"))||[];function q(e){const t=e.id;S.some((e=>e.id===t))?i.Notify.failure(`Movie "${e.title}" is already in queue list.`):(S.push(e),localStorage.setItem("movieQueue",JSON.stringify(S)),i.Notify.success(`Added movie "${e.title}" to queue list.`))}w.addEventListener("click",(()=>{console.log(S)}));
//# sourceMappingURL=index.4f571dcf.js.map
