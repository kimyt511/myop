import { useState, useCallback } from 'react';
import { MdSearch } from 'react-icons/md';
import './NickNameSearch.scss';

const NickNameSearch = () => {
  const [value, setValue] = useState('');
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return (
    <form className="NickNameSearch">
      <input
        placeholder="닉네임을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdSearch />
      </button>
    </form>
  );
};

export default NickNameSearch;
