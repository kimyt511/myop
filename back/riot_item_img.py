import requests

items = []

# get Json File
datas = requests.get('https://ddragon.leagueoflegends.com/cdn/12.6.1/data/ko_KR/item.json')
datas = datas.json()

# champion Name parsing
for data in datas["data"]:
    items.append(data)


for item in items:
    save_path = "./image/" + item + ".png"
    image_url = "http://ddragon.leagueoflegends.com/cdn/12.7.1/img/item/" + item + ".png"

    download_image = requests.get(image_url)

    with open(save_path, 'wb') as file:
        file.write(download_image.content)