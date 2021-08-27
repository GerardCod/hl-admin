import { useCallback } from "react";
import { useLocation } from "react-router-dom";

/**
 * @description It's a hook to retrieve the query params of an URL.
 * @returns string with query params in the path.
 */
const useQueryParams = () => {
  const location = useLocation();

  const getParams = useCallback(() => {
    function getCurrentLocation() { 
      return ({search}) => new URLSearchParams(search);
    }

    return getCurrentLocation()(location);
  }, [location]);

  return getParams;
}

export default useQueryParams;