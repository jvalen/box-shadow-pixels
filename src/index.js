/**
 * Returns a box-shadow image representation
 * @param  {String[]} grid - grid containing pixel colors
 * @param  {Object} opt - animation options
 * @param  {number} opt.c - columns grid count
 * @param  {number} opt.pSize - pixel size
 * @param  {number} [opt.format] - output format
 * @param  {boolean} [opt.blurRadius] - border radius value
 * @param  {boolean} [opt.spreadRadius] - spread radius value
 * @returns {string}
 * @example
 * 
 * getImageData(["#4caf50", "#4caf50"], {pSize: 10, c: 2, format: "array"})
 * // => [{x: 10, y: 10, "#4caf50"}, {x: 20, y: 10, "#4caf50"}]
 * 
 * getImageData(["#4caf50", "#4caf50"], {pSize: 10, c: 2, format: "string"})
 * // => "10px 10px #4caf50, 20px 10px #4caf50;"
 */
export const getImageData = (grid, opt) => {
  const xCoord = (i) => ((i % opt.c) * opt.pSize) + opt.pSize;
  const yCoord = (i) => (parseInt(i / opt.c, 10) * opt.pSize) + opt.pSize;
  const blurRadius = opt.blurRadius ? `${opt.blurRadius}px` : 0;
  const spreadRadius = opt.spreadRadius ? `${opt.spreadRadius}px` : 0;

  switch (opt.format) {
    case 'array': {
      return grid.reduce((bsArray, color, i) => {
        if (color !== '') {          
          bsArray.push({
            x: xCoord(i),
            y: yCoord(i),
            color,
            blurRadius,
            spreadRadius
          });
        }
        return bsArray;
      }, []);
    }
    default: {
      return grid.reduce((bsString, color, i) => {
        if (color !== '') {
          return `${bsString} ${xCoord(i)}px ${yCoord(i)}px ${blurRadius} ${spreadRadius} ${color},`;
        }
        return bsString;
      }, '').slice(1, -1);
    }
  }
}

/**
 * Returns a css class that implements a box-shadow image
 * @param  {String[]} grid - grid containing pixel colors
 * @param  {Object} opt - animation options
 * @param  {number} opt.c - columns grid count
 * @param  {number} opt.pSize - pixel size
 * @param  {number} opt.cssClassName - class name
 * @returns {string}
 * @example
 * 
 * getImageCssClassOutput(grid, opt)
 * // =>
 * ".custom-class-name {
 *   box-shadow:  10px 10px 0 #4caf50, 20px 10px 0 #4caf50;
 *   height: 10px;
 *   width: 10px;
 * }"
 */
export const getImageCssClassOutput = (grid, opt) => {
  let boxShadowData = getImageData(grid, opt);
  return `.${opt.cssClassName} {\n  box-shadow: ${boxShadowData};\n  height: ${opt.pSize}px;\n  width: ${opt.pSize}px;\n}`;
}

/**
 * Return CSS keyframes animation data
 * @param  {Object[]} frames - frames iterable collection
 * @param  {String[]} frames[].grid - grid containing pixel colors
 * @param  {number} frames.interval - percentage where the frame ends 
 * @param  {Object} opt - animation options
 * @param  {number} opt.c - columns grid count
 * @param  {number} opt.pSize - pixel size
 * @returns {Object}
 * @example
 * 
 * getAnimationKeyframes(frames, opt)
 * // =>
 *  "{
 *    0%, 25%: { box-shadow: ...}
 *    25.01%, 50%: { box-shadow: ...}
 *    50.01%, 75%: { box-shadow: ...}
 *    75.01%, 100%: { box-shadow: ...}
 *  }"
 */
export const getAnimationKeyframes = (frames, opt) => {
  const intervalData = generateAnimationIntervals(frames);
  const result = frames.reduce((acc, frame, index) => {
    const intervalAcc = acc;
    try {
      const grid = frame.grid || frame.get('grid') || 0;
      if (grid) {
        const currentBoxShadow = getImageData(grid, {
          pSize: opt.pSize,
          c: opt.c
        });
        const minValue = index === 0 ? 0 : intervalData[index] + 0.01;
        const maxValue = intervalData[index + 1];
        intervalAcc[`${minValue}%, ${maxValue}%`] = {
          boxShadow: `${currentBoxShadow};height: ${opt.pSize}px; width: ${opt.pSize}px;`
        };
      }
    } catch (error) {
      console.error(`Input data error: Each frame object must contain a grid value`);
    }
    return intervalAcc;
  }, {});

  return result;  
}

/**
 * Returns the intervals of an animation
 * @param  {Object[]} frames - frames iterable collection
 * @param  {String[]} frames[].grid - grid containing pixel colors
 * @param  {number} frames.interval - percentage where the frame ends 
 * @returns {number[]}
 * @example
 * 
 *  generateAnimationIntervals([{interval: 25}, {interval: 50}, {interval: 100}])
 *  // => [0, 25, 50, 100]
 */
export const generateAnimationIntervals = (frames) => {
  return frames.reduce((acc, frame) => {
    try {
      const interval = frame.interval || frame.get('interval') || 0;
      acc.push(parseFloat(interval));
    } catch(e) {
      console.error(`Input data error: Each frame object must contain an interval value`);
    };    
    return acc;
  }, [0]);
}

/**
 * Returns a css class and keyframes that implements an animation
 * @param  {Object[]} frames - frames iterable collection
 * @param  {String[]} frames[].grid - grid containing pixel colors
 * @param  {number} frames.interval - percentage where the frame ends
 * @param  {Object} opt - animation options
 * @param  {number} opt.c - columns number in the frame
 * @param  {number} opt.pSize - pixel size
 * @param  {number} opt.duration - animation duration
 * @param  {number} opt.cssClassName - class name
 * @returns {string}
 * @example
 * 
 * getAnimationCssClassOutput(frames, opt)
 * // => 
 *  .custom-class-name {
 *    position: absolute;
 *    animation: x 1s infinite;
 *    ...
 *  }
 *  @keyframes x {
 *    0%, 25%: { box-shadow: ...}
 *    25.01%, 50%: { box-shadow: ...}
 *    50.01%, 75%: { box-shadow: ...}
 *    75.01%, 100%: { box-shadow: ...}
 *  }
 */
export const getAnimationCssClassOutput = (frames, opt) => {
  const keyframes = getAnimationKeyframes(frames, opt);
  let result = '';
  result += `.${opt.cssClassName} {\n  position: absolute;\n  `;
  result += `animation: x ${opt.duration}s infinite;\n  `;
  result += `-webkit-animation: x ${opt.duration}s infinite;\n  `;
  result += `-moz-animation: x ${opt.duration}s infinite;\n  `;
  result += `-o-animation: x ${opt.duration}s infinite;\n}\n\n`;
  result += '@keyframes x {\n';
  for (const key in keyframes) {
    if (Object.prototype.hasOwnProperty.call(keyframes, key)) {
      const { boxShadow } = keyframes[key];
      result += `${key}{\n  box-shadow: ${boxShadow}\n  }\n`;
    }
  }
  result += '}';

  return result;
}