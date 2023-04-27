const server = require('./src/app');
const { database } = require('./src/db');


const port = process.env.PORT || 3001;

database.sync({force: true}).then(() => {

    console.info('Database connected')
    server.listen(port, () => {
        console.log(`Server on port ${port}`)
    })

})