import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express();

const routes = require('./routes.js')

app.use(cors())
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use('/', routes);

const PORT: number | string = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send(`Server is running on port: ${PORT} home`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})