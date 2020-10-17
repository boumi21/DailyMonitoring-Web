import api from "./api"

export default {

  getAllResponses(credentials) {
    return api().post('response/getAllResponses', credentials)
  },

  getResponses(credentials) {
    return api().post('response/getResponses', credentials)
  }
}
