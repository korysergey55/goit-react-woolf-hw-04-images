import React, { useEffect, useCallback } from "react";
import styles from './styles.module.css'

const Modal = ({ largeImageURL, taggleModal }) => {

  const handleEsc = useCallback((evt) => {
    if (evt.code === "Escape") {
      taggleModal('');
    }
  }, [taggleModal])

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    }
  }, [handleEsc])

  const handleClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      taggleModal('')
    }
  }


  return (
    <div className={styles.overlay} onClick={handleClick}>
      <div className={styles.modal}>
        <img
          className={styles.image}
          src={largeImageURL}
          alt="random" />
      </div>
    </div>
  );
}


export default Modal;