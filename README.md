# Stylus Supremacy

**Stylus Supremacy** is a *Node.js* script for formatting *[Stylus](http://stylus-lang.com)* files. You may say this is a beautifier for *Stylus* language.

## Editor usage

Currently, **Stylus Supremacy** is only available in *Visual Studio Code* as an extension. You can download and install it [here](https://marketplace.visualstudio.com/items?itemName=thisismanta.stylus-supremacy).

## Command-line usage

First thing first, you must install this script via *NPM*.
```
npm install stylus-supremacy -g
```

Aftherthat, specifying a source *Stylus* file follows the command. The formatted content will be printed to the output stream (console/terminal).
```
stylus-supremacy ./path/to/your/file.styl
```

In case you want to format multiple files at a time, you can specify the path in *glob* pattern.
```
stylus-supremacy ./**/*.styl
```

The default [formatting options](#formatting-options) will be used, unless you specify your own options explicitly. The parameter `--options` and `-p` can be used interchangably.
```
stylus-supremacy ./path/to/your/file.styl --options ./path/to/your/options.json
```

You may write the formatted content to a file (or many files, if the pattern matches more than one files) by specifying `--outDir` or `-o`, and followed by the path to an output directory.
```
node stylus-supremacy ./path/to/your/file.styl --outDir ./path/to/output/directory
```

Alternatively, you may overwrite the original file with the formatted output by specifying `--replace` or `-r` parameter.
```
stylus-supremacy ./path/to/your/file.styl --replace
```

Note that `--outDir` and `--replace` will not work together. You have to choose just one.

## Programming usage

Once you have *stylus-supremacy* installed, you simply include *stylus-supremacy* and call its *format* function with a string of *Stylus* content and an object of [formatting options](#formatting-options) as arguments.
```js
const stylusSupremacy = require('stylus-supremacy')

const stylusContent = `
body
  display none
`

const formattingOptions = {
  insertColons: true,
  insertSemicolons: true,
  insertBraces: true
}

const result = stylusSupremacy.format(stylusContent, formattingOptions)
console.log(result)
```
```
body {
  display: none;
}
```

The `format` function always returns a string of the formatted *Stylus* content. However, it could throw an exception if there is at least one error in parsing the given *Stylus* content or generating the formatted output.

## Formatting options

You can find a sample JSON file containing the default formatting options [here](https://github.com/ThisIsManta/stylus-supremacy/blob/master/edge/defaultFormattingOptions.json).

### **`insertColons`** (default = `true`)
Insert or remove a colon after a property name.
- `true`
  ```
  .class1 {
    background: red
  }
  ```
- `false`
  ```
  .class1 {
    background red
  }
  ```

### **`insertSemicolons`** (default = `true`)
Insert or remove a semi-colon after a property value, a variable declaration, a variable assignment and a function call.
- `true`
  ```
  .class1 {
    background red;
  }
  ```
- `false`
  ```
  .class1 {
    background red
  }
  ```

### **`insertBraces`** (default = `true`)
Insert or remove a pair of curly braces between a selector body, a mixin body and a function body. Note that this option does not affect *@block* construction, see **`alwaysUseAtBlock`**.
- `true`
  ```
  .class1 {
    background red
  }
  ```
- `false`
  ```
  .class1
    background red
  ```

### **`insertNewLineBetweenGroups`** (default = `1`)
Represent a number of new-line between different type of groups.
- `0`
  ```
  .class1 {
    background red
    color white
    mixin()
  }
  .class2 {
    background blue
    color white
    mixin()
  }
  ```
- `1`
  ```
  .class1 {
    background red
    color white

    mixin()
  }

  .class2 {
    background blue
    color white

    mixin()
  }
  ```
- And so on

### **`insertNewLineBetweenSelectors`** (default = `false`)
Insert or remove a new-line between selectors.
- `true`
  ```
  .class1 {
    background red
  }

  .class2 {
    background blue
  }
  ```
- `false`
  ```
  .class1 {
    background red
  }
  .class2 {
    background blue
  }
  ```

### **`insertSpaceBeforeComment`** (default = `true`)
Insert or remove a white-space before a comment.
- `true`
  ```
  .class1 {
    background red // side comment
  }
  ```
- `false`
  ```
  .class1 {
    background red// side comment
  }
  ```

### **`insertSpaceAfterComment`** (default = `true`)
Insert or remove a white-space after a comment.
- `true`
  ```
  .class1 {
    background red // side comment
  }
  ```
- `false`
  ```
  .class1 {
    background red //side comment
  }
  ```

### **`insertSpaceAfterComma`** (default = `true`)
Insert or remove a white-space after a comma.  
Commas appear in serveral places, for example, a function parameter list, a function call, object properties and so on.
- `true`
  ```
  .class1 {
    background rgba(r, g, b, a)
  }
  ```
- `false`
  ```
  .class1 {
    background rgba(r,g,b,a)
  }
  ```

### **`insertSpaceInsideParenthesis`** (default = `false`)
Insert or remove a white-space after an open parenthesis and before a close parenthesis.
- `true`
  ```
  if ( condition ) {
    background red
  }
  ```
- `false`
  ```
  if (condition) {
    background red
  }
  ```
### **`insertParenthesisAroundIfCondition`** (default = `true`)
Insert or remove a pair of parentheses between *if*-condition.
- `true`
  ```
  if (condition) {
    background red
  }
  ```
- `false`
  ```
  if condition {
    background red
  }
  ```

### **`insertNewLineBeforeElse`** (default = `false`)
Insert or remove a new-line before *else* keyword.
- `true`
  ```
  if (condition) {
    background red
  }
  else {
    background blue
  }
  ```
- `false`
  ```
  if condition {
    background red
  } else {
    background blue
  }
  ```

### **`insertLeadingZeroBeforeFraction`** (default = `true`)
Insert or remove a zero before a number that between 1 and 0.
- `true`
  ```
  .class1 {
    margin 0.5px
  }
  ```
- `false`
  ```
  .class1 {
    margin .5px
  }
  ```

### **`tabStopChar`** (default = `"\t"`)
Represent a tab-stop character. You may change this to double white-space sequence or anything.  
If you are using **Stylus Supremacy** extension for *Visual Studio Code*, this option will always be determined automatically from your current viewing file.
- `"\t"`
  ```
  .class1 {
  	margin 0.5px
  }
  ```
- `"  "` (double white-space)
  ```
  .class1 {
    margin .5px
  }
  ```

### **`newLineChar`** (default = `"\n"`)
Represent a new-line character. You may change this to `"\r\n"` for *Microsoft Windows*.  
If you are using **Stylus Supremacy** extension for *Visual Studio Code*, this option will always be determined automatically from your current viewing file.

### **`quoteChar`** (default = `"'"`)
Represent a quote character that is used to begin and terminate a string. You must choose either single-quote or double-quote.  
- `"'"` (single quote)
  ```
  @import './file.styl'
  ```
- `"\""` (double quote)
  ```
  @import "./file.styl"
  ```

### **`sortProperties`** (default = `false`)
- `false` for not sorting CSS properties.
- `"alphabetical"` for sorting CSS properties from A to Z.
  ```
  .class1 {
    background red
    display block
    color white
  }
  ```
- `"grouped"` for sorting CSS properties according to [*Stylint* predefined order](https://github.com/SimenB/stylint/blob/master/src/data/ordering.json).
  ```
  .class1 {
    display block
    background red
    color white
  }
  ```
- An array of property names that defines the property order. For example, `["color", "background", "display"]`
  ```
  .class1 {
    color white
    background red
    display block
  }
  ```

### **`alwaysUseImport`** (default = `false`)
Convert *@require* to *@import*.  
The difference between *@import* and *@require* is very subtle. Please refer to [the offical guide](http://stylus-lang.com/docs/import.html#require).
- `true`
  ```
  @import './file1.styl'
  @import './file2.styl' // Formerly @require
  ```
- `false`
  ```
  @import './file1.styl'
  @require './file2.styl'
  ```

### **`alwaysUseNot`** (default = `false`)
Convert *!* operator to *not* keyword or vice versa.
- `true`
  ```
  if (not condition) {
    background red
  }
  ```
- `false`
  ```
  if (!condition) {
    background red
  }
  ```

### **`alwaysUseAtBlock`** (default = `false`)
Convert an increased-indent at-block construction to an explicit one with *@block* keyword or vice versa. Note that this option ignores **`insertBraces`** option.  
Please refer to [the official guide](http://stylus-lang.com/docs/block.html).
- `true`
  ```
  block =
    background red
  ```
- `false`
  ```
  block = @block {
    background red
  }
  ```

### **`alwaysUseExtends`** (default = `false`)
Convert *@extend* keyword to *@extends* keyword or vice versa.  
Please refer to [the official guide](http://stylus-lang.com/docs/extend.html).
- `true`
  ```
  .class1 {
    background red
  }

  .class2 {
    @extends .class1
    color white
  }
  ```
- `false`
  ```
  .class1 {
    background red
  }
  
  .class2 {
    @extend .class1
    color white
  }
  ```

### **`alwaysUseZeroWithoutUnit`** (default = `false`)
Convert `0px`, `0%`, `0em` and so on to `0` without units or vice versa.
- `true`
  ```
  .class1 {
    margin 0 // Formerly 0px
  }
  ```
- `false`
  ```
  .class1 {
    margin 0px
  }
  ```

### **`reduceMarginAndPaddingValues`** (default = `false`)
Reduce `margin` and `padding` duplicate values by converting `margin x` to `margin x x x x`, `margin x y` to `margin x y x y` where `x`, `y` is a property value.
- `true`
  ```
  .class1 {
    margin 0px // Formerly 0px 0px
    padding 0px 5px // Formerly 0px 5px 0px 5px
  }
  ```
- `false`
  ```
  .class1 {
    margin 0px 0px
    padding 0px 5px 0px 5px
  }
  ```

## Stylint compatibility

If you are using [*Stylint*](https://www.npmjs.com/package/stylint) as a *Stylus* linter and wanting to use *.stylintrc* file as a formatting options, simply pass the *.stylintrc* file via `--options` parameter or pass a JSON of [*Stylint* options](https://www.npmjs.com/package/stylint#options) as a second patameter of the `format` function. The *Stylint* options will be recognized by the command automatically.
```
stylus-supremacy ./path/to/your/file.styl --options ./path/to/your/.stylintrc
```

Ultimately, you can pass a JSON containing both *Stylint* options and **Stylus Supremacy** formatting options at the same time, but keep in mind that the latter will always have a higher priority.
```js
const stylusSupremacy = require('stylus-supremacy')

const stylusContent = `
body
  display none
`

const formattingOptions = {
  colons: 'always', // From Stylint
  insertColons: false // From Stylus Supremacy
}

const result = stylusSupremacy.format(stylusContent, formattingOptions)
console.log(result)
```
```
body {
  display none;
}
```

The result has no colons between `display` and `none` since `insertColons` is `false` eventhough `colons` says otherwise. This is because the values of **Stylus Supremacy** formatting option are more important than *Stylint* options.

Note that `"always"` in *Stylint* is equivalent to `true`; `"never"` is equivalent to `false`, otherwise the default [formatting options](#formatting-options) will be used.

|Stylint options|Equivalent options in Stylus Supremacy|
|---|---|
|`blocks`|`alwaysUseAtBlock`|
|`brackets`|`insertBraces`|
|`colons`|`insertColons`|
|`colors`|Not applicable|
|`commaSpace`|`insertSpaceAfterComma`|
|`commentSpace`|`insertSpaceAfterComment`|
|`cssLiteral`|Not applicable|
|`depthLimit`|Not applicable|
|`duplicates`|Not applicable|
|`efficient`|`reduceMarginAndPaddingValues`|
|`exclude`|Not applicable|
|`extendPref`|`alwaysUseExtends`|
|`globalDupe`|Not applicable|
|`groupOutputByFile`|Not applicable|
|`indentPref`|`tabStopChar`|
|`leadingZero`|`insertLeadingZeroBeforeFraction`|
|`maxErrors`|Not applicable|
|`maxWarnings`|Not applicable|
|`mixed`|Not applicable|
|`namingConvention`|Not applicable|
|`namingConventionStrict`|Not applicable|
|`none`|Not applicable|
|`noImportant`|Not applicable|
|`parenSpace`|`insertSpaceInsideParenthesis`|
|`placeholder`|Not applicable|
|`prefixVarsWithDollar`|Not applicable|
|`quotePref`|`quoteChar`; the values `"single"` and `"double"` will be converted to `"'"` and `"\""` respectively.|
|`reporterOptions`|Not applicable|
|`semicolons`|`insertSemicolons`|
|`sortOrder`|`sortProperties`|
|`stackedProperties`|Not applicable|
|`trailingWhitespace`|Not applicable|
|`universal`|Not applicable|
|`valid`|Not applicable|
|`zeroUnits`|`alwaysUseZeroWithoutUnit`; unlike other options, the values `"always"` and `"never"` will be converted to `false` and `true` respectively.|
|`zIndexNormalize`|Not applicable|

## Release notes

See https://github.com/ThisIsManta/stylus-supremacy/releases

## Limitations and known issues

- Both single-line and multi-line comments may be dropped out because *Stylus* internal [parser](https://github.com/stylus/stylus/blob/master/lib/parser.js) did not play well with comments as its purpose was to create an input for CSS transpilation.  
  The original *Stylus* file:
  ```
  .class1 /* comment-1 */, .class2 /* comment-2 */ {
    display: none;
  }
  ```
  The formatted output:
  ```
  .class1, .class2 { /* comment-2 */
    display: none;
  }
  ```
  You can see that `/* comment-1 */` is missing in the output.
