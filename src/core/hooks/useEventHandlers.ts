import { useMemo, SyntheticEvent } from 'react';

const serialize = (() => {
  const replacer = (key: string, value: any) => (typeof value === 'function' ? value.toString() : value);
  return (value: any) => JSON.stringify(value, replacer);
})();

function useEventHandlers(events: any) {
  const dict: any = {
    click: 'onClick',
    mouseover: 'onMouseOver',
    mouseout: 'onMouseOut',
  };
  const eventsHash = serialize(events);

  // console.log(events);

  const eventHandlers = useMemo(() => {
    const entries = (target: any) => {
      return Object.keys(target).map((k) => {
        return [k, target[k]];
      });
    };

    // props.events
    // console.log('%c-=-=-=-=-=-=-=-=-', 'background:orange');
    // console.log();

    // console.log();

    const getAttrFromClosest = (source: any, attrName: string) => {
      const target = source.getAttribute(attrName) ? source : source.closest(`[${attrName}]`);
      if (target) {
        return target.getAttribute(attrName);
      }
      return null;
    };

    const getEventTarget = (source: any, selector: string) => {
      const target = source.matches(selector) ? source : source.closest(selector);

      if (target) {
        let year = ~~getAttrFromClosest(target, 'data-year');
        let month = ~~getAttrFromClosest(target, 'data-month');
        let day = ~~getAttrFromClosest(target, 'data-day');

        if (day) {
          const date = new Date(year, month, day);

          // console.log(date);

          return {
            target,
            date,
          };
        }

        return { target };

        // // console.log(year, month, day);

        // let rowIndex = getAttrFromClosest(target, 'data-row-index');
        // let columnIndex = getAttrFromClosest(target, 'data-column-index');

        // if (rowIndex && columnIndex) {
        //   rowIndex = ~~rowIndex;
        //   columnIndex = ~~columnIndex;
        //   const row = rows[rowIndex].org;
        //   return {
        //     target,
        //     rowIndex,
        //     columnIndex,
        //     data: row,
        //     // data: rows[row]
        //   };
        // }
      }
      // if (target) {
      //   return target;
      //   // return target.matches(selector);
      // }
      return null;
    };

    const handlerFactory = (details: any) => {
      const handles = entries(details).map(([selector, handler]) => {
        return {
          selector,
          handler,
        };
      });

      return (event: SyntheticEvent) => {
        // console.log(event.target);
        // console.log(handles);
        handles.forEach((e) => {
          const target = getEventTarget(event.target, e.selector);
          if (target) {
            e.handler(event, target);
          }

          // console.log(target);
        });
      };
    };

    let allEvts = entries(events).reduce((accum, [eventName, details]) => {
      const handlerName = dict[eventName.toLowerCase()];
      if (handlerName) {
        return {
          ...accum,
          [handlerName]: handlerFactory(details),
        };
      }
      return accum;
    }, {});
    return allEvts;
  }, [eventsHash]);

  return eventHandlers;
}

export default useEventHandlers;
