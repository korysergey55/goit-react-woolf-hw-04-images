import { useState, useEffect } from 'react';
import styles from './styles.module.css'
import { ToastContainer } from 'react-toastify'

import Searchbar from 'components/searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/loader/Loader';
import Modal from 'components/modal/Modal';
import Button from 'components/button/Button';
import searchProductsAPI from 'api/api';

const App = () => {
  const [images, setImages] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [largeImageURL, setLargeImageURL] = useState('')
  const [isLoadMore, setisLoadMore] = useState(0)

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await searchProductsAPI(searchWord, currentPage)
        setImages((prev) => ([...prev, ...data.hits]))
        setisLoadMore(data.hits.length)
        setLoading(false);
        document.body.style.backgroundImage = 'none'
      }
      catch (error) {
        console.log(error.message)
      }
      finally {
        setLoading(false);
      }
    }

    if (searchWord) {
      fetchData()
    }
  }, [searchWord, currentPage])


  const handleChangeWord = (data) => {
    if (data === searchWord) return
    setSearchWord(data)
    setImages([])
    setCurrentPage(1)
  }

  const taggleModal = (bigImage) => {
    setLargeImageURL(bigImage)
  };

  const showMore = () => {
    setCurrentPage((prev) => (prev + 1));
  };

  return (
    <div className={styles.container} >
      <Searchbar handleChangeWord={handleChangeWord} />

      {images && <ImageGallery images={images} taggleModal={taggleModal} />}

      {loading && <Loader />}

      {largeImageURL && (
        <Modal
          largeImageURL={largeImageURL}
          taggleModal={taggleModal}
        />
      )}

      {isLoadMore > 11 && !loading && <Button showMore={showMore} />}

      <ToastContainer />
    </div>
  );

};
export default App
