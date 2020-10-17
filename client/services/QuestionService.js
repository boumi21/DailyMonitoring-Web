import api from "./api"

export default {

  getAllQuestions(credentials) {
    return api().post('response/getAllQuestions', credentials)
  }
}
