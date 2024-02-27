import React, { Component } from "react";
import styles from './styles.module.css'

class Modal extends Component {

  componentDidMount() {
    window.addEventListener("keydown", this.handleEsc);
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEsc);
    document.body.style.overflow = "auto";
  }

  handleEsc = (evt) => {
    if (evt.code === "Escape") {
      this.props.taggleModal('');
    }
  }

  handleClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.props.taggleModal('')
    }
  }

  render() {
    return (
      <div className={styles.overlay} onClick={this.handleClick}>
        <div className={styles.modal}>
          <img
            className={styles.image}
            src={this.props.largeImageURL}
            alt="random" />
        </div>
      </div>
    );
  }
}

export default Modal;