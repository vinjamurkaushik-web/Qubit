/* CONTENT: edit here. Leave a field empty and the page shows TO BE ANNOUNCED. */
const ev=(name,glyph="",tag="",poster="event.png",desc="[Placeholder event description]",coordinator="[Placeholder coordinator name]",phone="[Placeholder coordinator number]")=>({name,glyph,tag,
  desc,            // short description explaining what the event involves
  fee:"",pool:"",date:"16–17 Oct 2026",time:"",venue:"",
  coordinator,phone,   // event coordinator name + phone
  team:null,          // {min:2,max:4} or "individual"
  prize:{},           // {first:"",second:"",third:""}
  coordinators:[],    // [{name:"",phone:"+91...",email:""}]
  form:"",            // Google Form URL for Register Now
  img:"",poster});
const CONFIG={
  collegeLogo:"mgitlogo.png",
  poster:"poster.jpeg",
  target:"2026-10-16T09:00:00+05:30",   // 16 Oct 2026; start time is a placeholder (IST)
  afterMsg:"QUBIT ’26 IS LIVE",
  newTab:true,
  dept:"Computer Science and Engineering",dates:"16<sup>th</sup>–17<sup>th</sup> October",
  chairman:{name:"Dr. T V Rajini Kanth",role:"HOD CSE"},
  facCoord:["Dr. A. Ratna Raju, Asst Prof.","Dr. K. Satish Kumar, Assoc Prof.","Dr. P. Poornima, Asst Prof.","Ms. G. Naga Sujini, Asst Prof.","Ms. K. Shirisha, Asst Prof."],
  tech:[ev("Sherlock's Last Case","","","sherlocks-last-case-poster.svg"),ev("Coding Competition","","","coding-competition-poster.svg"),ev("Green the O/P","","","green-the-o-p-poster.svg"),ev("Paper Presentation","","","paper-presentation-poster.svg"),ev("Poster","","","poster-poster.svg"),ev("Prompt Masters","","","prompt-masters-poster.svg"),ev("Cyber Hunt","","","cyber-hunt-poster.svg")],
  non:[ev("Treasure Hunt","","","treasure-hunt-poster.svg"),ev("FreeFire","","","freefire-poster.svg"),ev("IPL Auction","","","ipl-auction-poster.svg"),ev("BGMI","","","bgmi-poster.svg"),ev("Tug of War","","","tug-of-war-poster.svg"),ev("Smash Karts","","","smash-karts-poster.svg"),ev("Reel Challenge","","","reel-challenge-poster.svg"),ev("404 Brain Not Found","","","404-brain-not-found-poster.svg"),ev("Pictionary","","","pictionary-poster.svg"),ev("Minute to Win It","","","minute-to-win-it-poster.svg"),ev("Movie Guessing Challenge","","","movie-guessing-challenge-poster.svg"),ev("See No, Speak No, Guess","","","see-no-speak-no-guess-poster.svg"),ev("Tambola","","","tambola-poster.svg"),ev("Guess with Sound in Ears","","","guess-with-sound-in-ears-poster.svg"),ev("Chitra Ragam","","","chitra-ragam-poster.svg"),ev("Knock the Cup","","","knock-the-cup-poster.svg")],
  gallery:[{src:"ar2.webp",label:"QUBIT archive 2"},{src:"ar3.webp",label:"QUBIT archive 3"},{src:"archive1.webp",label:"QUBIT archive 1"},{src:"preview1.webp",label:"QUBIT preview 1"},{src:"preview.webp",label:"QUBIT preview"}],
  faculty:[{name:"Dr. T V Rajini Kanth",role:"HOD CSE",photo:"hod.jpeg"},{name:"Dr. A. Ratna Raju",role:"Asst Prof.",photo:"ratnarajusir.jpeg"},{name:"Dr. K. Satish Kumar",role:"Assoc Prof.",photo:"sathishsir.png"},{name:"Dr. P. Poornima",role:"Asst Prof.",photo:"poornimamam.jpeg"},{name:"Ms. G. Naga Sujini",role:"Asst Prof.",photo:"sujinimam.jpeg"},{name:"Ms. K. Shirisha",role:"Asst Prof.",photo:"shirishamam.jpeg"}],
  coordinators:Array.from({length:6},()=>({name:"Add organizer name",role:"QUBIT Organizing Team"})),
  location:"MGIT Main Road, Kokapet, Gandipet, Telangana 500075",
  phone:"[Placeholder] Phone number",
  mapLink:"https://maps.app.goo.gl/DTohkTpXxJUZNh2g7",
  mapEmbed:"https://maps.google.com/maps?q=17.391051,78.3220892&z=16&output=embed"
};
