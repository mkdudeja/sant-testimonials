export interface IModalConfirm {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

export interface IFeedback {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  feedback: string;
  avatar: string;
  status: boolean;
}

export interface IFeedbackPayload {
  id: string;
  txtCity: string;
  txtState: string;
  txtCountry: string;
  txtName: string;
  txtFeedback: string;
  isApprove: boolean;
}

export interface IAPIFeedback extends IFeedbackPayload {
  _id: string;
  isApprove: boolean;
  txtPhoto: string;
}
