const e=JSON.parse(localStorage.getItem("movieWatchlist"))||[];console.log(e);const t=document.querySelector(".library"),n=document.getElementById("watchedButtonLibrary");n.addEventListener("click",(()=>{!async function(e){try{t.innerHTML="";const n=e.map((({poster_path:e,genres:t,id:n,release_date:o,title:a,vote_average:r})=>{const i=e?`https://image.tmdb.org/t/p/w500${e}`:"https://moviereelist.com/wp-content/uploads/2019/07/poster-placeholder.jpg",s=t.map((e=>e.name?e.name:"Unknown Genre")).join(", "),c=r.toFixed(1);return`<li class="library-item" data-movieid="${n}">\n      <img src="${i}" alt="${a}" movie-id="${n}"/>\n      <h3>${a.toUpperCase()}</h3>\n      <p>${s} | <span>${o.slice(0,4)}</span></p>\n    <div class="vote-average">${c}</div>\n    </li>`}));t.insertAdjacentHTML("beforeend",n)}catch(e){console.error(e)}}(e)}));
//# sourceMappingURL=library.8f8ad706.js.map
