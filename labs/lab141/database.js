const sql = require('mssql/msnodesqlv8');
let config = {
    "driver":"mssql",
    "connectionString": "Driver={SQL Server Native Client 11.0};Server={DESKTOP-E4TFQEB\\MSSQLSERVER02};Database={Node_13};Trusted_Connection={yes};"
}

class Database {
    constructor() {
        this.connectionPool = new sql.ConnectionPool(config).connect()
        .then(pool => {
            console.log('Connected to Database');
            return pool;
        })
        .catch(error => {
            console.log('Connection Failed: ', error)
        });
    }

    query_result = (err, result) => {
        if (err) {
            console.log('Processing Result error: ', err.code, err.originalError.info.message);
        }
        else {
            console.log('Number of strings: ', result.rowsAffected[0]);
        }
    }

    get_faculty(faculty) {
        return this.connectionPool.then(pool => {
            return pool.request().input('fclt', sql.NVarChar, faculty).query('select * from faculty where faculty = @fclt');
        });
    }

    get_pulpit(pulpit) {
        return this.connectionPool.then(pool => {
            return pool.request().input('plpt', sql.NVarChar, pulpit).query('select * from pulpit where pulpit = @plpt');
        });
    }

    get_subject(subject) {
        return this.connectionPool.then(pool => {
            return pool.request().input('sbj', sql.NVarChar, subject).query('select * from subject where subject = @sbj');
        });
    }

    get_auditorium_type(auditorium_type) {
        return this.connectionPool.then(pool => {
            return pool.request().input('audtype', sql.NVarChar, auditorium_type).query('select * from auditorium_type where auditorium_type = @audtype');
        });
    }

    get_auditorium(auditorium) {
        return this.connectionPool.then(pool => {
            return pool.request().input('aud', sql.NVarChar, auditorium).query('select * from auditorium where auditorium = @aud');
        });
    }

    get_faculties() {
        return this.connectionPool.then(pool => pool.request().query('select * from faculty'));
    }

    get_pulpits() {
        return this.connectionPool.then(pool => pool.request().query('select * from pulpit'));
    }

    get_subjects() {
        return this.connectionPool.then(pool => pool.request().query('select * from subject'));
    }

    get_auditoriumstypes() {
        return this.connectionPool.then(pool => pool.request().query('select * from auditorium_type'));
    }
    
    get_auditoriums() {
        return this.connectionPool.then(pool => pool.request().query('select * from auditorium'));
    }


    post_faculties(faculty, faculty_name) {
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .input('faculty_name', sql.NVarChar, faculty_name)
                .query('insert faculty(faculty, faculty_name) values(@faculty , @faculty_name)');
        });
    }

    post_pulpits(pulpit, pulpit_name, faculty){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpit_name', sql.NVarChar, pulpit_name)
                .input('faculty', sql.NVarChar, faculty)
                .query('insert pulpit(pulpit, pulpit_name, faculty) values(@pulpit , @pulpit_name, @faculty)');
        });
    }

    post_subjects(subject, subject_name, pulpit){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subject_name', sql.NVarChar, subject_name)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('insert subject(subject, subject_name, pulpit) values(@subject , @subject_name, @pulpit)');
        });
    }

    post_auditoriumstypes(auditorium_type, auditorium_typename){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .input('auditorium_typename', sql.NVarChar, auditorium_typename)
                .query('insert auditorium_type(auditorium_type, auditorium_typename) values(@auditorium_type , @auditorium_typename)');
        });
    }

    post_auditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('insert auditorium(auditorium, auditorium_name, auditorium_capacity, auditorium_type)' +
                             ' values(@auditorium, @auditorium_name, @auditorium_capacity, @auditorium_type)');
        });
    }

    put_faculties(faculty, faculty_name){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .input('faculty_name', sql.NVarChar, faculty_name)
                .query('update faculty set faculty_name = @faculty_name where faculty = @faculty');
        });
    }

    put_pulpits(pulpit, pulpit_name, faculty){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpit_name', sql.NVarChar, pulpit_name)
                .input('faculty', sql.NVarChar, faculty)
                .query('update pulpit set pulpit_name = @pulpit_name, faculty = @faculty where pulpit = @pulpit');
        });
    }

    put_subjects(subject, subject_name, pulpit){
        return this.connectionPool.then(pool => {

            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subject_name', sql.NVarChar, subject_name)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('update subject set subject_name = @subject_name, pulpit = @pulpit where subject = @subject');
        });
    }

    put_auditoriumstypes(auditorium_type, auditorium_typename){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .input('auditorium_typename', sql.NVarChar, auditorium_typename)
                .query('update auditorium_type set auditorium_typename = @auditorium_typename where auditorium_type = @auditorium_type');
        });
    }

    put_auditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('update auditorium set auditorium_name = @auditorium_name, auditorium_capacity = @auditorium_capacity, auditorium_type =  @auditorium_type' +
                    ' where auditorium = @auditorium');
        });
    }
    //#endregion

    //#region DELETE requests
    delete_faculties(faculty){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .query('delete from faculty where faculty = @faculty');
        });
    }

    delete_pulpits(pulpit){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .query('delete from pulpit where pulpit = @pulpit');
        });
    }

    delete_subjects(subject){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .query('delete from subject where subject = @subject');
        });
    }

    delete_auditoriumstypes(auditorium_type){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('delete from auditorium_type where auditorium_type = @auditorium_type');
        });
    }

    delete_auditoriums(auditorium){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .query('delete from auditorium where auditorium = @auditorium');
        });
    }
    //#endregion
}

module.exports = Database;