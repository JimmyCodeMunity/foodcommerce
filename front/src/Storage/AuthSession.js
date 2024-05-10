import * as rdd from "react-device-detect";
const AuthSession= {
  isTokenValid: () => {
    let dateTime = Math.floor(Date.now() / 1000);
    const storedData = localStorage.getItem("userData");
    const dataStore = JSON.parse(storedData);
    if (!dataStore) {
      localStorage.clear();
      return false;
    }
    let expDate = parseInt(dataStore.expires_in) + parseInt(dataStore.time);
    return dateTime < expDate;
  },
 

  getDeviceInfo() {
    let device = {};
    device["device_name"] = rdd.osName;
    device["device_serial"] = rdd.osVersion;
    device["app_version_name"] = rdd.browserName;
    device["app_version_code"] = "2";
    device["device_imei"] = "0000000";
    device["device_type"] = rdd.isMobile ? "mobile" : "desktop";
    return JSON.stringify(device);
  },

  saveSession: (response) => {
    localStorage.setItem("tokenDataAuth", response.data.data.token);
    localStorage.setItem("userIsLoggedIn", true);
    localStorage.setItem("userData", JSON.stringify(response.data));
  },
  isLoggedIn: () => {
    return localStorage.getItem("userIsLoggedIn");
  },
  getToken: () => {
    return localStorage.getItem("tokenDataAuth");
  },
  saveToken: (token) => {
    localStorage.setItem("tokenDataAuth", token);
  },
  getCountry: () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      return userData.data.user.country;
    } else {
      return null;
    }
  },
  logOut: () => {
    localStorage.clear();
  },
  
};
export default AuthSession