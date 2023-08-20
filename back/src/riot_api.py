import requests
from urllib import parse
import pprint
pp = pprint.PrettyPrinter(indent=4)

api_key = 'RGAPI-dfea7e4d-9909-47aa-b976-abc8f5b9e9e9'
puuid = 'rFRi2rfiV-fmDO9BurAwNpOyQRFuh48QpZU_SAfXve2qQq3qRZ96yTEF70Z6YJLzcbr39dQth9amGQ'

request_header = {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                    "Origin": "https://developer.riotgames.com",
                    "X-Riot-Token": api_key
                }

def summoner_v4_by_summoner_name(summonerName):
    encodingSummonerName = parse.quote(summonerName)
    url = f"https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/{encodingSummonerName}"
    return requests.get(url, headers=request_header).json()

def match_v5_by_puuid(puuid):
    url = f"https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=20"
    return requests.get(url, headers=request_header).json()

def match_v5_by_matchid(matchid):
    url = f"https://asia.api.riotgames.com/lol/match/v5/matches/{matchid}"
    return requests.get(url, headers=request_header).json()
# pp.pprint(match_v5_by_puuid(puuid))
data = match_v5_by_matchid(matchid='KR_6629716754')['info']
match = {}
match['play_time'] = data['gameDuration']
match['queue_id'] = data['queueId']
match['mapId'] = data['mapId']
match['teams'] = data['teams']
match['players'] = []

for part in data['participants']:
    player = dict()
    player['id'] = part['participantId']
    player['summonerName'] = part['summonerName']
    player['teamId'] = part['teamId']
    player['champion'] = part['championId']
    player['spell1'] = part['summoner1Id']
    player['spell2'] = part['summoner2Id']
    player['level'] = part['champLevel']
    player['kills'] = part['kills']
    player['deaths'] = part['deaths']
    player['assists'] = part['assists']
    player['kda'] = round((player['kills'] + player['assists']) / player['deaths'], 2)
    player['item0'] = part['item0']
    player['item1'] = part['item1']
    player['item2'] = part['item2']
    player['item3'] = part['item3']
    player['item4'] = part['item4']
    player['item5'] = part['item5']
    player['item6'] = part['item6']
    player['visionscore'] = part['visionScore']
    player['gold'] = part['goldEarned']
    player['cs'] = part['totalMinionsKilled']
    player['totalDamageDealtToChampions'] = part['totalDamageDealtToChampions']
    match['players'].append(player)

pp.pprint(match)