import api from "./api"

export default {

  getAllResponses(credentials) {
    return api().post('response/getAllResponses', credentials)
  },

  getResponses(credentials) {
    return api().post('response/getResponses', credentials)
  },

  setResponse(credentials) {
    return api().post('response/setResponse', credentials)
  },

  updateResponse(credentials) {
    return api().post('response/updateResponse', credentials)
  },

  deleteResponse(credentials) {
    return api().post('response/deleteResponse', credentials)
  },

  addResponse(credentials) {
    return api().post('response/addResponse', credentials)
  }
}
