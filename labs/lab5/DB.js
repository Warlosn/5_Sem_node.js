var util = require('util')
var ev = require('events');


var db_data = [
                {id: 1, name: 'Ivan', bday:'2001-09-27'},
                {id: 2, name: 'Nikita', bday:'2002-08-22'},
                {id: 3, name: 'Dima', bday:'2001-05-02'},
                {id: 4, name: 'Kirill', bday:'2002-08-22'},
                {id: 4, name: 'Karolina', bday:'2002-03-20'},
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
        return db_data.splice(index, 1, row)//начало изменения, кол-во удаленных, добавленные
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
        console.log('this function is not useless')
    }
}
util.inherits(DB, ev.EventEmitter);// DB наследует EventEmitter
exports.DB = DB; //экспортируется объект DB