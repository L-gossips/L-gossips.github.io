const appId = "Gk2PVdtdeBJ9KBQzWkYfl3E2MQmS5ndXdpr52Ewa";
const apiKey = "E27MGJnlYbnsGnBUHERHXVwh2JXEv4WjcjbYkJvr";

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
    
    // Check if the response is successful
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || "An error occurred during the request.");
    }

    const text = await response.text();

    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON:", text);
      throw new Error("Invalid JSON response");
    }
  } catch (error) {
    console.error("Request error:", error);
    alert(error.message); // Alerting the user about the error
    throw error; // Re-throw the error for further handling
  }
}

async function get(url) {
  return request("GET", url);
}

async function post(url, data) {
  return request("POST", url, data);
}

async function put(url, data) {
  return request("PUT", url, data);
}

export const api = {
  get,
  post,
  put
};
