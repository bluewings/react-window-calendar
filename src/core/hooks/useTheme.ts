import { useMemo } from 'react';
import { css } from 'emotion';
import { ClassNames } from './useClassNames';

export type ThemeFunction = (classNames: ClassNames) => StringAnyMap;

function defaultTheme(_: ClassNames, { weekdaysHeight, weekHeight, clientWidth, gutter, direction }) {
  const paddingH = (direction === 'horizontal' ? gutter : 0) / 2;

  const titlePadH = ~~((clientWidth / 7 - 16) / 2) || 0;
  return css({
    position: 'relative',
    boxSizing: 'border-box',
    fontSize: 14,
    '*': {
      boxSizing: 'border-box',
    },
    [_.HORIZONTAL]: {
      [_.MONTH_TITLE]: {
        // background: 'blue'
        textAlign: 'center',
      },
      // [_.MONTH]: {
      //   background: 'yellow'
      // }
    },
    [_.VERTICAL]: {
      // [_.MONTH]: {
      //   background: 'orange'
      // }
    },
    [_.WEEKDAYS]: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: 0,
      padding: 0,
      height: weekdaysHeight,

      borderBottom: '1px solid silver',
      '>li': {
        display: 'flex',
        flexBasis: 0,
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        listStyle: 'none',
        textAlign: 'center',
        height: weekdaysHeight,
      },
    },
    [_.MONTH_TITLE]: {
      // background: 'yellow',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      height: weekHeight,
      pointerEvents: 'none',
      fontWeight: 700,
      fontSize: 14,
      opacity: clientWidth ? 1 : 0,
      paddingLeft: titlePadH,
      paddingRight: titlePadH,
    },
    [_.MONTH_OVERLAY]: {
      display: 'flex',
      // background: 'yellow',
      // border: '1px solid black',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'absolute',
      // width: '100%',
      width: clientWidth,
      textAlign: 'center',
      top: weekdaysHeight,
      height: weekHeight * 2,
      // MONTH_OVERLAY
      transition: 'opacity 0.5s linear',
      pointerEvents: 'none',
      div: {
        display: 'flex',
        flexBasis: 0,
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      },

      // zIndex: 1000
      // border: '5px solid red',
    },
    [_.MONTH]: {
      // border: '5px solid red',

      paddingLeft: paddingH,
      paddingRight: paddingH,
    },
    [_.WEEK]: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: 0,
      padding: 0,
      height: weekHeight,
      // height: weekdaysHeight,
    },
    [_.DAY]: {
      display: 'flex',
      flexBasis: 0,
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      listStyle: 'none',
      textAlign: 'center',
    },
    [_.DAY_DISABLED]: {
      background: '#eee',
    },
    [_.DAY_TODAY]: {
      background: 'lightyellow',
    },
    [_.DAY_SELECTED]: {
      background: 'lime',
    },
    [_.WEEKDAY_SUN]: { color: 'red' },
    // [_.WEEKDAY_MON]: { color: 'orange' },
    // [_.WEEKDAY_TUE]: { color: 'yellow' },
    // [_.WEEKDAY_WED]: { color: 'green' },
    // [_.WEEKDAY_THU]: { color: 'blue' },
    // [_.WEEKDAY_FRI]: { color: 'pulple' },
    // [_.WEEKDAY_SAT]: { color: 'black' },

    // [_.WEEKDAYS]: {
    //   boxSizing: 'border-box',
    //   overflow: 'hidden',
    //   background: '#fff',
    // },
    // [_.MONTH]: {
    //   height: 5,
    //   background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
    // },
    // [_.WEEK]: {
    //   height: 5,
    //   background: 'linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
    // },
    // [_.DAY]: {
    //   width: 5,
    //   background: 'linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
    // },
    // [_.CALENDAR]: {
    //   width: 5,
    //   background: 'linear-gradient(to left, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
    // },
    // [_.SCROLL_TOP]: {
    //   [_.MONTH]: { opacity: 0 },
    // },
    // [_.SCROLL_BOTTOM]: {
    //   [_.WEEK]: { opacity: 0 },
    // },
    // [_.SCROLL_LEFT]: {
    //   [_.DAY]: { opacity: 0 },
    // },
    // [_.SCROLL_RIGHT]: {
    //   [_.CALENDAR]: { opacity: 0 },
    // },
  });
}

function useTheme(theme: ThemeFunction | undefined, classNames: ClassNames, styleProps: any) {
  const dotClassNames: any = useMemo(
    () => Object.keys(classNames).reduce((accum, key) => ({ ...accum, [key]: `.${classNames[key]}` }), {}),
    [classNames],
  );

  return useMemo(
    () =>
      [defaultTheme(dotClassNames, styleProps), theme && css(theme(dotClassNames, styleProps))]
        .filter((e) => e)
        .join(' '),
    [theme, dotClassNames, JSON.stringify(styleProps)],
  );
}

export default useTheme;
