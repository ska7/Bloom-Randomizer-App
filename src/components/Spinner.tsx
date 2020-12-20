import * as React from "react";
import loader from "../img/loader-red.png";

interface ISpinnerProps {
  loaderStatus: string;
  commentsQuantity: number;
}

const Spinner: React.FC<ISpinnerProps> = ({
  loaderStatus,
  commentsQuantity,
}) => {
  return (
    <div className="loader">
      <img className="loader-circle" src={loader} alt="loader"></img>
      <span className="comments-count">
        {loaderStatus
          ? `${loaderStatus}`
          : `Обработано ${commentsQuantity} комментов`}
      </span>
    </div>
  );
};

export default Spinner;
