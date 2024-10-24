import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import "../styles/modal.css";

interface IModalProps {
  isShowing: boolean;
  hide: () => void;
  title?: string;
}

const Modal = ({
  isShowing,
  hide,
  children,
  title,
}: PropsWithChildren<IModalProps>) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                {title && <div className="modal-body">{title}</div>}
                <div className="modal-body">{children}</div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
