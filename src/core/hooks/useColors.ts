import { useMemo } from 'react';
import colors from '../constants/colors';

function useColors(props) {
  return useMemo(() => {
    return {
      ...colors,
    };
  }, []);
}

export default useColors;
