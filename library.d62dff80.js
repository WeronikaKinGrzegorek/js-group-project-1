const e=JSON.parse(localStorage.getItem("movieWatchlist"))||[];console.log(e);const t=document.querySelector(".library"),n=document.getElementById("watchedButtonLibrary");n.addEventListener("click",(()=>{!async function(e){try{t.innerHTML="";const n=e.map((({poster_path:e,genres:t,id:n,release_date:a,title:o,vote_average:r})=>{const i=e?`https://image.tmdb.org/t/p/w500${e}`:"https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg",s=t.map((e=>e.name?e.name:"Unknown Genre")).join(", "),c=r.toFixed(1);return`<li class="library-item gallery__list-item" data-movieid="${n}">\n      <img src="${i}" alt="${o}" movie-id="${n}"/>\n      <h3>${o.toUpperCase()}</h3>\n      <p>${s} | <span>${a.slice(0,4)}</span></p>\n    <div class="vote-average">${c}</div>\n    </li>`}));t.insertAdjacentHTML("beforeend",n)}catch(e){console.error(e)}}(e)}));
//# sourceMappingURL=library.d62dff80.js.map