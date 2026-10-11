export type Scripture={ref:string;theme:string;text:string;note:string};
// KJV (public domain). Edit notes to dedicate verses to Inem.
export const scriptures:Scripture[]=[
{ref:"Song of Solomon 4:7",theme:"Beauty",text:"Thou art all fair, my love; there is no spot in thee.",note:""},
{ref:"Song of Solomon 8:6",theme:"Commitment",text:"Set me as a seal upon thine heart, as a seal upon thine arm: for love is strong as death.",note:"A seal is how you keep something safe."},
{ref:"Song of Solomon 2:10",theme:"Affection",text:"My beloved spake, and said unto me, Rise up, my love, my fair one, and come away.",note:""},
{ref:"Proverbs 31:25",theme:"Strength & Dignity",text:"Strength and honour are her clothing; and she shall rejoice in time to come.",note:""},
{ref:"Proverbs 31:26",theme:"Wisdom & Kindness",text:"She openeth her mouth with wisdom; and in her tongue is the law of kindness.",note:""},
{ref:"Proverbs 31:30",theme:"Fear of the Lord",text:"Favour is deceitful, and beauty is vain: but a woman that feareth the LORD, she shall be praised.",note:""},
{ref:"1 Corinthians 13:4",theme:"Patience & Kindness",text:"Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.",note:""},
{ref:"1 Corinthians 13:7",theme:"Perseverance",text:"Beareth all things, believeth all things, hopeth all things, endureth all things.",note:""},
{ref:"Song of Solomon 1:15",theme:"Beauty",text:"Behold, thou art fair, my love; behold, thou art fair; thou hast doves' eyes.",note:""},
{ref:"Song of Solomon 2:2",theme:"Admiration",text:"As the lily among thorns, so is my love among the daughters.",note:""},
{ref:"Song of Solomon 2:4",theme:"Love",text:"He brought me to the banqueting house, and his banner over me was love.",note:""},
{ref:"Song of Solomon 6:3",theme:"Belonging",text:"I am my beloved's, and my beloved is mine.",note:""},
{ref:"Song of Solomon 8:7",theme:"Love",text:"Many waters cannot quench love, neither can the floods drown it.",note:""},
{ref:"Proverbs 31:10",theme:"Worth",text:"Who can find a virtuous woman? for her price is far above rubies.",note:""},
{ref:"Proverbs 31:17",theme:"Strength & Dignity",text:"She girdeth her loins with strength, and strengtheneth her arms.",note:""},
{ref:"Proverbs 31:20",theme:"Kindness",text:"She stretcheth out her hand to the poor; yea, she reacheth forth her hands to the needy.",note:""},
{ref:"Proverbs 31:27",theme:"Diligence",text:"She looketh well to the ways of her household, and eateth not the bread of idleness.",note:""},
{ref:"Proverbs 31:29",theme:"Worth",text:"Many daughters have done virtuously, but thou excellest them all.",note:""},
{ref:"Proverbs 31:31",theme:"Diligence",text:"Give her of the fruit of her hands; and let her own works praise her in the gates.",note:""},
{ref:"1 Corinthians 13:5",theme:"Humility",text:"Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil.",note:""},
{ref:"1 Corinthians 13:8",theme:"Perseverance",text:"Charity never faileth.",note:""},
{ref:"1 Corinthians 13:13",theme:"Faith & Love",text:"And now abideth faith, hope, charity, these three; but the greatest of these is charity.",note:""}];
export const daily=<T,>(a:T[],d=new Date())=>a[Math.floor(d.getTime()/864e5)%a.length];
export type Item={id:string;area:string;title:string;why:string};
export const protect:Item[]=[
{id:"id1",area:"Identity & Accounts",title:"Move your email and main accounts to passkeys or an authenticator app",why:"SMS codes can be hijacked through SIM-swap and phishing."},
{id:"id2",area:"Identity & Accounts",title:"Review third-party apps with access to your Google/Apple/social login",why:"Old OAuth grants keep access long after you forget them."},
{id:"id3",area:"Identity & Accounts",title:"Check your email on haveibeenpwned.com and secure the recovery email",why:"Your recovery email is the master key to everything else."},
{id:"dv1",area:"Device Privacy",title:"Audit location, camera and microphone permissions app by app",why:"Most apps need far less access than they ask for."},
{id:"dv2",area:"Device Privacy",title:"Confirm device encryption and a strong screen lock are on",why:"A lost phone should be a nuisance, not a breach."},
{id:"fp1",area:"Digital Footprint",title:"Search your name and phone number; request removal of listings you don't want",why:"Public data is what scammers use to sound believable."},
{id:"fp2",area:"Digital Footprint",title:"Strip location metadata before posting photos",why:"Photos can carry exact coordinates."},
{id:"cm1",area:"Communications",title:"Learn the pattern: urgency + a link + a request for a code or money",why:"Almost every phishing and impersonation scam follows it."},
{id:"cm2",area:"Communications",title:"Turn on disappearing messages for sensitive chats",why:"Less stored history means less to leak."},
{id:"cl1",area:"Cloud & Data",title:"Audit who has access to shared files and links; turn off 'anyone with link'",why:"Forgotten public links are a common exposure."},
{id:"cl2",area:"Cloud & Data",title:"Keep an encrypted backup of key documents (IDs, certificates)",why:"Recovery matters as much as prevention."},
{id:"ai1",area:"AI & Modern Privacy",title:"Never paste IDs, passwords or private client data into AI tools; check their data settings",why:"Prompts may be stored or reviewed depending on the tool."},
{id:"ai2",area:"AI & Modern Privacy",title:"Agree a family code word to verify voice or video calls asking for money",why:"Voice cloning makes 'it sounds like them' unreliable."}];
