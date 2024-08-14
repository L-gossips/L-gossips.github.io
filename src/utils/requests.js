const appId = "Gk2PVdtdeBJ9KBQzWkYfl3E2MQmS5ndXdpr52Ewa"
const apiKey = "E27MGJnlYbnsGnBUHERHXVwh2JXEv4WjcjbYkJvr"

async function request(method, url, data) {
  const options = {
    method,
    headers: {
      "X-Parse-Application-Id": appId,
      "X-Parse-JavaScript-Key": apiKey,
    },
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    // Check if response body is empty
    const text = await response.text();
    if (!text) {
      return null;
    }

    // Try to parse JSON
    try {
      const data = JSON.parse(text);
  
      return data;
    } catch (e) {
      throw new Error("Invalid JSON response");
    }
  } catch (error) {
    alert(error.message); // Display the error to the user
    throw error; // Re-throw the original error
  }
}

async function get(url) {
  return request("GET", url);
}
async function post(url, data) {
  return request("POST", url, data);
}


export const api = {
  get,
  post,
};
