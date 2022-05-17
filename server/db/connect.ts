const pg = require("pg");

const {types} = pg
pg.defaults.parseInputDatesAsUTC = true

// fix node-pg default transformation for date types
// https://github.com/brianc/node-pg-types
// https://github.com/brianc/node-pg-types/blob/master/lib/builtins.js
types.setTypeParser(types.builtins.DATE, str => str)
types.setTypeParser(types.builtins.TIMESTAMP, str => str)
types.setTypeParser(types.builtins.TIMESTAMPTZ, str => str)

let db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})


module.exports = db