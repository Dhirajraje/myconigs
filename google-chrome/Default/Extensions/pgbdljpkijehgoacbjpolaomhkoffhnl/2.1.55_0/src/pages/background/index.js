import{A as n,i as s}from"../../../assets/js/orgaApi.6f81477b.js";chrome.runtime.onMessage.addListener((t,o,a)=>{if(t.type==="inboxsdk__injectPageWorld"&&o.tab){if(chrome.scripting)return chrome.scripting.executeScript({target:{tabId:o.tab.id},world:"MAIN",files:["pageWorld.js"]}),a(!0),!0;throw new Error("chrome.scripting is undefined, this means that scriptinjection is not supported on your browser")}});chrome.runtime.onInstalled.addListener(async function(t){const o=await n.getAccountsData();if(t.reason=="install"||o.length==0&&t.reason=="update"){const a=s();let e="https://app.getmailtracker.com/sign-in?utm_source=_mailtracker_chrome_extension&utm_medium=extension&utm_campaign=extension&utm_content=new_install";a&&(e=e.replace("https://app.getmailtracker.com/","https://mailtracker.ngrok.io/")),chrome.tabs.create({url:e})}});const c=24*60*60*1e3;chrome.runtime.onUpdateAvailable.addListener(t=>{t&&chrome.storage.local.get("lastUpdate",o=>{const a=o.lastUpdate,e=new Date().getTime();if(!a||e-a>=c)try{chrome.runtime.reload(),chrome.storage.local.set({lastUpdate:e})}catch(r){console.error(r)}else console.log("Maximum one update per day reached")})});chrome.runtime.onMessage.addListener(async(t,o,a)=>{if(t.type=="setAccount")try{const e=t.options.message;if(e.token){await n.createAccountEntry(e.email.toLowerCase());for(const r in e)await n.editAccountAttribute(e.email.toLowerCase(),r,e[r])}}catch(e){console.log(e)}if(t.type=="applyRules")try{const e=t.options.message;console.log("applyRules",e);const r=[{id:2,priority:1,action:{type:"block"},condition:{urlFilter:"*pixel*user="+e.id+"&end=1*",resourceTypes:["image"]}},{id:3,priority:1,action:{type:"block"},condition:{urlFilter:"*pixel*user="+e.id+"&amp;end=1*",resourceTypes:["image"]}}];try{await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:[2,3]})}catch(i){console.log(i)}await chrome.declarativeNetRequest.updateDynamicRules({addRules:r}),setInterval(async()=>{const i=await chrome.declarativeNetRequest.getDynamicRules();console.log("Checking rules ",i),i.length<2&&(console.log("Reapply rules existing ",i),await chrome.declarativeNetRequest.updateDynamicRules({addRules:i}))},6e4)}catch(e){console.error(e)}return!0});
//# sourceMappingURL=index.js.map
