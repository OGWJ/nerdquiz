const db = require("./init");
const fs = require("fs");

const seeds = fs.readFileSync(__dirname + "/dev_seeds.sql").toString();

//db.query(seeds, () => console.log("Dev database seeded"));
db.query(seeds, async () => {
    console.log("Dev database seeded")
    console.log(await db.query(`SELECT * FROM scores;`))
});
