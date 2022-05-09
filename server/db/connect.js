const pg = require("pg");

function connectDB(url) {
    return new pg.Pool({
        connectionString: url,
        ssl: {
            rejectUnauthorized: false
        }
    })
}

module.exports = connectDB