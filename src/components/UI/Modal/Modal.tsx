import { ReactNode } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

interface OverlayProps {
  children: ReactNode;
}

interface BackDropProps {
  onClose: () => void;
}

interface ModalProps extends OverlayProps, BackDropProps {}

const BackDrop = (props: BackDropProps) => {
  return <div onClick={props.onClose} className={classes.backdrop}></div>;
};

const ModalOverlay = (props: OverlayProps) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props: ModalProps) => {
  const portalElement = document.getElementById("overlays");
  return (
    <>
      {portalElement != null &&
        createPortal(<BackDrop onClose={props.onClose} />, portalElement)}
      {portalElement != null &&
        createPortal(
          <ModalOverlay children={props.children} />,
          portalElement!
        )}
    </>
  );
};

export default Modal;
