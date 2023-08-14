import { useState, useRef, useCallback } from 'react';
import MatchTemplate from './components/MatchTemplate';
import NickNameSearch from './components/NickNameSearch';
import MatchList from './components/MatchList';
import match from './match';

const App = () => {
  const [matches, setMatch] = useState(match);
  const username = '우리집김치냉장고';
  return (
    <MatchTemplate>
      <NickNameSearch />
      <MatchList matches={matches} username={username} />
    </MatchTemplate>
  );
};

export default App;
