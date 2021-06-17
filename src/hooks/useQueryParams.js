import { useLocation } from "react-router-dom";

/**
 * @description It's a hook to retrieve the query params of an URL.
 * @returns string with query params in the path.
 */
const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
}

export default useQueryParams;