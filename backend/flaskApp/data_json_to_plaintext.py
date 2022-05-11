import sys
import json
from bs4 import BeautifulSoup
from markdown import markdown
import requests
import cv2
import pytesseract
import os

pytesseract.pytesseract.tesseract_cmd = 'C:/Program Files/Tesseract-OCR/tesseract.exe'

tmpFile = 'tmp.img'

# Credit to https://gist.github.com/lorey/eb15a7f3338f959a78cc3661fbc255fe
def markdown_to_text(markdown_string):
    """ Converts a markdown string to plaintext """

    # md -> html -> text since BeautifulSoup can extract text cleanly
    markdown_string = markdown_string.replace('\n', ' ').strip()
    html = markdown(markdown_string)

    # # remove code snippets
    # html = re.sub(r'<pre>(.*?)</pre>', ' ', html)
    # html = re.sub(r'<code>(.*?)</code >', ' ', html)

    # extract text
    soup = BeautifulSoup(html, "html.parser")

    # Convert any image into text
    for img in soup.find_all('img'):
        # Retreive image bytes
        imgContent = requests.get(img["src"])
        imgBytes = imgContent.content

        # Convert to text
        with open(tmpFile, 'wb+') as f:
            f.write(imgBytes)

        cvImg = cv2.imread(tmpFile)
        config = ('-l eng --oem 1 --psm 3')
        imgText = pytesseract.image_to_string(cvImg, config=config).replace('\n', ' ').strip()


        # imgText = 'some string'
        # Add text to HTML representation
        imgTextTag = soup.new_string(imgText)
        img.replace_with(imgTextTag)
    
    text = ''.join(soup.findAll(text=True))

    return text

def data_json_to_plaintext(input_json, out_file):
    with open(input_json) as f:
        data = json.loads(f.read())

        outFile = open(out_file, 'w+')

        for entry in data:
            totalDoc = entry["post"]["title"] + ' ' + entry["post"]["body"] + ' '
            for comment in entry["comments"]:
                totalDoc += comment + ' '

            plaintext = markdown_to_text(totalDoc)

            outFile.write(plaintext)
            outFile.write('\n')
        
        outFile.close()
        os.remove(tmpFile)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: {} [input_json] [output_file]".format(sys.argv[0]))
        sys.exit(1)
    
    input_json = sys.argv[1]
    out_file = sys.argv[2]

    data_json_to_plaintext(input_json, out_file)
