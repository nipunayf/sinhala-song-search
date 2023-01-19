/**
 * Returns all the documents
 *
 * @param template
 * @param default_size
 */
function generate_all(template, default_size) {
    template.body.size = default_size
    template.body.query = {
        match_all: {}
    };
}

/**
 * Generate multi_match query for non-metaphor fields
 *
 * @param query
 * @param boosted_fields
 * @returns {{query: *, fields, type: string, operator: string}}
 */
function generate_multi_match(query, boosted_fields) {
    return {
        query: query.trim(),
        fields: boosted_fields,
        operator: 'or',
        type: 'best_fields'
    }
}

/**
 * Generate nested query for metaphor field
 *
 * @param query
 * @returns {{path: string, query: {multi_match: {query: *, fields: string[]}}, inner_hits: {}}}
 */
function generate_nested_query(query) {
    return {
        path: "metaphor",
        "query": {
            "multi_match": {
                "query": query.trim(),
                "fields": ["metaphor.line^1", "metaphor.source^1.2"]
            }
        },
        "inner_hits": {}
    };
}

/**
 * Generate query for general queries
 *
 * @param template
 * @param query
 * @param boost_fields
 */
function generate_general(template, query, boost_fields) {
    template.query = {
        bool: {
            should: [{
                multi_match: generate_multi_match(query, boost_fields)
            }, {
                nested: generate_nested_query(query)
            }]
        }
    }
}

/**
 * Generate query for metaphor specific query
 *
 * @param template
 * @param query
 * @param boost_fields
 */
function generate_specific(template, query, boost_fields) {
    template.query = {
        bool: {
            should: [{
                multi_match: generate_multi_match(query, boost_fields)
            }],
            filter: [{
                nested: generate_nested_query(query)
            }]
        }
    }
}

module.exports = {
    generate_all,
    generate_general,
    generate_specific
}