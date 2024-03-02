import mysql from 'mysql2/promise';

interface QueryDb {
    query: string;
    values?: any[];
}

export async function queryDb({
    query='',
    values=[]
}: QueryDb) {

    console.log("TRY CONNET DB");

    const conn = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

    try {
        conn.connect();

        console.log('Connected to database, QUERY : ', query);
        console.log('Connected to database, VALUES : ', values);
        
        const [results] = await conn.execute(query, values);
        console.log(results);
        conn.end();
        return results;
    } catch (error:any) {
        throw Error(error.message);
    }

}

