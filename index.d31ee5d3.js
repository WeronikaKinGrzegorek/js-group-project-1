var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var i=n("7IoHk");i=n("7IoHk");n("fMaiS");document.querySelector("#watchedButtonLibrary");let r=JSON.parse(localStorage.getItem("movieWatchlist"))||[];function l(e){const t=e.id;r.some((e=>e.id===t))?i.Notify.failure(`Movie "${e.title}" is already in watchlist.`):(r.push(e),localStorage.setItem("movieWatchlist",JSON.stringify(r)),i.Notify.success(`Added movie "${e.title}" to watchlist.`))}var a=n("knVcn"),c=n("fMaiS"),s=n("lN2wz");const d=document.getElementById("movieModal"),u=d.querySelector("#modalPoster"),m=d.querySelector("#modalTitle"),y=d.querySelector("#modalRating"),f=d.querySelector("#modalPopularity"),v=d.querySelector("#modalOriginalTitle"),p=d.querySelector("#modalGenres"),g=d.querySelector("#modalOverview"),w=d.querySelector("#watchedButton"),h=d.querySelector("#watchlistButton"),S=d.querySelector("#trailerLink");let q,E=[];async function k(e){0===E.length&&(E=await(0,a.fetchGenres)());const t=E.find((t=>t.id===e));return t?t.name:"Nieznany"}function L(){I(q)}function N(){l(q)}function x(){d.style.display="none",w.removeEventListener("click",N,!0),h.removeEventListener("click",L,!0),d.removeEventListener("click",O),document.removeEventListener("keydown",C)}function C(e){"Escape"===e.key&&x()}function O(e){e.target===d&&x()}document.addEventListener("DOMContentLoaded",(function(){let e=1;document.getElementById("loadMore").addEventListener("click",(async()=>{try{await(0,c.drawMovies)("",e,15),e++}catch(e){console.error(e)}}))})),k(),document.addEventListener("click",(async function(e){try{const t=e.target.closest(".gallery__list-item");if(console.log(t),t){const e=t.dataset.movieid;console.log(e),q=await(0,s.getFilmDetails)(e),await async function(e){console.log(e);const t=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg";u.src=t,u.alt=e.title,m.textContent=e.title.toUpperCase(),y.textContent=e.vote_average,f.textContent=e.popularity,v.textContent=e.original_title;const o=e.genres.map((async e=>await k(e))),n=await Promise.all(o);p.textContent=n,g.textContent=e.overview,w.addEventListener("click",N,!0),h.addEventListener("click",L,!0),S.href=`https://www.youtube.com/results?search_query=${e.title}+trailer`,d.style.display="block",document.addEventListener("keydown",C),d.addEventListener("click",O)}(q)}}catch(e){console.error(e)}}));document.getElementById("modalCloseButton").addEventListener("click",x);document.querySelector("#queueButtonLibrary");let b=JSON.parse(localStorage.getItem("movieQueue"))||[];function I(e){const t=e.id;b.some((e=>e.id===t))?i.Notify.failure(`Movie "${e.title}" is already in queue list.`):(b.push(e),localStorage.setItem("movieQueue",JSON.stringify(b)),i.Notify.success(`Added movie "${e.title}" to queue list.`))}
//# sourceMappingURL=index.d31ee5d3.js.map
