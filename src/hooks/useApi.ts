
export const useApi = <T>(apiCall: () => Promise<T>) => {
  return {
    data: null,
    loading: false,
    error: null,
    refetch: () => {},
  };
};
