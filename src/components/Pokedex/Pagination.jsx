import React from 'react'
import './styles/pagination.css'

const Pagination = ({page, maxPage, setPage}) => {

  const pagesForBlock = 6 
  const currentBlock = Math.ceil(page / pagesForBlock)
  const maxBlock = Math.ceil( maxPage / pagesForBlock)

  const arrayPages = [];
  const initialPage = (currentBlock - 1) * pagesForBlock + 1
  const finalPage = maxBlock === currentBlock ? maxPage : currentBlock * pagesForBlock
  for (let i = initialPage; i <= finalPage; i++) {
    arrayPages.push(i)
  } 

  const handlePage = number => {
    setPage(number)
  }

  const handlePrevious = () => {
    if (page - 1 !== 0) {
        setPage(page - 1)
    }
  }

  const handleNext = () => {
    if (page + 1 <= maxPage) {
        setPage(page + 1)
    }
  }

  return (
    <div className='pagination'>
        <ul className='pagination_list'>
            <li className='pagination_item page_active' onClick={handlePrevious}>&#60;</li>
            {
                arrayPages.map(e => (
                    <li className={`pagination_item ${page === e && 'page_active'}`} onClick={() => handlePage(e)} key={e}>{e}</li>
                ))
            }
            <li className='pagination_item page_active' onClick={handleNext}>&#62;</li>
        </ul>
    </div>
  )
}

export default Pagination