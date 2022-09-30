import fetch from 'unfetch';

// Method to check status code
const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

// method to retrieve all drivers
export const getAllDrivers = () =>
    fetch("api/f1/drivers")
        .then(checkStatus);