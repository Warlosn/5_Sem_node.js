const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://Warlosn:dfyef2001@cluster0.6mpdo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dataBase = 'BSTU';
const client = new MongoClient(uri);


async function getHandler(req, res) {
    const url = req.url;

    switch (url) {
        case '/api/faculty':
        case '/api/pulpit':
            const parseUrl = url.split('/');
            const nameCollection = parseUrl[2];

            await client.connect();
            const collection = await client.db(dataBase).collection(nameCollection);//обращение к бд
            const docs = await collection.find({}).toArray();// для поиска строк
            res.end(JSON.stringify(docs));
            break;
    }
}

async function postHandler(req, res) {
    const url = req.url;

    switch (url) {
        case '/api/faculty':
        case '/api/pulpit':
            const parseUrl = url.split('/');
            const nameCollection = parseUrl[2];

            let strInsertObj = '';
            req.on('data', data => {
                strInsertObj += data;
            });
            req.on('end', async () => {
                try {
                    const insertObj = JSON.parse(strInsertObj);

                    await client.connect();
                    const collection = await client.db(dataBase).collection(nameCollection);

                    //region Проверка на уникальность
                    const docs = await collection.find({}).toArray();
                    docs.forEach(doc => {
                        if (doc[nameCollection] === insertObj[nameCollection])
                            throw new Error();
                    });
                    //endregion

                    const insertResult = await collection.insertOne(insertObj);
                    res.end(JSON.stringify(insertResult));
                } catch (err) {
                    res.end(JSON.stringify({error: 'error', message: `Не удалось добавить данные в таблицу ${nameCollection}`}));
                }
            });
            break;
    }
}

function putHandler(req, res) {
    const url = req.url;

    switch (url) {
        case '/api/faculty':
        case '/api/pulpit':
            const parseUrl = url.split('/');
            const nameCollection = parseUrl[2];

            let strUpdateObj = '';
            req.on('data', data => {
                strUpdateObj += data;
            });
            req.on('end', async () => {
                try {
                    const updateObj = JSON.parse(strUpdateObj);

                    await client.connect();
                    const collection = await client.db(dataBase).collection(nameCollection);

                    const updateResult = await collection.findOneAndUpdate({[nameCollection]: updateObj[nameCollection]}, {$set: updateObj}, {returnDocument: 'after'});
                    res.end(JSON.stringify(updateResult));
                } catch (err) {
                    res.end(JSON.stringify({error: 'error', message: `Не удалось обновить данные в таблице ${nameCollection}`}));
                }
            });
            break;
    }
}

async function deleteHandler(req, res) {
    const url = req.url;

    switch (true) {
        case /^\/api\/faculty\//.test(url):
        case /^\/api\/pulpit\//.test(url):
            const parseUrl = url.split('/');
            const nameCollection = parseUrl[2];
            const id = parseUrl[3];

            try {
                await client.connect();
                const collection = await client.db(dataBase).collection(nameCollection);
                const deleteResult = await collection.findOneAndDelete({[nameCollection]: id});
                res.end(JSON.stringify(deleteResult));
            } catch (err) {
                res.end(JSON.stringify({error: 'error', message: `Не удалось удалить данные из таблицы ${nameCollection} по ключу ${id}`}));
            }

            break;
    }
}

module.exports = {
    getHandler,
    postHandler,
    putHandler,
    deleteHandler
};