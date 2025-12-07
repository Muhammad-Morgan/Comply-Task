const dotenv = require(\"dotenv\"); 
dotenv.config(); 
const { Pool } = require(\"pg\"); 
const pool = new Pool({ connectionString: process.env.DATABASE_URL }); 
pool.query(\"select now()\").then((r) = console.log(r.rows); }).catch((err) = console.error(err); }).finally(() =
