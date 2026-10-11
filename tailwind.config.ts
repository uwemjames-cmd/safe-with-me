import type { Config } from "tailwindcss";
export default { content:["./app/**/*.tsx","./components/**/*.tsx"],
theme:{extend:{colors:{rose:"#FF8A9D",sky:"#89CFF0",gold:"#C9A24D",navy:"#0F1B2D",warm:"#FBF7F2"},
fontFamily:{serif:["Playfair Display","serif"],sans:["DM Sans","system-ui","sans-serif"],script:["Dancing Script","cursive"],hand:["Caveat","cursive"],uncial:["Uncial Antiqua","serif"],fell:["IM Fell English","serif"],cinzel:["Cinzel Decorative","serif"]}}},plugins:[]} satisfies Config;
