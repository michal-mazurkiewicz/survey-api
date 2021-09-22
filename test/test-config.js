jest.mock('fs/promises', () => ({
	writeFile: jest.fn(),
	readFile: jest.fn().mockResolvedValue({toString: () => JSON.stringify({
		surveys: [
			{
				id: 0,
				question: 'Favorite holidays destination',
				answers: [
					{ id: 0, answer: 'Philippines', votes: 0 },
					{ id: 1, answer: 'Poland', votes: 12 },
				],
			},
		],
	})})
}))

beforeEach(() => {
	jest.clearAllMocks()
})