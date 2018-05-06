<p align="center">
  <a href="https://github.com/jvalen/box-shadow-pixels/blob/master/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <a href="https://www.npmjs.com/package/box-shadow-pixels"><img src="https://img.shields.io/npm/v/box-shadow-pixels.svg" alt="npm version"></a>
  <a href="https://travis-ci.com/jvalen/box-shadow-pixels"><img src="https://travis-ci.com/jvalen/box-shadow-pixels.svg?branch=master" alt="npm version"></a>  
</p>

<div align="center">
    <h1>Create <strong>box-shadow</strong> images & animations</h1>
    <img src="./images/potion.png">
</div>

# Installation

Using npm:

```bash
$ npm install box-shadow-pixels
```

# Why `box-shadow-pixels`?

`box-shadow` CSS property allow us to draw a shadow around an element. We can go further and represent an image applying colors with different coordinates...and if we decide to go even further we could create animations using `@keyframes`.

# Origins

This library has been part of the core of [pixelartcss](https://github.com/jvalen/pixel-art-react), for the sake of keeping everything more modular, this part has been extracted from the main repository. However the library is meant to be generic and useful for other projects as well.

# How to use it

The library has a simple API and every method is documented.
We basically need a grid or a collection of them together with few options such as the size of the pixel, the duration of the animation, etc. Being able to get a ready to go CSS class:

```css
.my-image-class {
  box-shadow: 70px 10px 0 0 #da9746, 80px 10px 0 0 #cf7730, 90px 10px 0 0 #cf7730, ...
  height: 10px;
  width: 10px;
}
```
or

```css
.my-animation-class {
  position: absolute;
  animation: x 1s infinite;
  -webkit-animation: x 1s infinite;
  -moz-animation: x 1s infinite;
  -o-animation: x 1s infinite;
}

@keyframes x {
0%, 25%{
  box-shadow: 5px 5px 0 0 #303f46, 10px 5px 0 0 #303f46, 15px 5px 0 0 #303f46, ...
  }
25.01%, 50%{
  box-shadow: 5px 5px 0 0 #303f46, 10px 5px 0 0 #303f46, 15px 5px 0 0 #303f46, ...
  }
50.01%, 75%{
  box-shadow: 5px 5px 0 0 #303f46, 10px 5px 0 0 #303f46, 15px 5px 0 0 #303f46, ...
  }
75.01%, 100%{
  box-shadow: 5px 5px 0 0 #303f46, 10px 5px 0 0 #303f46, 15px 5px 0 0 #303f46, ...
  }
}
``` 

# Related links

- [pixelartcss online tool](https://www.pixelartcss.com/)
- [Fun times with CSS Pixel Art](https://css-tricks.com/fun-times-css-pixel-art/)

## License

[MIT](https://opensource.org/licenses/mit-license.php)
Copyright © 2018 Javier Valencia Romero (@jvalen)