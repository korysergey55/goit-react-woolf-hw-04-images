import { useState } from 'react';
import { toast } from 'react-toastify'

import styles from './styles.module.css'
import sprite from '../../icons/sprite.svg'
import image from '../../images/pixabay.jpg'

const Searchbar = ({ handleChangeWord }) => {
  const [state, setState] = useState('')

  const handleChange = (evt) => {
    setState(evt.target.value)
  }

  const handaleSubmit = (evt) => {
    evt.preventDefault();
    if (state === '') {
      toast.error(`Field can't be empty. Please enter somsing...`, {
        theme: 'colored',
      })
      return
    }

    if (state === ' ' || state === '  ') {
      toast.error(`Field can't be an empty string.`, {
        theme: 'colored',
      })
      setState('')
      return
    }
    handleChangeWord(state)
  }

  return (
    <header className={styles.searchbar} >
      <img
        className={styles.image}
        src={image}
        alt='logo' />
      <form className={styles.form} onSubmit={handaleSubmit}>
        <button type="submit" className={styles.button}>
          <svg className={styles.icon} width="24" height="24" aria-label="icon-search">
            <use href={sprite + '#icon-park-search'}></use>
          </svg>
        </button>

        <input
          className={styles.input}
          name='searchWord'
          value={state}
          type="text"
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}


export default Searchbar;