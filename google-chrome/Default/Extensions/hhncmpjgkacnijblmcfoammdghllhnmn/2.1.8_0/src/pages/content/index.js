const f="modulepreload",m=function(o){return"/"+o},a={},h=function(s,l,u){if(!l||l.length===0)return s();const c=document.getElementsByTagName("link");return Promise.all(l.map(e=>{if(e=m(e),e in a)return;a[e]=!0;const t=e.endsWith(".css"),d=t?'[rel="stylesheet"]':"";if(!!u)for(let r=c.length-1;r>=0;r--){const i=c[r];if(i.href===e&&(!t||i.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${d}`))return;const n=document.createElement("link");if(n.rel=t?"stylesheet":f,t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t)return new Promise((r,i)=>{n.addEventListener("load",r),n.addEventListener("error",()=>i(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>s()).catch(e=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e})};h(()=>{(s=>import(s))("../../../assets/js/index.d8c11b3c.js")},[]);
//# sourceMappingURL=index.js.map
