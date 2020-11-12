const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id: process.env.SEARCH_ID,
  },
  auth: {
    username: process.env.SEARCH_USER,
    password: process.env.SEARCH_PASSWORD,
  },
});

const updateByIndexAndId = async (index, id, body) => {
  try {
    const {
      body: { hits: result },
    } = await client.search({
      index: index,
      body: {
        query: {
          match: {
            id: {
              query: id,
            },
          },
        },
      },
    });

    const elasticId = result.hits[0]._id;

    await client.update({
      index: index,
      id: elasticId,
      body: {
        doc: body,
      },
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e };
  }
};

module.exports = updateByIndexAndId;
