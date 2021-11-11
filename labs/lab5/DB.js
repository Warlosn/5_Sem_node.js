var util = require('util')
var ev = require('events');
const { parse } = require('querystring');

var db_data = [
                {id: 1, name: 'Smith', bday:'2001-01-01'},
                {id: 2, name: 'Adam', bday:'2002-02-02'},
                {id: 3, name: 'Merhel', bday:'2003-03-03'},
                {id: 4, name: 'Kovalenok', bday:'2004-04-04'},
                {id: 5, name: 'Red', bday:'2005-05-05'},
                {id: 6, name: 'Table', bday:'2006-06-06'},
]

function DB()
{
    this.select = () => { 
        return db_data; 
    }

    this.insert = (newRow) => { 
        db_data.push(newRow); 
    }

    this.getIndex = () => {
        return db_data.length;
    }

    this.update = (row) => {
        let index = db_data.findIndex(i => i.id == row.id)
        return db_data.splice(index, 1, row)
    }

    this.delete = (index) => {
        if (db_data.findIndex(i => i.id == index) > -1){
            
            return db_data.splice(db_data.findIndex(i => i.id == index), 1)
        }
        else {
            return JSON.parse('{"error": "no index"}');
        }
    }

    this.commit = () => {
        console.log('lets pretend we can see commit')
    }
}


util.inherits(DB, ev.EventEmitter);
exports.DB = DB