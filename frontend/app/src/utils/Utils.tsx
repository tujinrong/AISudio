import { useCallback } from "react";

export const useLabelLookup = () => {
    const getLabel = useCallback(
      (key: string | number, list: any[], keyName = 'id', valueName = 'name') => {
        const item = list.find(item => item[keyName] === key);
        return item ? item[valueName] : '';
      },
      []
    );
  
    return { getLabel };
  };
  