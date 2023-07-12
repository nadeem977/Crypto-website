import React, { useContext } from 'react'
import paginationArrow from '../assets/pagination-arrow.svg'
import { CryptoContext } from '../context/CryptoContext'
import Parpages from './Parpages';
const Pagination = () => {

const {pages ,setPages ,Totelnuber,cryptodata,parpage} = useContext(CryptoContext)
const TotalNumber = Math.ceil(Totelnuber / pages);

const next = () => {
 if (pages === TotalNumber) {
   return null;
 } else {
  setPages(pages + 1);
 }
};

const prev = () => {
 if (pages === 1) {
   return null;
 } else {
  setPages(pages - 1);
 }
};

const multiStepNext = () => {
 if (pages + 3 >= TotalNumber) {
  setPages(TotalNumber - 1);
 } else {
  setPages(pages + 3);
 }
};

const multiStepPrev = () => {
 if (pages - 3 <= 1) {
  setPages(TotalNumber + 1);
 } else {
  setPages(pages - 2);
 }
};



  {if(cryptodata && cryptodata.length >= parpage){
    return(
      <div className="prpage flex items-center">
    <Parpages />
    <ul className="flex items-center justify-end text-sm">
      <li className="flex items-center">
        <button className="outline-0 hover:text-cyan w-8" onClick={prev}>
          <img
            className="w-full h-auto rotate-180"
            src={paginationArrow}
            alt="left"
          />
        </button>
      </li>

      {pages + 1 === TotalNumber || pages === TotalNumber ? (
        <li>
          {" "}
          <button
            onClick={multiStepPrev}
            className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
          >
            ...
          </button>
        </li>
      ) : null}

      {pages - 1 !== 0 ? (
        <li>
          <button
            onClick={prev}
            className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
          >
            {" "}
            {pages - 1}{" "}
          </button>
        </li>
      ) : null}
      <li>
        <button
          disabled
          className="ouline-0  rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
        >
          {pages}
        </button>
      </li>

      {pages + 1 !== TotalNumber && pages !== TotalNumber ? (
        <li>
          <button
            onClick={next}
            className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
          >
            {pages + 1}
          </button>
        </li>
      ) : null}

      {pages + 1 !== TotalNumber && pages !== TotalNumber ? (
        <li>
          {" "}
          <button
            onClick={multiStepNext}
            className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center text-lg    "
          >
            ...
          </button>
        </li>
      ) : null}

      {pages !== TotalNumber ? (
        <li>
          <button
            onClick={() => setPages(TotalNumber)}
            className="ouline-0 hover:text-cyan  rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
          >
            {TotalNumber}
          </button>
        </li>
      ) : null}
      <li>
        <button className="outline-0 hover:text-cyan w-8" onClick={next}>
          <img
            className="w-full h-auto"
            src={paginationArrow}
            alt="right"
          />
        </button>
      </li>
    </ul>
  </div>
    )
  }else{
    return null;
  }};


};

export default Pagination