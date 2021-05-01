//import config from "config";
import { authHeader } from "../helpers/auth-header";
import store from "../store";

export const userService = {
  login,
  logout,
  getAll,
};

function login(email, password) {
  console.log(email);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  console.log(requestOptions);
  return fetch(
    `https://jupiter.d.greeninvoice.co.il/api/v1/account/login`,
    requestOptions
  )
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(email + ":" + password);
      }

      return user;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("__user");
  localStorage.removeItem("user_token");
  return Promise.resolve(true);
}

function getAll() {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };

  return fetch(
    `https://jupiter.d.greeninvoice.co.il/api/v1/account/login`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        store.dispatch("logout");
        //location.reload(true);
      }

      const error = (data && data.errorMessage) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
