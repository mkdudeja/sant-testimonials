interface IFieldErrorProps {
  message: string;
}

const FieldError: React.FC<IFieldErrorProps> = ({ message }) => {
  return (
    <p className="flex items-center mt-1 space-x-2 text-sm text-red-500">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.8605 2.57347L1.21384 12.0001C1.09741 12.2018 1.03581 12.4303 1.03516 12.6631C1.03451 12.896 1.09483 13.1249 1.21012 13.3272C1.32541 13.5294 1.49165 13.698 1.69231 13.816C1.89296 13.9341 2.12104 13.9976 2.35384 14.0001H13.6472C13.88 13.9976 14.108 13.9341 14.3087 13.816C14.5094 13.698 14.6756 13.5294 14.7909 13.3272C14.9062 13.1249 14.9665 12.896 14.9658 12.6631C14.9652 12.4303 14.9036 12.2018 14.7872 12.0001L9.1405 2.57347C9.02166 2.37754 8.85432 2.21555 8.65463 2.10313C8.45495 1.9907 8.22966 1.93164 8.0005 1.93164C7.77135 1.93164 7.54606 1.9907 7.34637 2.10313C7.14669 2.21555 6.97935 2.37754 6.8605 2.57347V2.57347Z"
          stroke="#E21B17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 6V8.66667"
          stroke="#E21B17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11.3333H8.0075"
          stroke="#E21B17"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span>{message}</span>
    </p>
  );
};

export default FieldError;
