// PHOTOS/VIDEOS: drop files in public/memories/ named after the slug (see README.txt there).
// Optional second (smaller overlapping) photo: add -2, e.g. bowling-2.jpg
// Formats: jpg, jpeg, png, webp, heic (photos) or mp4, webm, mov (videos). Upper-case extensions work too.
// Fill date/place/caption/note here when you're ready.
export type Mem={slug:string;title:string;date:string;place:string;caption:string;note:string};
const t=["Big supporter since day one!!","First selfie you ever sent me","First visit to my house","My first visit to your office","Nourish Station","Drummist!!!","Drummist Again!!","My favorite NYSC pic of us","Sugar Mummy!!","Barcelona Hotel","See hot babe nau","Your first birthday with me","Popcy's birthday","Energizeee","Ontime Spot review","She's hot!!!","Drivist!!","Pianist!!","The day we made up","Gift from the best Girlfriend ever!","Your beauty is Unbelievable","Orphanage visit","Remote Job Summit","See My hot babe nau","Data Protector!!","Office Visit!","Impromptu date","Another make up day!","FarmCity","Bowling","Stir-fry pasta","You're quite short","Grafted in"];
export const slugify=(s:string)=>s.toLowerCase().replace(/['’]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export const memories:Mem[]=t.map(title=>({slug:slugify(title),title,date:"",place:"",caption:"",note:""}));