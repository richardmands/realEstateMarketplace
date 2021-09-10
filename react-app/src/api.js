import axios from "axios"

const serverURL = process.env.REACT_APP_API_URL
console.log("🚀 ~ serverURL", serverURL)

export async function checkIsConnectedToAPI({ onSuccess, onFailure }) {
  return axios(`${serverURL}/api/status`, {
    method: "GET",
  })
    .then(({ data }) => {
      onSuccess()
      return { connectedToAPI: data.running, oracleCount: data.oracleCount }
    })
    .catch((error) => {
      console.error("Couldn't connect to the API!", error)
      onFailure()
      return { connectedToAPI: false }
    })
}

export async function updateServer() {
  return axios(`${serverURL}/api/update`, {
    method: "POST",
  }).catch((error) => {
    console.error("Couldn't get airlines info!", error)
    return []
  })
}

export async function getAirlines() {
  return axios(`${serverURL}/api/airlines`, {
    method: "GET",
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Couldn't get airlines info!", error)
      return []
    })
}

export async function getFlights() {
  return axios(`${serverURL}/api/flights`, {
    method: "GET",
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Couldn't get flights info!", error)
      return {}
    })
}
