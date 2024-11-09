const API_URL = localStorage.getItem("apiUrl") ?? "http://192.168.1.2:9061";

const keys = {
  auth: "authInfo",
};

class AppUrls {
  baseUrl = `${API_URL}/api`;
  feedbacks = `${this.baseUrl}/feedback/approvedList/25/0`;
  listFeedbacks = `${this.baseUrl}/feedback/list/5000/0`;
  addFeedback = `${this.baseUrl}/feedback/add`;
  editFeedback = `${this.baseUrl}/feedback/edit`;
  deleteFeedback = `${this.baseUrl}/feedback/delete`;
  updateFeedback = `${this.baseUrl}/feedback/update`;
}

const appConstants = {
  keys,
  urls: new AppUrls(),
};

export default appConstants;
