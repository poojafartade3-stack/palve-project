export const saveAuth = (data, remember) => {
  if (remember) {
    localStorage.setItem("auth", JSON.stringify(data));
  } else {
    sessionStorage.setItem("auth", JSON.stringify(data));
  }
};

export const getAuth = () => {
  return (
    JSON.parse(localStorage.getItem("auth")) ||
    JSON.parse(sessionStorage.getItem("auth"))
  );
};

export const logout = () => {
  localStorage.removeItem("auth");
  sessionStorage.removeItem("auth");
};
