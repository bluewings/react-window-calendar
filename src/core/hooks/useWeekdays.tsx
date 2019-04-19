import * as React from 'react';
import { useMemo } from 'react';

function useWeekdays({ shortDays }) {
  return useMemo(() => {
    return (
      <ul>
        {shortDays.map((e) => (
          <li>{e}</li>
        ))}
      </ul>
    );
  }, [shortDays]);
}

export default useWeekdays;
