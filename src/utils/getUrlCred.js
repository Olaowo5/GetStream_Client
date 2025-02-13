export const getURLCredentials = () => {
    if (typeof window !== 'undefined') {
      return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, property) => searchParams.get(property)
      });
    } else {
      return {};
    }
  };