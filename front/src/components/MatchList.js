import MatchListItem from './MatchListItem';
import './MatchList.scss';

const MatchList = ({ username, matches }) => {
  return (
    <div className="MatchList">
      {matches.map((match) => (
        <MatchListItem key={match.id} match={match} username={username} />
      ))}
    </div>
  );
};

export default MatchList;
