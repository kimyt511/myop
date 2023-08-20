import { useState, useRef, useCallback } from 'react';
import MatchTemplate from './components/MatchTemplate';
import NickNameSearch from './components/NickNameSearch';
import MatchList from './components/MatchList';
import axios from 'axios';
const App = () => {
  const [matches, setMatches] = useState([]);
  const [username, setUsername] = useState([]);
  const [status, setStatus] = useState([]);
  const onSearch = useCallback(async (username) => {
    try {
      const response = await axios.get(
        'http://localhost:8080/summoners/' + username,
      );
      setMatches(response.data.matchData);
      setUsername(username);
      setStatus(response.status);
    } catch (err) {
      setStatus(err.response.status);
    }
  }, []);

  return (
    <MatchTemplate>
      <NickNameSearch onSearch={onSearch} />
      <MatchList
        key="1"
        username={username}
        matches={matches}
        status={status}
      />
    </MatchTemplate>
  );
};

export default App;
