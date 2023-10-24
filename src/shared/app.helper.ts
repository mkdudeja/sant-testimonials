import { ReactPaginateProps } from "react-paginate";
import { IFeedback } from "./app.interface";

export function renderAddress(item: IFeedback) {
  const address = [];
  item.city && address.push(item.city);
  item.state && address.push(item.state);
  item.country && address.push(item.country);
  return address.map((item) => item.trim()).filter((item) => !!item).join(", ");
}

export function getPaginationProps(): Partial<ReactPaginateProps> {
  return {
    breakLabel: "...",
    nextLabel: ">>",
    previousLabel: "<<",
    className:
      "isolate inline-flex -space-x-px rounded-md cursor-pointer select-none m-0",
    activeClassName:
      "relative z-10 inline-flex items-center bg-blue-500 text-sm text-white ring-1 ring-inset ring-blue-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
    breakClassName:
      "relative inline-flex items-center text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
    breakLinkClassName:
      "relative inline-flex items-center px-3 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0",
    pageClassName:
      "relative inline-flex items-center text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0",
    pageLinkClassName:
      "relative inline-flex items-center px-3 py-2 text-sm focus:z-20 focus:outline-offset-0",
    nextClassName:
      "relative inline-flex items-center rounded-r-md text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
    nextLinkClassName:
      "relative inline-flex items-center px-3 py-2 text-sm text-gray-900 focus:z-20 focus:outline-offset-0",
    previousClassName:
      "relative inline-flex items-center rounded-l-md text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0",
    previousLinkClassName:
      "relative inline-flex items-center px-3 py-2 text-sm text-gray-900 focus:z-20 focus:outline-offset-0",
  };
}