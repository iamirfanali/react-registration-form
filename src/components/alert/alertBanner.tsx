import React from "react";
import { classNames } from "../../utils/className";

interface AlertBannerProps {
  isError: boolean;
  message: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ isError, message }) => {
  return (
    <div
      className={classNames(
        isError
          ? "bg-red-100 border border-red-400 text-red-700"
          : "bg-green-100 border border-green-400 text-green-700",
        "px-4 py-3 rounded relative mt-5"
      )}
      role="alert"
    >
      {message}
    </div>
  );
};

export default AlertBanner;
