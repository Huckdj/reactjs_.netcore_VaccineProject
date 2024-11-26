import React from 'react';
import '../../../Asset/Css/Header.css';

function SearchtabHeader({openSearch}) {
  return (
    <div className={`bg-[#e9e9e9] min-h-[200px]  ${openSearch ? 'block' : 'hidden'}`}  >
      <div
        className={`justify-center z-20 search-tab md:grid h-auto rounded-md w-full right-0 left-0`}
      >
        <input
          type='text'
          placeholder='Tìm Kiếm'
          className='p-2 min-w-[50vh] md:ml-4 md:mr-4 w-auto border-2 h-[40px] rounded-md mt-4 input-search-tab outline-none'
        />
      </div>
      <div className='justify-center grid'>
          Gợi ý tìm kiếm
      </div>
    </div>
  );
}

export default SearchtabHeader;
