/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  IAPIFeedback,
  IFeedback,
  IModalConfirm,
} from "../../shared/app.interface";
import { getPaginationProps, renderAddress } from "../../shared/app.helper";
import appConstants from "../../shared/app.config";
import ModalFeedback from "./modal-feedback.component";
import { FeedbackModel, ModalConfirmModel } from "../../shared/app.model";
import ModalConfirm from "../../shared/components/modal-confirm.component";
import { toast } from "react-toastify";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Toggle from "../../shared/components/toggle.component";
import ReactPaginate from "react-paginate";

const itemsPerPage = 50;

const Feedbacks: React.FC = () => {
  const [itemOffset, setItemOffset] = React.useState(0);
  const [activePage, setActivePage] = React.useState(0);
  const [data, setData] = React.useState<IFeedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = React.useState<IFeedback>();
  const [modalConfirm, setModalConfirm] = React.useState<IModalConfirm>(
    () => new ModalConfirmModel()
  );

  const getFeedbacks = React.useCallback(async () => {
    try {
      const response = await fetch(appConstants.urls.listFeedbacks);
      const result = await response.json();
      const feedbacks = (result?.data?.feedbackList ?? []).map(
        (item: IAPIFeedback) => ({
          id: item._id,
          city: item.txtCity,
          state: item.txtState,
          country: item.txtCountry,
          name: item.txtName,
          avatar: item.txtPhoto,
          feedback: item.txtFeedback,
          status: item.isApprove,
        })
      );
      setData(feedbacks);
    } catch (err) {
      const error = err as any;
      console.log(error?.message || "An error occured while fetching the feedbacks.");
    }
  }, []);

  const deleteFeedback = (feedbackId: string) => {
    setModalConfirm({
      open: true,
      title: "Delete Feedback",
      message: "Are you sure you want to delete the selected feedback?",
      onConfirm: async () => {
        try {
          // POST request using fetch()
          const query = await fetch(appConstants.urls.deleteFeedback, {
            method: "POST",
            body: JSON.stringify({
              id: feedbackId,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });

          const response = await query.json();
          if (response.result !== "success") {
            toast.error(
              response?.data?.message ??
              "An error occured while deleting the feedback status."
            );
          } else {
            toast.success(
              response?.data?.message ?? "Feedback deleted successfully."
            );

            setData((prevState) =>
              prevState.filter((item) => item.id !== feedbackId)
            );
            setModalConfirm((prevState) => ({ ...prevState, open: false }));
          }
        } catch (err) {
          console.error(err);
          toast.error("An error occured while saving the feedback.");
          setModalConfirm((prevState) => ({ ...prevState, open: false }));
        }
      },
    });
  };

  const updateStatus = async (feedbackId: string, isActive: boolean) => {
    try {
      // POST request using fetch()
      const payload = {
        id: feedbackId,
        isApprove: isActive,
      };

      const query = await fetch(appConstants.urls.updateFeedback, {
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
          "An error occured while updating the feedback status."
        );
      } else {
        toast.success(
          response?.data?.message ?? "Feedback status updated successfully."
        );

        setData((prevState) =>
          prevState.map((item) => {
            if (item.id === feedbackId) {
              return {
                ...item,
                status: isActive,
              };
            }
            return item;
          })
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occured while updating the feedback status.");
    }
  };

  const handleClose = React.useCallback(
    async (refetch: boolean) => {
      setSelectedFeedback(null);
      if (refetch) {
        await getFeedbacks();
      }
    },
    [getFeedbacks]
  );

  // Invoke when user click to request another page.
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    setActivePage(event.selected);
  };

  // load slides
  React.useEffect(() => {
    getFeedbacks();
  }, [getFeedbacks]);

  return (
    <React.Fragment>
      <ModalFeedback feedback={selectedFeedback} onClose={handleClose} />
      <header className="bg-white shadow-sm">
        <div className="flex justify-between mx-auto max-w-7xl py-4 px-2 lg:px-0">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">
            Manage Feedbacks
          </h1>
          <button
            type="button"
            onClick={() => setSelectedFeedback(new FeedbackModel())}
            className="px-4 py-2 text-xs font-medium text-center text-white uppercase transition-colors duration-200 transform rounded-md bg-primary bg-opacity-90 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Add Feedback
          </button>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-2 px-2 lg:px-0">
          <table className="min-w-full">
            <colgroup>
              <col className="w-full sm:w-1/2" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
              <col className="sm:w-1/6" />
            </colgroup>
            <thead className="border-b border-gray-300 text-gray-900">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  Feedback
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Photo
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="max-w-0 py-2 pl-4 pr-3 text-sm sm:pl-0">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-gray-500">{item.feedback}</div>
                  </td>
                  <td className="hidden px-3 py-2 text-right text-sm text-gray-500 sm:table-cell">
                    {renderAddress(item) ?? "-"}
                  </td>
                  <td className="hidden px-3 py-2 text-right text-sm text-gray-500 sm:table-cell">
                    {item.avatar ? (
                      <img
                        className="h-14 w-14 rounded-full bg-gray-800"
                        src={`data:image/png;base64,${item.avatar}`}
                        alt="user image"
                      />
                    ) : (
                      <>-</>
                    )}
                  </td>
                  <td className="py-2 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                    <div className="flex justify-end items-center space-x-3">
                      <Toggle
                        enabled={item.status}
                        onChange={(enabled) => updateStatus(item.id, enabled)}
                      />
                      <button onClick={() => setSelectedFeedback(item)}>
                        <PencilSquareIcon className="w-5 h-5 text-gray-500 hover:text-gray-600" />
                      </button>
                      <button onClick={() => deleteFeedback(item.id)}>
                        <TrashIcon className="w-5 h-5 text-red-500 hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end my-4">
            <ReactPaginate
              {...getPaginationProps()}
              pageRangeDisplayed={5}
              forcePage={activePage}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              onPageChange={handlePageClick}
            />
          </div>
        </div>
      </main>
      <ModalConfirm {...modalConfirm} setProps={setModalConfirm} />
    </React.Fragment>
  );
};

export default Feedbacks;
