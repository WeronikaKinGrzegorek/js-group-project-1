var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in r){var o=r[e];delete r[e];var t={id:e,exports:{}};return n[e]=t,o.call(t.exports,t,t.exports),t.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,n){r[e]=n},e.parcelRequired7c6=o),o("etrig"),o("bc1Ao"),o("6e3C3"),o("iB7wN"),o("fMaiS"),o("lN2wz"),o("knVcn"),o("fHyLY"),o("7UJs8"),o("lN2wz");var t=o("fMaiS");o("7UJs8");let l=1;async function i(e,n){try{l++,await e(n,l,18)}catch(e){console.log(e)}}o("7UJs8");const a=document.querySelector(".search-form"),d=document.querySelector('[name="searchQuery"]'),c=document.querySelector(".gallery__list"),s=document.getElementById("loadMore");s.style.display="none";let u="",f="";a.addEventListener("submit",(function(e){e.preventDefault(),u=d.value,f=u,c.innerHTML="",(0,t.drawMovies)(f),s.style.display="block",hideLoader()})),s.addEventListener("click",(()=>{i(t.drawMovies,d.value)})),(0,t.drawMovies)(d.value);
//# sourceMappingURL=index.6755c933.js.map
