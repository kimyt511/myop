import { MdKeyboardArrowDown } from 'react-icons/md';
import './MatchListItem.scss';
import { ChampIdDict, QueueIdDict, SpellIdDict } from '../RiotData';
import { TimeToString, StartDayFromToDay } from '../Util';
const MatchListItem = ({ username, match }) => {
  const { id, queue_id, play_time, players, gameCreation } = match;
  const user_info = players.filter(
    (e) => e.summonerName.split(' ').join('') === username.split(' ').join(''),
  )[0];
  const user_is_win =
    user_info.teamId === 100 ? match.teams[0].win : match.teams[1].win;
  const user_item_arr = [
    user_info.item0,
    user_info.item1,
    user_info.item2,
    user_info.item3,
    user_info.item4,
    user_info.item5,
    user_info.item6,
  ];
  const user_kda_percentage = parseInt(
    ((user_info.kills + user_info.assists) /
      match.teams[user_info.teamId === 100 ? 0 : 1].objectives.champion.kills) *
      100,
  );
  const blue_team_players = players.filter((e) => e.teamId === 100);
  const red_team_players = players.filter((e) => e.teamId === 200);
  const champion_image_src = (id) =>
    'image/champions/' + ChampIdDict[id] + '.png';
  const spell_image_src = (id) => 'image/spells/' + SpellIdDict[id] + '.png';
  const item_image_src = (id) => 'image/items/' + id + '.png';
  return (
    <div
      className="MatchListItem"
      style={{ background: user_is_win ? '#ecf2ff' : '#fff1f3' }}
    >
      <div className="Info">
        <div className="matchInfo">
          <div
            className="type"
            style={{ color: user_is_win ? '#4171d6' : '#D31A45' }}
          >
            {QueueIdDict[queue_id]}
          </div>
          <div className="time-stamp">{StartDayFromToDay(gameCreation)}</div>
          <div
            className="bar"
            style={{ background: user_is_win ? '#d5e3ff' : '#FFD8D9' }}
          ></div>
          <div className="result">{user_is_win ? '승리' : '패배'}</div>
          <div className="length">{TimeToString(play_time)}</div>
        </div>
        <div className="champInfo">
          <div>
            <div className="champion">
              <div className="icon">
                <a href={user_info.champion} target="_blank" rel="noreferrer">
                  <img
                    src={champion_image_src(user_info.champion)}
                    width="48"
                    height="48"
                    alt="no_img"
                  />
                  <span className="champion-level">{user_info.level}</span>
                </a>
              </div>
              <div className="spells">
                <div className="spell">
                  <img
                    src={spell_image_src(user_info.spell1)}
                    width="22"
                    height="22"
                    alt="no_img"
                  />
                </div>
                <div className="spell">
                  <img
                    src={spell_image_src(user_info.spell2)}
                    width="22"
                    height="22"
                    alt="no_img"
                  />
                </div>
              </div>
            </div>
            <div className="kda">
              <div className="k-d-a">
                <span>{user_info.kills}</span>/
                <span className="d">{user_info.deaths}</span>/
                <span>{user_info.assists}</span>
              </div>
              <div className="ratio">
                <span>{user_info.kda + ':1'}</span>
                평점
              </div>
            </div>
            <div className="stats">
              <div className="p-kill">
                {'킬관여 ' + user_kda_percentage + '%'}
              </div>
              <div className="ward">{'시야점수 ' + user_info.visionscore}</div>
              <div className="cs">{'CS ' + user_info.cs}</div>
            </div>
          </div>
          <div>
            <div className="items">
              <ul>
                {user_item_arr.map((item, idx) => {
                  if (item === 0)
                    return (
                      <li
                        key={'item' + idx}
                        style={{
                          background: user_is_win ? '#b3cdff' : '#FFBAC3',
                        }}
                      ></li>
                    );
                  else
                    return (
                      <li key={'item' + idx}>
                        <img
                          src={item_image_src(item)}
                          width="22"
                          alt="no_image"
                          height="22"
                        />
                      </li>
                    );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="teamInfo">
          <ul>
            {blue_team_players.map((player) => (
              <li key={'player' + player.id}>
                <div className="icon">
                  <img
                    src={champion_image_src(player.champion)}
                    width="16"
                    alt="no_img"
                    height="16"
                  />
                </div>
                <div className="name">
                  <a
                    href={'summoners/' + decodeURI(player.summonerName)}
                    style={{
                      fontWeight:
                        player.id === user_info.id ? 'bold' : 'normal',
                    }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {decodeURI(player.summonerName)}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <ul>
            {red_team_players.map((player) => (
              <li key={'player' + player.id}>
                <div className="icon">
                  <img
                    src={champion_image_src(player.champion)}
                    width="16"
                    alt="no_img"
                    height="16"
                  />
                </div>
                <div className="name">
                  <a
                    href={'summoners/' + decodeURI(player.summonerName)}
                    style={{
                      fontWeight:
                        player.id === user_info.id ? 'bold' : 'normal',
                    }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {decodeURI(player.summonerName)}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className={user_is_win ? 'detail-win' : 'detail-lose'}>
        <MdKeyboardArrowDown />
      </button>
    </div>
  );
};

export default MatchListItem;
