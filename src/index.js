const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
// const {Client} = require('pg'); // postgres

// init app
const PORT = process.env.PORT || 4000; // هيك معناه ي نستخدم ٤٠٠٠ كديفولت بورت او راح استخدم البورت الي برسله
// طيب كيف هنرسله مع الكونتينر اذا كنا نستخدم الدوكر فايل بدون الدوكر كمبووز هذي الطريقه الاولى
// ENV PORT = 4000 اول شي نكتب هيك 
// EXPOSE $PORT وبعدها نكتب جنب كلمه
// الطريقه الثانيه انه نرسله مع الرن كود عبر التيرمنال 
// docker run --name express-node-app-container -v $(pwd)/src:/app/src:ro --env PORT=4000 -d -p 4000:4000 express-node-app
// --env PORT=4000 بالطريقه هذي نرسلها مع الكود ونقدر نضيف اكثر من انف كمان 
// اللحين لو دخلنا على الكونتينر بعد ما سوينا للكونتينر رن
// راح تستعرضهم لي كلهم printenv الي جوا الكونتينر  بكتب الامر هذا في التريمنال  Environment Variables عشان استعرض كل 
// مو منطقي اكتبهم كلهم الحل هو  Environment Variables طيب مثلا لو كان عندي اكثر من 
// حقاتي  Environment Variables واكتب جواه .env اني اسوي ملف اسمه 
// الامر يتغير واكتب انه يروح ياخذهم من ملف الانف
// docker run --name express-node-app-container -v $(pwd)/src:/app/src:ro --env-file ./.env -d -p 4000:4000 express-node-app

// طبعا كل الشرح هذا بدون ما نستخدم دوكر كمبوز معاه الوضع شوي اسهل شوف التكمله في ملف الكمبوز 


const app = express();

// connect to redis
const REDIS_PORT = 6379
const REDIS_HOST = "redis"
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
}) 
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("connected to redis"));
redisClient.connect();


// connect mongo db
const DB_USER = "root"
const DB_PASSWORD = "example"
const DB_PORT = 27017
const DB_HOST = "mongo"
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`
mongoose.connect(URI).then(()=> console.log("connected to Mongo db...")).catch((err) => console.log(`failed to connect to db :`, err));

// connect postgres db
// const DB_USER = "root"
// const DB_PASSWORD = "example"
// const DB_PORT = 5432
// const DB_HOST = "postgres"
// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//     connectionString: URI,
// })
// client
//     .connect()
//     .then(()=> console.log("connected to db..."))
//     .catch((err) => console.log(`failed to connect to db :`, err));


app.get('/', (req, res) => {
    redisClient.set('Products', 'products...');
    res.send('<h1>Hello Albaraa sss</h1>')
});

app.get('/data', async(req, res) => {
    const products = await redisClient.get('Products');
    res.send(`<h1>Hello ${products}</h1>`)
});

app.listen(PORT, () => console.log(`App is up and running on port: ${PORT}`));