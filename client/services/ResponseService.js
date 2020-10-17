import api from "./api"

export default {

  getAllResponses(credentials) {
    return api().post('response/getAllResponses', credentials)
  }
}
