import json
from bs4 import BeautifulSoup
from markdown import markdown
import requests


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

    for img in soup.find_all('img'):
        imgContent = requests.get(img["src"])
        imgBytes = imgContent.content
        # Convert to text

        imgText = 'some text'
        imgTextTag = soup.new_string(imgText)
        img.replace_with(imgTextTag)
    
    text = ''.join(soup.findAll(text=True))

    return text

if __name__ == "__main__":
    with open('./metadata.json') as f:
        data = json.loads(f.read())

        outFile = open('./data/data.dat', 'w+')

        for entry in data:
            totalDoc = entry["post"]["body"] + ' '
            for comment in entry["comments"]:
                totalDoc += comment + ' '

            plaintext = markdown_to_text(totalDoc)

            outFile.write(plaintext)
            outFile.write('\n')
        
        outFile.close()
