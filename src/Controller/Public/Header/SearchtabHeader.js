import React from 'react';
import '../../../Asset/Css/Header.css';

function SearchtabHeader({openSearch}) {
  return (
    <div
      className={`justify-center bg-[#e9e9e9] min-h-[200px] h-auto rounded-md absolute w-full right-0 left-0 ${openSearch ? 'block' : 'hidden'}`}
    >
      <input
        type='text'
        placeholder='Tìm Kiếm'
        className='p-2 md:min-w-[70vh] min-w-full w-auto border-2 h-full rounded-md mt-4 input-search-tab outline-none'
      />
    </div>
  );
}

export default SearchtabHeader;
