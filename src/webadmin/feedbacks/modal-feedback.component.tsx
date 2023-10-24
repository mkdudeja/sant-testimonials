import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import appConstants from "../../shared/app.config";
import { IFeedback, IFeedbackPayload } from "../../shared/app.interface";
import FieldError from "../../shared/components/field-error.component";

interface IAvailabilityScheduleProps {
  feedback: IFeedback;
  onClose: (x: boolean) => void;
}

const feedbackSchema = Yup.object().shape({
  name: Yup.string().required("Please enter name."),
  feedback: Yup.string().required("Please enter feedback."),
});

const ModalFeedback: React.FC<IAvailabilityScheduleProps> = ({
  feedback,
  onClose,
}) => {
  const doesExist = !!feedback;

  const handleCancel = (refetch: boolean) => {
    onClose(refetch);
  };

  const handleSubmit = async (values: Partial<IFeedback>) => {
    try {
      const apiUrl = !feedback?.id
        ? appConstants.urls.addFeedback
        : appConstants.urls.updateFeedback;

      const payload: IFeedbackPayload = {
        txtName: values.name,
        txtFeedback: values.feedback,
        txtCity: values.city,
        txtState: values.state,
        txtCountry: values.country,
        txtPhoto: feedback.avatar,
      };

      // POST request using fetch()
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const result = await response.json();
      toast.success(result?.data?.message ?? "Feedback added successfully.");
      handleCancel(true);
    } catch (err) {
      console.error(err);
      toast.error("An error occured while saving the feedback.");
    }
  };

  return (
    <div className="text-gray-800 bg-gray-100 font-dm-sans">
      <div
        onClick={() => handleCancel(false)}
        className={
          "fixed inset-0 z-40 transition-opacity bg-black opacity-50 " +
          (doesExist ? "block" : "hidden")
        }
      ></div>

      <div
        className={
          "fixed inset-y-0 right-0 z-50 flex flex-col h-screen overflow-y-auto transition duration-200 transform bg-white border-r border-gray-200 w-full sm:w-[28rem] " +
          (doesExist ? "translate-x-0 ease-in" : "translate-x-full ease-out")
        }
      >
        <div className="flex items-center justify-between px-6 mt-6 space-x-4 sm:space-x-0">
          <h3 className="text-2xl font-medium text-gray-800">
            {feedback?.id ? "Edit" : "Add"} Feedback
          </h3>

          <button
            onClick={() => handleCancel(false)}
            className="text-gray-600 focus:text-primary focus:outline-none"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5L4.5 13.5"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 4.5L13.5 13.5"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {doesExist && (
          <Formik
            initialValues={{
              name: feedback?.name ?? "",
              feedback: feedback?.feedback ?? "",
              city: feedback?.city ?? "",
              state: feedback?.state ?? "",
              country: feedback?.country ?? "",
            }}
            validationSchema={feedbackSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <main className="px-6 py-4">
                <Form className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter name"
                      className="block w-full p-3 mt-1 border-gray-300 rounded-md focus:ring focus:ring-opacity-40 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
                    />
                    <ErrorMessage name="name">
                      {(msg) => <FieldError message={msg} />}
                    </ErrorMessage>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Feedback
                    </label>
                    <Field
                      id="feedback"
                      name="feedback"
                      component="textarea"
                      placeholder="Enter Feedback"
                      rows={4}
                      className="block w-full p-3 mt-1 border-gray-300 rounded-md focus:ring focus:ring-opacity-40 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
                    />
                    <ErrorMessage name="feedback">
                      {(msg) => <FieldError message={msg} />}
                    </ErrorMessage>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      City
                    </label>
                    <Field
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Enter City"
                      className="block w-full p-3 mt-1 border-gray-300 rounded-md focus:ring focus:ring-opacity-40 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      State
                    </label>
                    <Field
                      type="text"
                      id="state"
                      name="state"
                      placeholder="Enter State"
                      className="block w-full p-3 mt-1 border-gray-300 rounded-md focus:ring focus:ring-opacity-40 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Country
                    </label>
                    <Field
                      type="text"
                      id="country"
                      name="country"
                      placeholder="Enter Country"
                      className="block w-full p-3 mt-1 border-gray-300 rounded-md focus:ring focus:ring-opacity-40 focus:ring-blue-300 focus:border-blue-400 sm:text-sm"
                    />
                  </div>

                  {/* feedback actions */}
                  <div className="flex items-center justify-end !mt-8 space-x-4">
                    <button
                      type="button"
                      onClick={() => handleCancel(false)}
                      className="w-1/2 px-4 py-2 text-sm font-medium text-center text-gray-700 uppercase transition-colors duration-200 transform border border-gray-600 rounded-md hover:bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="w-1/2 px-4 py-2 text-sm font-medium text-center text-white uppercase transition-colors duration-200 transform rounded-md bg-primary bg-opacity-90 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </main>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default ModalFeedback;
