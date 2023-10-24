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
  txtCity: string;
  txtState: string;
  txtCountry: string;
  txtName: string;
  txtPhoto: string;
  txtFeedback: string;
}

export interface IAPIFeedback extends IFeedbackPayload {
  _id: string;
  isApprove: boolean;
}
