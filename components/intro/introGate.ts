/**
 * Runs inline in <head>, before first paint. It decides whether the CRT intro
 * plays this visit and marks <html data-intro="play|fade"> accordingly. A
 * server-rendered ink "room" (see intro.css) is visible only while that
 * attribute exists, so the page never flashes before the intro.
 *
 * Skipped when: already played this session, URL has a hash (deep link),
 * `?nointro`, or storage/JS is unavailable. Reduced motion gets a crossfade.
 * `?intro=force` / `?intro=medium` / `?intro=slow` replay it regardless of the session flag.
 *
 * Failsafe: if the app never hydrates, the attribute is removed after 25 s so
 * the site can never stay hidden.
 */
export const INTRO_GATE_SCRIPT = `(function(){try{
var d=document.documentElement,s=location.search;
d.setAttribute('data-js','');
if(/[?&]nointro/.test(s))return;
var force=/[?&]intro=(force|slow|medium|perfect_speed)/.test(s);
if(location.hash&&!force)return;
if(!force&&sessionStorage.getItem('qubit-intro')==='1')return;
sessionStorage.setItem('qubit-intro','1');
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
d.setAttribute('data-intro',reduce?'fade':'play');
setTimeout(function(){d.removeAttribute('data-intro')},25000);
}catch(e){}})();`;
