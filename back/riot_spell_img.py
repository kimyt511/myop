import requests

spells = []

# get Json File
datas = requests.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/summoner.json')
datas = datas.json()

# champion Name parsing
for data in datas["data"]:
    spells.append(data)

print(spells)
for spell in spells:
    save_path = "./image/" + spell + ".png"
    image_url = "http://ddragon.leagueoflegends.com/cdn/13.15.1/img/spell/" + spell + ".png"

    download_image = requests.get(image_url)

    with open(save_path, 'wb') as file:
        file.write(download_image.content)