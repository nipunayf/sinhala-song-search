const express = require('express');
const router = express.Router();

const {Client} = require('@elastic/elasticsearch');
const client = new Client({
    cloud: {id: 'cloud_id'},
    auth: {apiKey: 'api_key'}
})

const keywords = require("../res/keywords.json");

router.post('/', async function (req, res, next) {
    let query = req.body.query;
    const query_words = query.trim().split(" ");

    let sorting = false;
    let range = 0;
    const boost_fields = {
        artist: 1,
        title: 1.2,
        composer: 1,
        genre: 1,
        writer: 1,
        metaphor: 1,
    }

    query_words.forEach(query_word => {
        let changed = false;
        if (keywords.artist.includes(query_word)) {
            boost_fields.artist += 1;
            changed = true;
        }
        if (keywords.composer.includes(query_word)) {
            boost_fields.composer += 1;
            changed = true;
        }
        if (keywords.genre.includes(query_word)) {
            boost_fields.genre += 1;
            changed = true;
        }
        if (keywords.writer.includes(query_word)) {
            boost_fields.writer += 1;
            changed = true;
        }
        if (keywords.song.includes(query_word)) {
            changed = true;
        }
        if (keywords.metaphor.includes(query_word)) {
            boost_fields.metaphor += 1;
            changed = true;
        }
        if (keywords.sorting.includes(query_word)) {
            sorting = true;
            changed = true;
        }
        if (!isNaN(query_word)) {
            range = parseInt(query_word);
            changed = true;
        }
        query = changed ? query.replace(query_word, '') : query;
    })


    let size = range > 0 ? range : 10;
    let sort = sorting ? [{views: {order: "desc"}}] : [];

    const result = await client.search({
        index: 'sinhala-songs',
        body: {
            size,
            sort,
        }, query: {
            multi_match: {
                query: query.trim(),
                fields: [`artist^${boost_fields.artist}`, `title^${boost_fields.title}`, `composer^${boost_fields.composer}`, `genre^${boost_fields.genre}`,
                    `writer^${boost_fields.writer}`, `metaphor.source^${boost_fields.metaphor}`, `metaphor.line^${boost_fields.metaphor}`, 'lyrics'],
                operator: "or",
                type: 'cross_fields'
            }
        },
    });

    console.log({
        index: 'sinhala-songs',
        body: {
            size,
            sort,
        }, query: {
            multi_match: {
                query: query.trim(),
                fields: [`artist^${boost_fields.artist}`, `title^${boost_fields.title}`, `composer^${boost_fields.composer}`, `genre^${boost_fields.genre}`,
                    `writer^${boost_fields.writer}`, `metaphor.source^${boost_fields.metaphor}`, `metaphor.line^${boost_fields.metaphor}`, 'lyrics'],
                operator: "or",
                type: 'cross_fields'
            }
        },
    })

    console.log(result)
    res.send(result.hits);
});

module.exports = router;
