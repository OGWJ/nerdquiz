

async function getQuestions(cat, diff) {
    const url = `https://opentdb.com/api.php?amount=50&category=${cat}&difficulty=${diff}&type=multiple`;
    const { data } = await axios.get(url);
    return data.results;
}

module.exports = getQuestions;