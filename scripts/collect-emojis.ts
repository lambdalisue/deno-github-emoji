const resp = await fetch("https://api.github.com/emojis");
const emojis = await resp.json();
await Deno.writeTextFile("emojis.json", JSON.stringify(emojis));
