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

  getQRNQ(credentials) {
    return api().post('question/getQRNQ', credentials)
  },

  setQuestion(credentials) {
    return api().post('question/setQuestion', credentials)
  },

  deleteQuestion(credentials) {
    return api().post('question/deleteQuestion', credentials)
  }
}
