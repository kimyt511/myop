import './MatchTemplate.scss';

const MatchTemplate = ({ children }) => {
  return (
    <div className="MatchTemplate">
      <div className="app-title">전적검색</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default MatchTemplate;
