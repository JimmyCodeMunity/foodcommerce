import axios from "axios";
import { push } from "react-router-redux";
import authToken from "./AuthSession.js";
class ApiClient {
  constructor() {
    this.client = this.getInstance();
  }

  getClient() {
    return this.client;
  }
  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  getInstance() {
    // Request interceptor for API calls
    const client = axios.create({ baseURL: process.env.REACT_APP_API_URL });
    client.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem("tokenDataAuth")}`,
          Accept: "application/json",
          "Device-Data": authToken.getDeviceInfo(),
          "Content-Type": "application/json",
        };
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );
    // Response interceptor for API calls
    client.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (
          error.config &&
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.isRefreshing
        ) {
          originalRequest._retry = true;
          originalRequest.isRefreshing = true;
          return client
            .post("auth/account/token/refresh")
            .then((response) => {
              localStorage.clear();
              localStorage.setItem("tokenDataAuth", response.data.data.token);
              localStorage.setItem("userIsLoggedIn", true);
              localStorage.setItem(
                "userData",
                JSON.stringify(response.data.data)
              );
              originalRequest.headers["Authorization"] =
                "Bearer " + localStorage.getItem("tokenDataAuth");
              originalRequest.isRefreshing = false;
              return client.request(originalRequest);
            })
            .catch(function (error) {
              localStorage.clear();
              push("/auth/login");
            });
        }
        return Promise.reject(error);
      }
    );
    return client;
  }
}

export let apiClient = new ApiClient();

class ApiAdmin {
  constructor() {
    this.client = this.getInstance();
  }

  getClient() {
    return this.client;
  }
  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  getInstance() {
    // Request interceptor for API calls
    const client = axios.create({ baseURL: process.env.REACT_APP_ADMIN_URL });
    client.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem("tokenDataAuth")}`,
          Accept: "application/json",
          "Device-Data": authToken.getDeviceInfo(),
          "Content-Type": "application/json",
        };
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );
    // Response interceptor for API calls
    client.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (
          error.config &&
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.isRefreshing
        ) {
          originalRequest._retry = true;
          originalRequest.isRefreshing = true;
          return client
            .post("auth/account/token/refresh")
            .then((response) => {
              localStorage.clear();
              localStorage.setItem("tokenDataAuth", response.data.data.token);
              localStorage.setItem("userIsLoggedIn", true);
              localStorage.setItem(
                "userData",
                JSON.stringify(response.data.data)
              );
              originalRequest.headers["Authorization"] =
                "Bearer " + localStorage.getItem("tokenDataAuth");
              originalRequest.isRefreshing = false;
              return client.request(originalRequest);
            })
            .catch(function (error) {
              localStorage.clear();
              push("/authlogin");
            });
        }
        return Promise.reject(error);
      }
    );
    return client;
  }
}

export let apiAdmin = new ApiAdmin();


class ApiDriver {
  constructor() {
    this.client = this.getInstance();
  }

  getClient() {
    return this.client;
  }
  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  getInstance() {
    // Request interceptor for API calls
    const client = axios.create({ baseURL: process.env.REACT_APP_DRIVER_URL });
    client.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem("tokenDataAuth")}`,
          Accept: "application/json",
          "Device-Data": authToken.getDeviceInfo(),
          "Content-Type": "application/json",
        };
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );
    // Response interceptor for API calls
    client.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (
          error.config &&
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.isRefreshing
        ) {
          originalRequest._retry = true;
          originalRequest.isRefreshing = true;
          return client
            .post("auth/account/token/refresh")
            .then((response) => {
              localStorage.clear();
              localStorage.setItem("tokenDataAuth", response.data.data.token);
              localStorage.setItem("userIsLoggedIn", true);
              localStorage.setItem(
                "userData",
                JSON.stringify(response.data.data)
              );
              originalRequest.headers["Authorization"] =
                "Bearer " + localStorage.getItem("tokenDataAuth");
              originalRequest.isRefreshing = false;
              return client.request(originalRequest);
            })
            .catch(function (error) {
              localStorage.clear();
              push("/driveradmin/login");
            });
        }
        return Promise.reject(error);
      }
    );
    return client;
  }
}

export let apiDriver = new ApiDriver();

class ApiRider {
  constructor() {
    this.client = this.getInstance();
  }

  getClient() {
    return this.client;
  }
  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    if (data instanceof FormData) {
      conf.headers = {
        ...conf.headers,
        "Content-Type": "multipart/form-data",
      };
    }
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  getInstance() {
    // Request interceptor for API calls
    const client = axios.create({ baseURL: process.env.REACT_APP_RIDER_URL });
    client.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem("tokenDataAuth")}`,
          Accept: "application/json",
          "Device-Data": authToken.getDeviceInfo(),
          "Content-Type": "application/json",
        };
        return config;
      },
      (error) => {
        console.log(error);
        Promise.reject(error);
      }
    );
    // Response interceptor for API calls
    client.interceptors.response.use(
      (response) => {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (
          error.config &&
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.isRefreshing
        ) {
          originalRequest._retry = true;
          originalRequest.isRefreshing = true;
          return client
            .post("auth/account/token/refresh")
            .then((response) => {
              localStorage.clear();
              localStorage.setItem("tokenDataAuth", response.data.data.token);
              localStorage.setItem("userIsLoggedIn", true);
              localStorage.setItem(
                "userData",
                JSON.stringify(response.data.data)
              );
              originalRequest.headers["Authorization"] =
                "Bearer " + localStorage.getItem("tokenDataAuth");
              originalRequest.isRefreshing = false;
              return client.request(originalRequest);
            })
            .catch(function (error) {
              localStorage.clear();
              push("/driver/login");
            });
        }
        return Promise.reject(error);
      }
    );
    return client;
  }
}

export let apiRider = new ApiRider();