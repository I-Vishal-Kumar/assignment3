import { PropTypes } from "prop-types";
import { useAlert } from "../../hooks/useAlert";

const AlertBox = () => {
  const { alertState, closeAlert } = useAlert();
  return (
    <div
      className={`${
        alertState.state ? "" : "hidden"
      } md:w-[100vw] w-full h-[90%]  bg-slate-400 absolute justify-center items-center flex z-10`}
    >
      <div className=" w-[80%] bg-slate-200 max-w-md flex flex-col items-center justify-between py-4 rounded-lg">
        <p className=" text-gray-800 font-semibold">{alertState.message}</p>
        <button
          onClick={() => {
            closeAlert();
          }}
          className="px-8 py-2 rounded-md font-bold text-yellow-50 bg-blue-600 mt-8"
        >
          OK
        </button>
      </div>
    </div>
  );
};

AlertBox.propTypes = {
  state: PropTypes.bool,
  message: PropTypes.string,
  closeFn: PropTypes.func,
};

export default AlertBox;
