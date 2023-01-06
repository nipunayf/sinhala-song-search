from scrapy import Spider, Request
from mtranslate import translate
from re import sub, split

artists = ['nanda-malani', 'sunil-edirisinghe', 'amaradewa', 'kasun-kalhara', 'edward-jayakody', 'h-r-jothipala',
           'gunadasa-kapuge']


def translate_sinhala(english_text):
    return list(set(translate(x, 'si', 'en') for x in english_text))


class SinhalaSongBookCrawler(Spider):
    name = "songbook"
    songs = []

    start_urls = [f'https://www.sinhalasongbook.com/category/{artist}/' for artist in artists]

    def parse(self, response):
        for link in response.css("a.entry-title-link ::attr(href)").getall():
            if link is not None:
                yield Request(response.urljoin(link), callback=self.parse_song)

        pagination = response.css("li.pagination-next ::attr(href)").getall()
        if pagination:
            yield Request(pagination[0], self.parse)

    def parse_song(self, response):
        data = {}

        data['title'] = split("-|–", response.css("h1.entry-title ::text").getall()[0])[1].strip()
        data['artist'] = translate_sinhala(response.css("div.su-column-inner span.entry-categories a ::text").getall())
        data['composer'] = translate_sinhala(response.css("div.su-column-inner span.music a ::text").getall())
        data['genre'] = translate_sinhala(response.css("div.su-column-inner span.entry-tags a ::text").getall())
        data['writer'] = translate_sinhala(response.css("div.su-column-inner span.lyrics a ::text").getall())
        data['views'] = int(sub('[^0-9,]', "", response.css("div.tptn_counter ::text").get()).replace(',', ''))
        data['metaphor'] = [
            {'line': '', 'target': '', 'source': '', 'meaning': ''}
        ]

        # Remove the key n beats from the lyrics
        raw_lyrics = response.css("pre ::text").getall()
        song = ''
        check_newline = False
        for line in raw_lyrics:
            lines = (sub("[\da-zA-Z\d0-9\-—\[\]()}{@_!#+$%^&*<>?|~:∆/]", "", line)).split('\n')
            for line_l in lines:
                if line_l.isspace() or line_l == "":
                    if check_newline:
                        song += '\n'
                        check_newline = False
                else:
                    song += line_l.strip()
                    check_newline = True
        data['lyrics'] = song

        yield data
