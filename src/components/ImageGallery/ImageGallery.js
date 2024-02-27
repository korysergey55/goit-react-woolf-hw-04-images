import React from 'react'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './styles.module.css'
import { nanoid } from 'nanoid'

const ImageGallery = ({ images, taggleModal }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((item) => (
        <ImageGalleryItem image={item} taggleModal={taggleModal} key={nanoid()} />
      ))}
    </ul>
  );
}

export default ImageGallery;