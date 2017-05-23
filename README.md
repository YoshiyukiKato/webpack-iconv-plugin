# webpack-iconv-plugin
Webpack plugin to change encoding of output. This plugin depends on [node-iconv](https://github.com/bnoordhuis/node-iconv#supported-encodings).

# Usage

```js
//webpack.config.js
const WebpackIconvPlugin = require("webpack-iconv-plugin");

module.exports = {
  //...your webpack config
  plugins: [
    new WebpackIconvPlugin("UTF-8", "SHIFT-JIS", "TRANSLIT", { "\\\\" : "¥" })
  ]
};
```

## WebpackIconvPlugin(from, to, whenUntranslatable, preReplaceMap)
### from/to
Encoding of input and output. See [here](https://github.com/bnoordhuis/node-iconv#supported-encodings) to know supported encordings.

### whenUntranslatable
How to deal with an input including untranslatable chars. See [here](https://github.com/bnoordhuis/node-iconv#supported-encodings) to know available settings.

- TRANSLIT
- IGNORE

### preReplaceMap
Correspondence table of chars to replace before translation.  
For instance, in case of converting from `UTF-8` to `SHIFT-JIS`, `\` could not be translated. To escape characters, `SHIFT-JIS` uses `¥` instead of `\`.  
We want to replace `\` as `¥` before translation of iconv. In this case, we pass a map of chars:

```js
{
  "\\\\" : "¥"
}
```

## LICENSE
MIT