


const [ questions, setQuestions] = useState([])
async function getQuestions(cat, diff) {
    const url = `https://opentdb.com/api.php?amount=50&category=${cat}&difficulty=${diff}&type=multiple`;
    const { data } = await axios.get(url);
    setQuestions(data.results)
    return data.results;
}


console.log(questions)
module.exports = getQuestions;