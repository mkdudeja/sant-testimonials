import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import logoUrl from "./assets/images/logo.png";
import imgUrl from "./assets/images/samagam.png";
import appConstants from "./shared/app.config";
import { IFeedback, IFeedbackPayload } from "./shared/app.interface";
import { FeedbackModel } from "./shared/app.model";
import FieldError from "./shared/components/field-error.component";

const feedback = new FeedbackModel();

const feedbackSchema = Yup.object().shape({
  name: Yup.string().required("Please enter name."),
  feedback: Yup.string().required("Please enter feedback."),
});

const Feedback: React.FC = () => {
  const handleSubmit = async (values: Partial<IFeedback>, {resetForm}) => {
    try {
      const apiUrl = appConstants.urls.addFeedback;

      const payload: IFeedbackPayload = {
        id: feedback.id,
        txtName: values.name,
        txtFeedback: values.feedback,
        txtCity: values.city,
        txtState: null,
        txtCountry: null,
        isApprove: false,
      };

      // POST request using fetch()
      const query = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const response = await query.json();
      if (response.result !== "success") {
        toast.error(
          response?.data?.message ??
            "An error occured while saving the feedback."
        );
      } else {
        toast.success(response?.data?.message ?? `Feedback added successfully.`);
        resetForm();
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occured while saving the feedback.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen h-full overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between p-6">
          <img className="h-28 w-auto" src={logoUrl} alt="Kids Exhibition" />
          <img
            src={imgUrl}
            className="h-28 w-auto"
            alt="76th Nirankari Samagam"
          />
        </header>

        <div className="mx-auto max-w-3xl space-y-3">
          <h1 className="text-2xl font-bold text-white text-center underline">Add Feedback</h1>
          <Formik
            initialValues={{
              name: feedback?.name ?? "",
              feedback: feedback?.feedback ?? "",
              city: feedback?.city ?? "",
              status: feedback?.status ?? false,
            }}
            validationSchema={feedbackSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, resetForm }) => (
                <Form className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-white">
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
                    <label className="text-sm font-medium text-white">
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
                    <label className="text-sm font-medium text-white">
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

                  {/* feedback actions */}
                  <div className="flex items-center justify-end !mt-8 space-x-4">
                    <button
                      type="button"
                      onClick={() => resetForm(feedback)}
                      className="w-1/2 px-4 py-2 text-sm font-medium text-center text-gray-700 uppercase transition-colors duration-200 transform border border-gray-600 rounded-md bg-white"
                    >
                      Reset
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
            )}
          </Formik>
        </div>

        <footer>
          <p className="text-white text-center text-base mt-10">
            76<sup>th</sup> Annual Nirankari Sant Samagam - Kids Exhibition,
            2023
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Feedback;
``;
