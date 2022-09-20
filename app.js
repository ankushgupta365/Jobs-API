require('dotenv').config();
require('express-async-errors');

//extra security pacakages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const express = require('express');
const app = express();

//swagger ui
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

//connecting to db
const connectDB = require('./db/connect')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())
const AuthenticationMiddleware = require('./middleware/authentication')
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">See Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(swaggerDocument))
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/job', AuthenticationMiddleware,jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
