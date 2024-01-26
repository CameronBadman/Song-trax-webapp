/**
 * The API key used to authenticate requests to the API.
 */
const APIKEY = "6MbYw9uAwm";

/**
 * The base URL of the API.
 */
const baseURL = "https://comp2140.uqcloud.net/api/";

/**
 * Fetches a list of samples from the API.
 * @returns {Promise<Object[]>} A promise that resolves to an array of sample objects.
 */
export async function getSamples() {
  const url = `${baseURL}sample/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

/**
 * Fetches a specific sample from the API by its ID.
 * @param {string} id The ID of the sample to fetch.
 * @returns {Promise<Object>} A promise that resolves to a sample object.
 */
export async function getSample(id) {
  const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();
  json.recording_data = JSON.parse(json.recording_data);
  return json;
}

/**
 * Fetches a list of sample locations from the API.
 * @returns {Promise<Object[]>} A promise that resolves to an array of sample location objects.
 */
export async function getSampleToLocation() {
  const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to fetch sample locations: ${errorData.message || "Unknown error"}`);
  }
  const json = await response.json();
  return json;
}

/**
 * Fetches a specific sample location from the API by its ID.
 * @param {string} id The ID of the sample location to fetch.
 * @returns {Promise<Object>} A promise that resolves to a sample location object.
 */
export async function getSampleToLocationid(id) {
  const url = `${baseURL}sampletolocation/${id}/?api_key=${APIKEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to fetch sample location: ${errorData.message || "Unknown error"}`);
  }
  const json = await response.json();
  return json;
}

/**
 * Creates a new location on the API.
 * @param {Object} locationData The location data to be sent in the POST request.
 * @returns {Promise<Object>} A promise that resolves to the newly created location object.
 */
export async function postLocation(locationData) {
  const url = `${baseURL}location/`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(locationData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create location: ${errorData.message || "Unknown error"}`);
  }
  const json = await response.json();
  return json;
}

/**
 * Fetches a list of all locations from the API.
 * @returns {Promise<Object[]>} A promise that resolves to an array of location objects.
 * @throws {Error} If the request fails or encounters an error, an error is thrown.
 */
export async function getLocations() {
  const url = `${baseURL}location/?api_key=${APIKEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch locations: ${errorData.message || "Unknown error"}`);
    }
    const locations = await response.json();
    return locations;
  } catch (error) {
    throw error;
  }
}

/**
 * Deletes all locations from the API.
 * @returns {Promise<boolean>} A promise that resolves to true if all deletions are successful.
 * @throws {Error} If any delete operation fails, an error is thrown.
 */
export async function deleteAllLocations() {
  try {
    const locations = await getLocations();
    const deletePromises = locations.map(location => {
      const deleteUrl = `${baseURL}location/${location.id}/?api_key=${APIKEY}`;
      return fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`Failed to delete location with ID ${location.id}: ${errorData.message}`);
          });
        }
      });
    });
    await Promise.all(deletePromises);
    console.log('All locations have been deleted.');
    return true;
  } catch (error) {
    console.error(`Error deleting locations: ${error}`);
    throw error;
  }
}

/**
 * Fetches a list of sample ratings from the API.
 * @returns {Promise<Object[]>} A promise that resolves to an array of sample rating objects.
 */
export async function getSampleRatings() {
  const url = `${baseURL}samplerating/?api_key=${APIKEY}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

/**
 * Creates a new sample rating on the API.
 * @param {number} sample_id The ID of the sample to be rated.
 * @param {number} rating The rating to be given to the sample.
 * @returns {Promise<Object>} A promise that resolves to the newly created sample rating object.
 */
export async function postSampleRating(sample_id, rating) {
  const url = `${baseURL}samplerating/?api_key=${APIKEY}`;
  const postData = { sample_id, rating };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(postData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create sample rating: ${errorData.message || "Unknown error"}`);
  }
  const json = await response.json();
  return json;
}

/**
 * Creates a new sample-to-location mapping on the API.
 * @param {Object} sampleToLocationData The sample-to-location mapping data to be sent in the POST request.
 * @returns {Promise<Object>} A promise that resolves to the newly created sample-to-location mapping object.
 */
export async function postSampleToLocation(sampleToLocationData) {
  const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(sampleToLocationData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to create sample-to-location: ${errorData.message || "Unknown error"}`);
  }
  const json = await response.json();

  console.log(json, "test")
  return json;
}