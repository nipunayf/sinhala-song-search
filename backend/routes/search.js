const express = require('express');
const router = express.Router();

const {Client} = require('@elastic/elasticsearch');
const {generate_all, generate_general, generate_specific} = require('./elastic');
const client = new Client({
    cloud: {id: 'cloud_id'},
    auth: {apiKey: 'api_key'}
})
const keywords = require("../res/keywords.json");

router.post('/', async function (req, res, next) {
    let query = req.body.query;
    let index = req.body.index;
    let sorting = false;
    const default_size = 6;
    let range = 0;


    let query_template = {
        index: 'sinhala-songs',
        _source: {
            includes: [
                "metaphor", "title", "artist", "composer", "writer", "genre"
            ]
        },
        body: {
            from: index === 0 ? 0 : index * default_size + 1
        },
        aggs: {
            genre_cat: {
                terms: {
                    field: "genre",
                    size: 10
                }
            }
        }
    }

    // If the query is empty, return everything
    if (query.length === 0) {
        generate_all(query_template, default_size);
    } else { // Apply field boosting and filtering
        let specific_metaphor = false;
        const query_words = query.trim().split(" ");
        const boost_fields = {
            artist: 1,
            title: 1,
            composer: 1,
            genre: 1,
            writer: 1,
        }

        // Remove the keywords from the query
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
                specific_metaphor = true;
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


        query_template.body.sort = sorting ? [{views: {order: "desc"}}] : [];
        query_template.body.size = range > 0 ? range : default_size;

        const boosted_array = [`artist^${boost_fields.artist}`, `title^${boost_fields.title}`, `composer^${boost_fields.composer}`,
            `genre^${boost_fields.genre}`, `writer^${boost_fields.writer}`, 'lyrics']

        specific_metaphor ? generate_general(query_template, query, boosted_array) : generate_specific(query_template, query, boosted_array);
    }
    const result = await client.search(query_template);

    let parent_arr = []
    result.hits.hits.forEach(hit => {
        hit._source.metaphor.forEach(metaphor => {
            parent_arr.push({
                line: metaphor.line,
                source: metaphor.source,
                target: metaphor.target,
                meaning: metaphor.meaning,
                title: hit._source.title,
                artist: hit._source.artist,
                composer: hit._source.composer,
                writer: hit._source.writer,
                genre: hit._source.genre,
            })
        })
    })

    res.send({
        hits: result.hits.total.value,
        data: parent_arr,
        aggs: result.aggregations.genre_cat.buckets
    });
});

module.exports = router;
