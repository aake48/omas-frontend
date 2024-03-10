import React from 'react'

interface PaginatorProps {
    pageNumber: number,
    totalPages: number,
    handlePageNumberChange: any
}

const Paginator = ({ pageNumber, totalPages, handlePageNumberChange }: PaginatorProps) => {
    let pageElements: any[] = [];
    const pageButtonsAmount = 4;
    const pageButtonsOnEachSide = (pageButtonsAmount / 2);
    let start = 0;
    let end = totalPages;

    if (totalPages < pageButtonsAmount) {
      start = 0;
      end = totalPages;
    } else if (totalPages > pageButtonsAmount && pageNumber < pageButtonsAmount) {
      start = 0;
      end = pageButtonsAmount;
    } else if (pageNumber > totalPages - pageButtonsOnEachSide) {
      start = pageNumber - (pageButtonsOnEachSide + 1);
      end = totalPages;
    } else if (pageNumber >= pageButtonsAmount) {
      start = pageNumber - pageButtonsOnEachSide;
      end = pageNumber + pageButtonsOnEachSide;
    }

    for (let i = start; i < end; i++) {
      let selectedPageStyle = "";
      if (pageNumber === i) {
        selectedPageStyle = "bg-slate-300";
      }

      pageElements.push(
        <li
          className={`${selectedPageStyle} flex items-center justify-center p-3 h-8 text-black cursor-pointer select-none hover:bg-slate-100 border-slate-100 border-s-2`}
          onClick={() => handlePageNumberChange(i)}
          key={i}
        >
          {i + 1}
        </li>
      );
    }
  
    return (
        <div className='flex items-center justify-center mt-6'>
          <div className='border-slate-100 border-2 rounded-md'>
            <ul className="flex items-center h-8 text-sm">
              <li
                className="flex items-center justify-center px-1 h-8 text-black cursor-pointer select-none hover:bg-slate-100"
                onClick={() => handlePageNumberChange(0)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
              </li>
              <li
                className="flex items-center justify-center px-1 h-8 text-black cursor-pointer select-none hover:bg-slate-100"
                onClick={() => handlePageNumberChange(pageNumber - 1)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </li>
              {pageElements}
              <li
                className="flex items-center justify-center px-1 h-8 text-black cursor-pointer select-none hover:bg-slate-100 border-slate-100 border-s-2"
                onClick={() => handlePageNumberChange(pageNumber + 1)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </li>
              <li
                className="flex items-center justify-center px-1 h-8 text-black cursor-pointer select-none hover:bg-slate-100"
                onClick={() => handlePageNumberChange(totalPages - 1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
              </li>
            </ul>
          </div>
        </div>
    )
}

export default Paginator;