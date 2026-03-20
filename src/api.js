export const apiFetch = (url, options = {}) => {
  const auth = localStorage.getItem("auth");

  return fetch("http://localhost:8080" + url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: "Basic " + auth,
    },
  });
};