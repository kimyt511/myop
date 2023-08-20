import './ErrorPage.scss';

const ErrorPage = ({ status }) => {
  if (status === 404) {
    return (
      <div className="NotExistSummonerName">
        <h>존재하지 않는 소환사명입니다</h>
      </div>
    );
  } else if (status === 403) {
    return (
      <div className="ExpiredKey">
        <h>만료된 키입니다</h>
      </div>
    );
  }
};

export default ErrorPage;
