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

// add new driver to database
export const addNewDriver = driver =>
    fetch("api/f1/drivers", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(driver)
        }
    ).then(checkStatus);


// delete existing driver
export const deleteDriver = driver =>
    fetch(`api/f1/drivers/${driver.id}`, {
            method: 'DELETE',
    }).then(checkStatus);
