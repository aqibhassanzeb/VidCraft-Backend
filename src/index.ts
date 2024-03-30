import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // It's a good practice to import without using require if possible
import * as dotenv from "dotenv";
import routes from "./routes/routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS with specific options
app.use(cors({
  origin: 'https://vid-craft.vercel.app',
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: false,
}));

// Parse JSON bodies with a larger limit if needed
app.use(bodyParser.json({ limit: '100mb' }));

// Define your routes
app.use('/api', routes);

// Test route
app.get('/test', (req, res) => {
  res.send('backend running...'); 
});

// Root route
app.get('/', (req, res) => {
  res.send('Mediacraft');
});

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Set the server timeout
server.setTimeout(500000);
