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

const postByIndex = async (index, body) => {
  try {
    await client.index({
      index: index,
      body: body,
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, msg: e };
  }
};

module.exports = postByIndex;
