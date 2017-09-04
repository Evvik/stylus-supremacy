const fs = require('fs')

const process = require('../edge/commandLineProcessor')
const createCodeForFormatting = require('../edge/createCodeForFormatting')

const inputTempFile = '__commandLineProcessorInput.styl'
const optionTempFile = '__formattingOptions.json'
const outputTempFile = '__commandLineProcessorOutput.styl'

describe('commandLineProcessor', () => {
	let Console

	beforeEach(() => {
		Console = {
			_log: [],
			log(...data) {
				this._log.push(data)
			},
			_error: [],
			error(...data) {
				this._error.push(data)
			},
		}
	})

	afterEach(() => {
		if (fs.existsSync(inputTempFile)) {
			fs.unlinkSync(inputTempFile)
		}

		if (fs.existsSync(optionTempFile)) {
			fs.unlinkSync(optionTempFile)
		}

		if (fs.existsSync(outputTempFile)) {
			fs.unlinkSync(outputTempFile)
		}
	})

	;['--version'].forEach(param => {
		it('prints the current version number', () => {
			process(param, [], Console)
			expect(Console._log[0]).toEqual([jasmine.stringMatching(/v\d+\.\d+\.\d+/)]);
		})
	})

	it('prints the formatted content given no formatting options', () => {
		const inputContent = createCodeForFormatting(`
		body
		  display none
		`)

		const expectContent = createCodeForFormatting(`
		body {
			display: none;
		}
		`)

		fs.writeFileSync(inputTempFile, inputContent)
		process('format', [inputTempFile], Console)
		const outputContent = Console._log[0][0]

		expect(outputContent).toBe(expectContent)
	})

	;['--options', '-p'].forEach(param => {
		it('prints the formatted content given the formatting options', () => {
			const inputContent = createCodeForFormatting(`
			body
			  display none
			`)

			const formattingOptions = `{
				// Comments are acceptable because parsing JSON is being done by https://www.npmjs.com/package/comment-json
				"insertColons": false
			}`

			const expectContent = createCodeForFormatting(`
			body {
				display none;
			}
			`)

			fs.writeFileSync(inputTempFile, inputContent)
			fs.writeFileSync(optionTempFile, formattingOptions)
			process('format', [inputTempFile, param, optionTempFile], Console)
			const outputContent = Console._log[0][0]

			expect(outputContent).toBe(expectContent)
		})
	})

	;['--outDir', '-o'].forEach(param => {
		it('writes the formatted content into the given output directory', () => {
			const inputContent = createCodeForFormatting(`
			body
			  display none
			`)

			const expectContent = createCodeForFormatting(`
			body {
				display: none;
			}
			`)

			fs.writeFileSync(inputTempFile, inputContent)
			process('format', [inputTempFile, param, 'temp'], Console)
			const outputContent = fs.readFileSync('temp/' + inputTempFile, 'utf-8')
			fs.unlinkSync('temp/' + inputTempFile)

			expect(outputContent).toBe(expectContent)
		})
	})

	;['--replace', '-r'].forEach(param => {
		it('writes the formatted content into the given output directory', () => {
			const inputContent = createCodeForFormatting(`
			body
			  display none
			`)

			const expectContent = createCodeForFormatting(`
			body {
				display: none;
			}
			`)

			fs.writeFileSync(inputTempFile, inputContent)
			process('format', [inputTempFile, param], Console)
			const outputContent = fs.readFileSync(inputTempFile, 'utf-8')

			expect(outputContent).toBe(expectContent)
		})
	})

	it('throws an error given an unknown command', () => {
		expect(() => { process('unknown', [], Console) }).toThrow()
	})
})
