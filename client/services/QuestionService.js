import api from "./api"

export default {

  getAllQuestions(credentials) {
    return api().post('question/getAllQuestions', credentials)
  },

  updateQuestion(credentials) {
    return api().post('question/updateQuestion', credentials)
  },

  getNextQuestion(credentials) {
    return api().post('question/getNextQuestion', credentials)
  },

  getQR(credentials) {
    return api().post('question/getQR', credentials)
  },

  setQuestion(credentials) {
    return api().post('question/setQuestion', credentials)
  }
}
