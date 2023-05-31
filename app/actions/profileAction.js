import {
    GET_PROFILE_BASIC_API,
    GET_PROFILE_CLINIC_API,
    GET_PROFILE_EDUCATION_API,
    GET_PROFILE_EXPERIENCE_API,
    GET_PROFILE_REGISTRATION_API
} from "../constants/api";
import config from "../config/config";
import {
  GET_PROFILE_ADDRESS_ERROR,
  GET_PROFILE_ADDRESS_LOADING,
  GET_PROFILE_ADDRESS_SUCCESS,
  GET_PROFILE_BASIC_ERROR,
  GET_PROFILE_BASIC_LOADING,
  GET_PROFILE_BASIC_SUCCESS,
  GET_PROFILE_EDUCATION_ERROR,
  GET_PROFILE_EDUCATION_LOADING,
  GET_PROFILE_EDUCATION_SUCCESS,
  GET_PROFILE_EXPERIENCE_ERROR,
  GET_PROFILE_EXPERIENCE_LOADING,
  GET_PROFILE_EXPERIENCE_SUCCESS,
  GET_PROFILE_REGISTRATION_ERROR,
  GET_PROFILE_REGISTRATION_LOADING,
  GET_PROFILE_REGISTRATION_SUCCESS,
} from "../types/profileTypes";
// import { AUTHENTICATION_ERROR } from "../types/commonTypes";

let backendUrl = config.backendUrl;

export const getProfileBasic = (token) => {
    return (dispatch) => {
        dispatch({ type: GET_PROFILE_BASIC_LOADING });
        let newUrl = GET_PROFILE_BASIC_API;

        fetch(backendUrl + newUrl, {
            headers: {
                Accept        : "application/json",
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) =>
                res.json().then((data) => {
                    if (res.status === 200) {
                        dispatch({
                            message: data.message,
                            payload: data,
                            type   : GET_PROFILE_BASIC_SUCCESS,
                        });
                    } else if (res.status === 403 || res.status === 401) {
                        // dispatch({ type: "AUTHENTICATION_ERROR" });
                    } else {
                        dispatch({
                            message: data.message,
                            type   : GET_PROFILE_BASIC_ERROR,
                        });
                    }
                })
            )
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);

                dispatch({
                    message: "Internal Error",
                    type   : GET_PROFILE_BASIC_ERROR,
                });
            });
    };
};

export const getProfileRegistration = (token) => {
    return (dispatch) => {
        dispatch({ type: GET_PROFILE_REGISTRATION_LOADING });
        let newUrl = GET_PROFILE_REGISTRATION_API;

        fetch(backendUrl + newUrl, {
            headers: {
                Accept        : "application/json",
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) =>
                res.json().then((data) => {
                    if (res.status === 200) {
                        dispatch({
                            message: data.message,
                            payload: data,
                            type   : GET_PROFILE_REGISTRATION_SUCCESS,
                        });
                    } else if (res.status === 403 || res.status === 401) {
                        // dispatch({ type: "AUTHENTICATION_ERROR" });
                    } else {
                        dispatch({
                            message: data.message,
                            type   : GET_PROFILE_REGISTRATION_ERROR,
                        });
                    }
                })
            )
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);

                dispatch({
                    message: "Internal Error",
                    type   : GET_PROFILE_REGISTRATION_ERROR,
                });
            });
    };
};

export const getProfileAddress = (token) => {
    return (dispatch) => {
        dispatch({ type: GET_PROFILE_ADDRESS_LOADING });
        let newUrl = GET_PROFILE_CLINIC_API;

        fetch(backendUrl + newUrl, {
            headers: {
                Accept        : "application/json",
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) =>
                res.json().then((data) => {
                    if (res.status === 200) {
                        dispatch({
                            message: data.message,
                            payload: data,
                            type   : GET_PROFILE_ADDRESS_SUCCESS,
                        });
                    } else if (res.status === 403 || res.status === 401) {
                        // dispatch({ type: "AUTHENTICATION_ERROR" });
                    } else {
                        dispatch({
                            message: data.message,
                            type   : GET_PROFILE_ADDRESS_ERROR,
                        });
                    }
                })
            )
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);

                dispatch({
                    message: "Internal Error",
                    type   : GET_PROFILE_ADDRESS_ERROR,
                });
            });
    };
};

export const getProfileEducation = (token) => {
    return (dispatch) => {
        dispatch({ type: GET_PROFILE_EDUCATION_LOADING });
        let newUrl = GET_PROFILE_EDUCATION_API;

        fetch(backendUrl + newUrl, {
            headers: {
                Accept        : "application/json",
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) =>
                res.json().then((data) => {
                    if (res.status === 200) {
                        dispatch({
                            message: data.message,
                            payload: data,
                            type   : GET_PROFILE_EDUCATION_SUCCESS,
                        });
                    } else if (res.status === 403 || res.status === 401) {
                        // dispatch({ type: "AUTHENTICATION_ERROR" });
                    } else {
                        dispatch({
                            message: data.message,
                            type   : GET_PROFILE_EDUCATION_ERROR,
                        });
                    }
                })
            )
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);

                dispatch({
                    message: "Internal Error",
                    type   : GET_PROFILE_EDUCATION_ERROR,
                });
            });
    };
};

export const getProfileExperience = (token) => {
    return (dispatch) => {
        dispatch({ type: GET_PROFILE_EXPERIENCE_LOADING });
        let newUrl = GET_PROFILE_EXPERIENCE_API;

        fetch(backendUrl + newUrl, {
            headers: {
                Accept        : "application/json",
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) =>
                res.json().then((data) => {
                    if (res.status === 200) {
                        dispatch({
                            message: data.message,
                            payload: data,
                            type   : GET_PROFILE_EXPERIENCE_SUCCESS,
                        });
                    } else if (res.status === 403 || res.status === 401) {
                        // dispatch({ type: "AUTHENTICATION_ERROR" });
                    } else {
                        dispatch({
                            message: data.message,
                            type   : GET_PROFILE_EXPERIENCE_ERROR,
                        });
                    }
                })
            )
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);

                dispatch({
                    message: "Internal Error",
                    type   : GET_PROFILE_EXPERIENCE_ERROR,
                });
            });
    };
};
