/*
|-------------------------------------------------------------------------------
| Colors                                    https://tailwindcss.com/docs/colors
|-------------------------------------------------------------------------------
|
| Here you can specify the colors used in your project. To get you started,
| we've provided a generous palette of great looking colors that are perfect
| for prototyping, but don't hesitate to change them for your project. You
| own these colors, nothing will break if you change everything about them.
|
| We've used literal color names ("red", "blue", etc.) for the default
| palette, but if you'd rather use functional names like "primary" and
| "secondary", or even a numeric scale like "100" and "200", go for it.
|
*/

// const colors: any = {
//   'transparent': 'transparent',

//   'black': '#22292f',
//   'grey-darkest': '#3d4852',
//   'grey-darker': '#606f7b',
//   'grey-dark': '#8795a1',
//   'grey': '#b8c2cc',
//   'grey-light': '#dae1e7',
//   'grey-lighter': '#f1f5f8',
//   'grey-lightest': '#f8fafc',
//   'white': '#ffffff',

//   'red-darkest': '#3b0d0c',
//   'red-darker': '#621b18',
//   'red-dark': '#cc1f1a',
//   'red': '#e3342f',
//   'red-light': '#ef5753',
//   'red-lighter': '#f9acaa',
//   'red-lightest': '#fcebea',

//   'orange-darkest': '#462a16',
//   'orange-darker': '#613b1f',
//   'orange-dark': '#de751f',
//   'orange': '#f6993f',
//   'orange-light': '#faad63',
//   'orange-lighter': '#fcd9b6',
//   'orange-lightest': '#fff5eb',

//   'yellow-darkest': '#453411',
//   'yellow-darker': '#684f1d',
//   'yellow-dark': '#f2d024',
//   'yellow': '#ffed4a',
//   'yellow-light': '#fff382',
//   'yellow-lighter': '#fff9c2',
//   'yellow-lightest': '#fcfbeb',

//   'green-darkest': '#0f2f21',
//   'green-darker': '#1a4731',
//   'green-dark': '#1f9d55',
//   'green': '#38c172',
//   'green-light': '#51d88a',
//   'green-lighter': '#a2f5bf',
//   'green-lightest': '#e3fcec',

//   'teal-darkest': '#0d3331',
//   'teal-darker': '#20504f',
//   'teal-dark': '#38a89d',
//   'teal': '#4dc0b5',
//   'teal-light': '#64d5ca',
//   'teal-lighter': '#a0f0ed',
//   'teal-lightest': '#e8fffe',

//   'blue-darkest': '#12283a',
//   'blue-darker': '#1c3d5a',
//   'blue-dark': '#2779bd',
//   'blue': '#3490dc',
//   'blue-light': '#6cb2eb',
//   'blue-lighter': '#bcdefa',
//   'blue-lightest': '#eff8ff',

//   'indigo-darkest': '#191e38',
//   'indigo-darker': '#2f365f',
//   'indigo-dark': '#5661b3',
//   'indigo': '#6574cd',
//   'indigo-light': '#7886d7',
//   'indigo-lighter': '#b2b7ff',
//   'indigo-lightest': '#e6e8ff',

//   'purple-darkest': '#21183c',
//   'purple-darker': '#382b5f',
//   'purple-dark': '#794acf',
//   'purple': '#9561e2',
//   'purple-light': '#a779e9',
//   'purple-lighter': '#d6bbfc',
//   'purple-lightest': '#f3ebff',

//   'pink-darkest': '#451225',
//   'pink-darker': '#6f213f',
//   'pink-dark': '#eb5286',
//   'pink': '#f66d9b',
//   'pink-light': '#fa7ea8',
//   'pink-lighter': '#ffbbca',
//   'pink-lightest': '#ffebef',
// }

// const depths = [
//   'base',
//   ...Object.keys(colors)
//     .map((e) => e.split('-')[1])
//     .filter((e, i, arr) => arr.indexOf(e) === i),
// ];

// Object.keys(colors)
//   .map((e) => e.split('-'))
//   .filter((e) => e.length > 1)
//   .map((e) => e[0])
//   .filter((e, i, arr) => arr.indexOf(e) === i)
//   .reduce(
//     (accum1, color) => ({ ...accum1, [color]: { ...depths.reduce((accum2, depth) => ({ ...accum2, [depth]: depth === 'base' ? colors[color] : colors[`${color}-${depth}`] }), {}) } }),
//     {},
//   );

const _colors = {
  grey: {
    base: '#b8c2cc',
    darkest: '#3d4852',
    darker: '#606f7b',
    dark: '#8795a1',
    light: '#dae1e7',
    lighter: '#f1f5f8',
    lightest: '#f8fafc',
  },
  red: {
    base: '#e3342f',
    darkest: '#3b0d0c',
    darker: '#621b18',
    dark: '#cc1f1a',
    light: '#ef5753',
    lighter: '#f9acaa',
    lightest: '#fcebea',
  },
  orange: {
    base: '#f6993f',
    darkest: '#462a16',
    darker: '#613b1f',
    dark: '#de751f',
    light: '#faad63',
    lighter: '#fcd9b6',
    lightest: '#fff5eb',
  },
  yellow: {
    base: '#ffed4a',
    darkest: '#453411',
    darker: '#684f1d',
    dark: '#f2d024',
    light: '#fff382',
    lighter: '#fff9c2',
    lightest: '#fcfbeb',
  },
  green: {
    base: '#38c172',
    darkest: '#0f2f21',
    darker: '#1a4731',
    dark: '#1f9d55',
    light: '#51d88a',
    lighter: '#a2f5bf',
    lightest: '#e3fcec',
  },
  teal: {
    base: '#4dc0b5',
    darkest: '#0d3331',
    darker: '#20504f',
    dark: '#38a89d',
    light: '#64d5ca',
    lighter: '#a0f0ed',
    lightest: '#e8fffe',
  },
  blue: {
    base: '#3490dc',
    darkest: '#12283a',
    darker: '#1c3d5a',
    dark: '#2779bd',
    light: '#6cb2eb',
    lighter: '#bcdefa',
    lightest: '#eff8ff',
  },
  indigo: {
    base: '#6574cd',
    darkest: '#191e38',
    darker: '#2f365f',
    dark: '#5661b3',
    light: '#7886d7',
    lighter: '#b2b7ff',
    lightest: '#e6e8ff',
  },
  purple: {
    base: '#9561e2',
    darkest: '#21183c',
    darker: '#382b5f',
    dark: '#794acf',
    light: '#a779e9',
    lighter: '#d6bbfc',
    lightest: '#f3ebff',
  },
  pink: {
    base: '#f66d9b',
    darkest: '#451225',
    darker: '#6f213f',
    dark: '#eb5286',
    light: '#fa7ea8',
    lighter: '#ffbbca',
    lightest: '#ffebef',
  },
};

export default _colors;
