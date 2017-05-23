const Iconv = require("iconv").Iconv;

class WebpackIconvPlugin{
  constructor(from, to, untranslatable, charMap){
    this.from = from;
    if(untranslatable === "TRANSLIT"){
      this.to = to + "//TRANSLIT";
    }else if(untranslatable === "IGNORE"){
      this.to = to + "//IGNORE";
    }else{
      this.to = to;
    }
    this.charMap = charMap;
  }

  _beforeTranslate(str){
    return Object.keys(this.charMap).reduce((str, char) => {
      let regexp = new RegExp(char, "g");
      return str.replace(regexp, this.charMap[char]);
    }, str);
  }

  apply(compiler){
    const iconv = new Iconv(this.from, this.to);
    compiler.plugin("after-compile", (compilation, cb) => {
      Object.keys(compilation.assets).forEach((assetName) => {
        let asset = compilation.assets[assetName];
        asset._value = iconv.convert(this._beforeTranslate(asset._value));
      });
      cb();
    });
  }
}

module.exports = WebpackIconvPlugin;