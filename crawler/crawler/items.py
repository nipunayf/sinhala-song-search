import scrapy


class SinhalaLyricsItem:
    title = scrapy.Field()
    artist = scrapy.Field()
    writer = scrapy.Field()
    composer = scrapy.Field()
    genre = scrapy.Field()
    views = scrapy.Field()
    lyrics = scrapy.Field()
