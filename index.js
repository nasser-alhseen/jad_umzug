import app from './app.js';

//run at port
app.listen(process.env.PORT, () => {
    console.log(`Server Run of Port : ${process.env.PORT}  ✔✅`);
});
