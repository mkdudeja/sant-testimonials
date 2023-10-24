import { IFeedback, IModalConfirm } from "./app.interface";

export class ModalConfirmModel implements IModalConfirm {
  open = false;
  title = "";
  message = "";
  onConfirm = () => {};
}


export class FeedbackModel implements IFeedback {
  id: null;
  name: string = "";
  feedback: string = "";
  city: string = "";
  state: string = "";
  country: string = "";
  status: boolean = false;
  avatar: string = null;
}
