#overlay CE star thingy over the CE image, resize, and save
import json
from PIL import Image

with open('./ce_cirno.json') as json_file:
    data = json.load(json_file)
    for p in data:
        if p["number"] > 1003 and p["number"] < 1026:
            print p["number"]
            bg_path = "./CE/" + str(p["number"]) + ".jpg"
            background = Image.open(bg_path)
            if p["cost"] == 5:
                overlay = Image.open("essence_card_03.png").convert("RGBA")
            elif p["cost"] == 9:
                overlay = Image.open("essence_card_04.png").convert("RGBA")
            elif p["cost"] == 12:
                overlay = Image.open("essence_card_05.png").convert("RGBA")
            else:
                continue
            background.paste(overlay, (0, 0), overlay)
            background = background.resize((129,220), Image.ANTIALIAS)
            save_path = "./CE/modified/" + str(p["number"]) + ".png"
            background.save(save_path, format="png")
