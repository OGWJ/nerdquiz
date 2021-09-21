



describe('fetch request', () => {
  test('it makes a request to the api', async () => {
    let cat = 15
    let diff = 'easy'
    const questions = await getQuestions(cat, diff)
    expect(questions[0].correct_answer).toBe('Rad Mobile')
  })
})
