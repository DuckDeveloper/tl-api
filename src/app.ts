import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from 'config'
import path from 'path'

const app = express()

app.use(express.json())
app.use(cors({
	origin: config.get('UI_URI'),
}))

app.use('/files', express.static(path.resolve(__dirname, 'files')))

const PORT = config.get('PORT') || 5000

const start = async () => {
	try {
		mongoose.set('strictQuery', false)
		await mongoose.connect(config.get('MONGO_URI'))

		app.listen(PORT, () => console.log(`App has been started on port ${ PORT }...`))
	} catch(e) {
		process.exit(1)
	}
}

start()
