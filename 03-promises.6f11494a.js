function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},l=t.parcelRequired7c6;null==l&&((l=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var l={id:e,exports:{}};return o[e]=l,t.call(l.exports,l,l.exports),l.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},t.parcelRequired7c6=l);var i=l("7Y9D8");e(i).Notify.init({position:"right-top",clickToClose:!0});const u={delayEl:document.getElementsByName("delay")[0],stopEl:document.getElementsByName("step")[0],amountEl:document.getElementsByName("amount")[0],submitBtn:document.querySelector('button[type="submit"]')};function r({position:e,delay:t}){return new Promise(((o,n)=>{const l=Math.random()>.3;setTimeout((()=>{l&&o(`Fulfilled promise ${e} in ${t}ms`),n(`Rejected promise ${e} in ${t}ms`)}),t)}))}u.delayEl.value=1500,u.stopEl.value=1e3,u.amountEl.value=5,u.submitBtn.addEventListener("click",(t=>{t.preventDefault();let o=Number(u.delayEl.value),n=Number(u.stopEl.value),l=Number(u.amountEl.value);for(let t=1;t<=l;t+=1)r({position:t,delay:o}).then((t=>{e(i).Notify.success(t)}),(t=>{e(i).Notify.failure(t)})),o+=n}));
//# sourceMappingURL=03-promises.6f11494a.js.map