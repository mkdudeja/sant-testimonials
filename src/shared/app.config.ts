const keys = {
  auth: "authInfo",
};

class AppUrls {
  baseUrl =
    localStorage.getItem("apiUrl") ??
    "http://ec2-3-109-158-59.ap-south-1.compute.amazonaws.com:9061/api";
  feedbacks = `${this.baseUrl}/feedback/approvedList/100/0`;
  listFeedbacks = `${this.baseUrl}/feedback/list/5000/0`;
  addFeedback = `${this.baseUrl}/feedback/add`;
  deleteFeedback = `${this.baseUrl}/feedback/delete`;
  updateFeedback = `${this.baseUrl}/feedback/update`;
}

const appConstants = {
  keys,
  urls: new AppUrls(),
};

export default appConstants;
