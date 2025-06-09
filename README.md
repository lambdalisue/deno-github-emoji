# github-emoji

[![jsr](https://img.shields.io/jsr/v/%40lambdalisue/github-emoji?logo=javascript&logoColor=white)](https://jsr.io/@lambdalisue/github-emoji)
[![denoland](https://img.shields.io/github/v/release/lambdalisue/deno-github-emoji?logo=deno&label=denoland)](https://github.com/lambdalisue/deno-github-emoji/releases)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/github_emoji/mod.ts)
[![Test](https://github.com/lambdalisue/deno-github-emoji/workflows/Test/badge.svg)](https://github.com/lambdalisue/deno-github-emoji/actions?query=workflow%3ATest)

GitHub emoji library for TypeScript.

## Usage

Get a emoji string of a name (e.g. `smile`), use `emojiOf` function like:

```typescript ignore
import { emojiOf } from "https://deno.land/x/github_emoji@$MODULE_VERSION/mod.ts";

console.log(emojiOf("smile"));
// -> ☺️
```

The `emojiOf` require `EmojiName` instead of `string` so invalid emoji name
become TypeScript error.

```typescript ignore
import {
  EmojiName,
  emojiOf,
} from "https://deno.land/x/github_emoji@$MODULE_VERSION/mod.ts";

console.log(emojiOf("smile")); // OK
//console.log(emojiOf("this-is-not-valid-emoji-name")); // TypeScript error
console.log(emojiOf("this-is-not-valid-emoji-name" as EmojiName)); // OK but returns undefined
```

Replace all valid `:{name}:` like strings (e.g. `:smile:`) in a text with emoji
strings, use `emojify` function like:

```typescript ignore
import { emojify } from "https://deno.land/x/github_emoji@$MODULE_VERSION/mod.ts";

console.log(emojify("Hello :world: :smile:")); // :world: is not valid emoji
// -> Hello :world: ☺️
```

See API documentation for more details and functions.

## License

The code follows MIT license written in [LICENSE](./LICENSE). Contributors need
to agree that any modifications sent in this repository follow the license.

## Special Thanks

This library is strongly inspired by
[rhysd/node-github-emoji](https://github.com/rhysd/node-github-emoji).
