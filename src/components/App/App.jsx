import { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css'
import { ToastContainer } from 'react-toastify'

import Searchbar from 'components/searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/loader/Loader';
import Modal from 'components/modal/Modal';
import Button from 'components/button/Button';
import searchProductsAPI from 'api/api';

const INITIAL_STATE = {
  images: [],
  searchWord: "",
  currentPage: 0,
  loading: false,
  largeImageURL: "",
  shawModal: false,
  isLoadMore: 0
}

const App = () => {

  const [state, setState] = useState(INITIAL_STATE)

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const { data } = await searchProductsAPI(state.searchWord, state.currentPage)
      document.body.style.backgroundImage = 'none'
      setState((prev) => ({
        ...prev,
        images: [...prev.images, ...data.hits],
        isLoadMore: data.hits.length,
        loading: false
      }))
    }
    catch (error) {
      console.log(error.message)
    }
    finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [state.searchWord, state.currentPage])

  useEffect(() => {
    if (state.searchWord) {
      fetchData()
    }
  }, [state.searchWord, state.currentPage, fetchData])


  const handleChangeWord = (data) => {
    if (data === state.searchWord) return
    setState((prev) => ({ ...prev, searchWord: data, images: [], currentPage: 1, }))
  }

  const taggleModal = (bigImage) => {
    setState((prev) => ({ ...prev, largeImageURL: bigImage }));
  };

  const showMore = () => {
    setState((prevState) => ({ ...prevState, currentPage: prevState.currentPage + 1 }));
  };

  return (
    <div className={styles.container} >
      <Searchbar handleChangeWord={handleChangeWord} />

      {state.images && <ImageGallery images={state.images} taggleModal={taggleModal} />}

      {state.loading && <Loader />}

      {state.largeImageURL && (
        <Modal
          largeImageURL={state.largeImageURL}
          taggleModal={taggleModal}
        />
      )}

      {state.isLoadMore > 11 && !state.loading && <Button showMore={showMore} />}

      <ToastContainer />
    </div>
  );

};
export default App
