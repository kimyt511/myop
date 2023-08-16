const axios = require('axios');
const { match } = require('assert');
const express = require('express');

const router = express.Router();

router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  const api_key = 'RGAPI-e69a9de4-6417-465d-9ca0-bcc327193850';
  const summoner_v4_by_summoner_name = async (summonerName) => {
    encodingSummonerName = encodeURI(summonerName);
    const response = await axios.get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodingSummonerName}?api_key=${api_key}`,
    );
    return response.data.puuid;
  };
  const match_v5_by_puuid = async (puuid) => {
    const response = await axios.get(
      `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${api_key}`,
    );
    return response.data;
  };
  const match_v5_by_matchid = async (matchid) => {
    const response = await axios.get(
      `https://asia.api.riotgames.com/lol/match/v5/matches/${matchid}?api_key=${api_key}`,
    );
    return response.data.info;
  };
  const puuid = await summoner_v4_by_summoner_name(req.params.id);
  const match_id_arr = await match_v5_by_puuid(puuid);
  const matchData = [];
  const match_data_by_matchid = async (match_id) => {
    const data = await match_v5_by_matchid(match_id);
    const match = {};
    match['play_time'] = data['gameDuration'];
    match['gameCreation'] = data['gameCreation'];
    match['queue_id'] = data['queueId'];
    match['mapId'] = data['mapId'];
    match['teams'] = data['teams'];
    match['players'] = [];

    data['participants'].forEach((part) => {
      const player = {};
      player['id'] = part['participantId'];
      player['summonerName'] = part['summonerName'];
      player['teamId'] = part['teamId'];
      player['champion'] = part['championId'];
      player['spell1'] = part['summoner1Id'];
      player['spell2'] = part['summoner2Id'];
      player['level'] = part['champLevel'];
      player['kills'] = part['kills'];
      player['deaths'] = part['deaths'];
      player['assists'] = part['assists'];
      player['kda'] =
        player['deaths'] != 0
          ? ((player['kills'] + player['assists']) / player['deaths']).toFixed(
              2,
            )
          : ((player['kills'] + player['assists']) / 1).toFixed(2);
      player['item0'] = part['item0'];
      player['item1'] = part['item1'];
      player['item2'] = part['item2'];
      player['item3'] = part['item3'];
      player['item4'] = part['item4'];
      player['item5'] = part['item5'];
      player['item6'] = part['item6'];
      player['visionscore'] = part['visionScore'];
      player['gold'] = part['goldEarned'];
      player['cs'] = part['totalMinionsKilled'];
      player['totalDamageDealtToChampions'] =
        part['totalDamageDealtToChampions'];
      match['players'].push(player);
    });

    return match;
  };
  for await (const match_id of match_id_arr) {
    const match_data = await match_data_by_matchid(match_id);
    matchData.push(match_data);
  }
  await res.send({ matchData: matchData });
});

module.exports = router;
