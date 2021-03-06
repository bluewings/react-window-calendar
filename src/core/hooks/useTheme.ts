import { useMemo } from 'react';
import { css } from 'emotion';
import { ClassNames } from './useClassNames';
import useColors from './useColors';

export type ThemeFunction = (classNames: ClassNames, colors: any, styleProps: any) => StringAnyMap;

function defaultTheme(
  _: ClassNames,
  colors: any,
  {
    weekdaysHeight,
    weekHeight,
    clientWidth,
    gutter,
    direction,
  }: {
    weekdaysHeight: any;
    weekHeight: any;
    clientWidth: any;
    gutter: any;
    direction: any;
  },
) {
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
    // [_.DAY]: {
    //   background: 'yellow'
    // },
    [_.CELL]: {
      display: 'flex',
      flexBasis: 0,
      flexGrow: 1,
      justifyContent: 'center',
      flexDirection: 'column',
      listStyle: 'none',
      // textAlign: 'center',
      '>div': {
        // position: 'relative',
        display: 'flex',
        alignSelf: 'center',
        // textAlign: 'center',
        justifyContent: 'center',
        width: '100%',
        // width: weekHeight - 8,
        height: weekHeight - 4,
        // borderRadius: '50%',
        // background: 'yellow',
        // '&::after': {
        //   content: '""',
        //   // background: 'yellow',
        // },
      },
    },
    [_.DAY_ENABLED]: {
      // background: 'lightblue',
      cursor: 'pointer',

      // background: 'lightblue',
      // background: colors.blue.base,
      '&:hover': {
        '>div': {
          // background: 'lime',
          background: colors.blue.base,
          color: '#fff',
        },
        // },
      },
    },
    [_.DAY_DISABLED]: {
      // background: '#eee',
      opacity: 0.35,
    },
    [_.DAY_TODAY]: {
      // background: 'lightyellow',
      '>div': {
        background: colors.grey.light,
      },
    },
    [_.DAY_SELECTED]: {
      '>div': {
        // background: 'lime',
        background: colors.blue.lighter,
      },
    },
    [_.DAY_SELECTED_START]: {
      '>div': {
        // background: 'red',
        background: colors.blue.base,
        color: '#fff',
      },
    },
    [_.DAY_SELECTED_END]: {
      '>div': {
        background: colors.blue.base,
        color: '#fff',
      },
    },
    [_.WEEKDAY_SUN]: {
      color: colors.red.base,
    },
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

  const colors = useColors();

  return useMemo(
    () =>
      [defaultTheme(dotClassNames, colors, styleProps), theme && css(theme(dotClassNames, colors, styleProps))]
        .filter((e) => e)
        .join(' '),
    [theme, dotClassNames, colors, JSON.stringify(styleProps)],
  );
}

export default useTheme;
