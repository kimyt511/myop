import MatchListItem from './MatchListItem';
import ErrorPage from './ErrorPage';
import './MatchList.scss';

const MatchList = ({ username, matches, status }) => {
  if (status === 200) {
    return (
      <div className="MatchList">
        {matches.map((match) => (
          <MatchListItem key={match.id} match={match} username={username} />
        ))}
      </div>
    );
  } else {
    return <ErrorPage status={status} />;
  }
};

export default MatchList;
