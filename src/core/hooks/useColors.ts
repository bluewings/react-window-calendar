import { useMemo } from 'react';
import colors from '../constants/colors';

function useColors() {
  return useMemo(() => {
    return {
      ...colors,
    };
  }, []);
}

export default useColors;
