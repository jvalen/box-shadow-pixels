import { 
    getImageData,
    getImageCssClassOutput,
    getAnimationKeyframes,
    generateAnimationIntervals,
    getAnimationCssClassOutput
} from '.'

describe('getImageData', () => {
    const grid2x2 = {
        grid: ['#8bc34a', '#673ab7', '#ff5722', '#ffeb3b'],
        options: {            
            pSize: 10,
            c: 2
        }
    };
    
    it('should return a string with box-shadow like information', () => {        
        expect(getImageData(grid2x2.grid, Object.assign({format: 'string'}, grid2x2.options)))
        .toBe('10px 10px 0 0 #8bc34a, 20px 10px 0 0 #673ab7, 10px 20px 0 0 #ff5722, 20px 20px 0 0 #ffeb3b');
    });

    it('should return an array with box-shadow like information', () => {
        const grid = ['#8bc34a', '#673ab7', '#ff5722', '#ffeb3b'];
        expect(getImageData(grid2x2.grid, Object.assign({format: 'array'}, grid2x2.options)))
        .toEqual([
            {x: 10,y: 10, color: '#8bc34a', blurRadius: 0, spreadRadius: 0},
            {x: 20,y: 10, color: '#673ab7', blurRadius: 0, spreadRadius: 0},
            {x: 10,y: 20, color: '#ff5722', blurRadius: 0, spreadRadius: 0},
            {x: 20,y: 20, color: '#ffeb3b', blurRadius: 0, spreadRadius: 0},
        ]);
    });
});

describe('getImageCssClassOutput', () => {
    const grid2x2 = {
        grid: ['#8bc34a', '#673ab7', '#ff5722', '#ffeb3b'],
        options: {            
            pSize: 10,
            c: 2,
            cssClassName: 'cssClass'
        }
    };
    
    it('should return a string with a css class implementing an image', () => {
        expect(getImageCssClassOutput(grid2x2.grid, grid2x2.options))
        .toBe(`.cssClass {\n  box-shadow: 10px 10px 0 0 #8bc34a, 20px 10px 0 0 #673ab7, 10px 20px 0 0 #ff5722, 20px 20px 0 0 #ffeb3b;\n  height: 10px;\n  width: 10px;\n}`);
    });
});

describe('getAnimationKeyframes', () => {
    const frames = [
        {grid: ['#8bc34a', '#673ab7', '#ff5722', '#ffeb3b'], interval: 10},
        {grid: ['#8bc34a', '#673ab7', '#ff5722', '#ffeb3b'], interval: 70},
        {grid: ['#8bc34a', '#673ab7', '#ff5722', '#ffeb3b'], interval: 100}
    ];
    const options = {
        pSize: 10,
        c: 2,
        cssClassName: 'cssClass'
    };
    const boxShadow = '10px 10px 0 0 #8bc34a, 20px 10px 0 0 #673ab7, 10px 20px 0 0 #ff5722, 20px 20px 0 0 #ffeb3b;';
    const dimensions = 'height: 10px; width: 10px;'
    
    it('should return an object with the CSS keyframes data', () => {
        expect(getAnimationKeyframes(frames, options))
        .toEqual({
            "0%, 10%": { boxShadow: `${boxShadow}${dimensions}`},
            "10.01%, 70%": { boxShadow: `${boxShadow}${dimensions}`},
            "70.01%, 100%": { boxShadow: `${boxShadow}${dimensions}`}
        });
    });
});

describe('generateAnimationIntervals', () => {
    const frames = [{interval: 25}, {interval: 50}, {interval: 100}];
    
    it('should return an array with the intervals of the animation', () => {
        expect(generateAnimationIntervals(frames))
        .toEqual([0, 25, 50, 100]);
    });
});

describe('getAnimationCssClassOutput', () => {
    const frames = [
        {grid: ['#8bc34a', '#673ab7', '#ff5722', '#ffeb3b'], interval: 10},
        {grid: ['#8bc34a', '#673ab7', '#ff5722', '#ffeb3b'], interval: 70},
        {grid: ['#8bc34a', '#673ab7', '#ff5722', '#ffeb3b'], interval: 100}
    ];
    const options = {            
        pSize: 10,
        c: 2,
        cssClassName: 'cssClass',
        duration: 5
    }
    const boxShadow = '10px 10px 0 0 #8bc34a, 20px 10px 0 0 #673ab7, 10px 20px 0 0 #ff5722, 20px 20px 0 0 #ffeb3b;';
    const dimensions = 'height: 10px; width: 10px;'
    let result = '';
    result += `.cssClass {\n  position: absolute;\n  `;
    result += `animation: x 5s infinite;\n  `;
    result += `-webkit-animation: x 5s infinite;\n  `;
    result += `-moz-animation: x 5s infinite;\n  `;
    result += `-o-animation: x 5s infinite;\n}\n\n`;
    result += '@keyframes x {\n';
    result += `0%, 10%{\n  box-shadow: ${boxShadow}${dimensions}\n  }\n`;
    result += `10.01%, 70%{\n  box-shadow: ${boxShadow}${dimensions}\n  }\n`;
    result += `70.01%, 100%{\n  box-shadow: ${boxShadow}${dimensions}\n  }\n}`;
    
    it('should return a string with a CSS class an keyframes implementing an animation', () => {
        expect(getAnimationCssClassOutput(frames, options))
        .toBe(result);
    });
});