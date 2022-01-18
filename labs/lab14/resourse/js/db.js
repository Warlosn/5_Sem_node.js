const sql = require('mssql/msnodesqlv8');

const config = {
    "driver":"msnodesqlv8",
    "connectionString": "Driver={SQL Server Native Client 11.0};Server={DESKTOP-E4TFQEB\\MSSQLSERVER02};Database={Node_13};Trusted_Connection={yes};"
}


class DB {
    constructor()
    {
        this.connectionPool = new sql.ConnectionPool(config).connect().then(pool =>{
            console.log('Connected to MSSQL server');
            return pool;
        }).catch(err => console.log('Connection failed: ', err));
    }

    getFaculties(req, res)
    {
        return this.connectionPool.then(pool => pool.request().query('Select * FROM FACULTY'))
    }

    getPulpits(req, res)
    {
        return this.connectionPool.then(pool => pool.request().query('Select * FROM PULPIT'))
    }

    getSubjects(req, res)
    {
        return this.connectionPool.then(pool => pool.request().query('Select * FROM SUBJECT'))
    }

    getAuditoriumsTypes(req, res)
    {
        return this.connectionPool.then(pool => pool.request().query('Select * FROM AUDITORIUM_TYPE'))
    }

    getAuditoriums(req, res)
    {
        return this.connectionPool.then(pool => pool.request().query('Select * FROM AUDITORIUM')) 
    }

    postFacultes(faculty, facultyName)
    {
        return this.connectionPool.then(pool => {
            return pool.request().input('faculty', sql.NVarChar, faculty)
            .input('faculty_name', sql.NVarChar, facultyName)
            .query('INSERT FACULTY(FACULTY, FACULTY_NAME) values(@faculty , @faculty_name)');
        })
    }

    postPulpits(pulpit, pulpitName, faculty)
    {
        return this.connectionPool.then(pool => {
            return pool.request().input('pulpit', sql.NVarChar, pulpit)
            .input('pulpit_name', sql.NVarChar, pulpitName)
            .input('faculty', sql.NVarChar, faculty)
            .query('INSERT PULPIT(PULPIT, PULPIT_NAME, FACULTY) VALUES(@pulpit, @pulpit_name, @faculty)');
        })
    }

    postSubjects(subject, subject_name, pulpit)
    {
        return this.connectionPool.then(pool => {
            return pool.request().input('subject', sql.NVarChar, subject)
            .input('subject_name', sql.NVarChar, subject_name)
            .input('pulpit', sql.NVarChar, pulpit)
            .query('INSERT INTO SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) VALUES(@subject, @subject_name, @pulpit)');
        })
    }
    postAuTypes(auditorium_type, auditorium_typename)
    {
        return this.connectionPool.then(pool => {
            return pool.request().input('auditorium_type', sql.NVarChar, auditorium_type)
            .input('auditorium_typename', sql.NVarChar, auditorium_typename)
            .query('INSERT INTO AUDITORIUM_TYPE(AUDITORIUM_TYPE, AUDITORIUM_TYPENAME) VALUES(@auditorium_type, @auditorium_typename)')
        })
    }
    postAuditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('INSERT AUDITORIUM(AUDITORIUM, AUDITORIUM_NAME, AUDITORIUM_CAPACITY, AUDITORIUM_TYPE)' +
                             ' values(@auditorium, @auditorium_name, @auditorium_capacity, @auditorium_type)');
        });
    }

    putFaculties(faculty, faculty_name){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .input('faculty_name', sql.NVarChar, faculty_name)
                .query('UPDATE FACULTY SET FACULTY_NAME = @faculty_name WHERE FACULTY = @faculty');
        });
    }
    getFaculty(faculty)
    {
        return this.connectionPool.then(pool => {
            return pool.request().input('fac',sql.NVarChar, faculty).query('Select * from FACULTY where faculty = @fac')});
    }

    putPulpits(pulpit, pulpit_name, faculty){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .input('pulpit_name', sql.NVarChar, pulpit_name)
                .input('faculty', sql.NVarChar, faculty)
                .query('UPDATE PULPIT SET PULPIT_NAME = @pulpit_name, FACULTY = @faculty WHERE PULPIT = @pulpit');
        });
    }
    getPulpit(pulpit)
    {
        return this.connectionPool.then(pool => {
            return pool.request().input('pulp',sql.NVarChar, pulpit).query('Select * from PULPIT where pulpit = @pulp')});
    }

    putSubjects(subject, subject_name, pulpit){
        return this.connectionPool.then(pool => {

            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .input('subject_name', sql.NVarChar, subject_name)
                .input('pulpit', sql.NVarChar, pulpit)
                .query('UPDATE SUBJECT SET SUBJECT_NAME = @subject_name, PULPIT = @pulpit WHERE SUBJECT = @subject');
        });
    }
    getSubject(subject)
    {
        console.log(subject);
        return this.connectionPool.then(pool => {
            return pool.request().input('sub',sql.VarChar, subject).query('Select * from Subject where subject = @sub')});
    }

    putAuditoriums_Types(auditorium_type, auditorium_typename){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .input('auditorium_typename', sql.NVarChar, auditorium_typename)
                .query('UPDATE AUDITORIUM_TYPE SET AUDITORIUM_TYPENAME = @auditorium_typename WHERE AUDITORIUM_TYPE = @auditorium_type');
        });
    }

    putAuditoriums(auditorium, auditorium_name, auditorium_capacity, auditorium_type){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .input('auditorium_name', sql.NVarChar, auditorium_name)
                .input('auditorium_capacity', sql.Int, auditorium_capacity)
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('UPDATE AUDITORIUM SET AUDITORIUM_NAME = @auditorium_name, AUDITORIUM_CAPACITY = @auditorium_capacity, AUDITORIUM_TYPE =  @auditorium_type' +
                    ' WHERE AUDITORIUM = @auditorium');
        });
    }
    getAuditorim(audit)
    {
        return this.connectionPool.then(pool => {
            return pool.request().input('audit',sql.NVarChar, audit).query('Select * from AUDITORIUM where AUDITORIUM = @audit')});
    }
    deleteFaculties(faculty){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('faculty', sql.NVarChar, faculty)
                .query('DELETE FROM FACULTY WHERE FACULTY = @faculty');
        });
    }

    deletePulpits(pulpit){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('pulpit', sql.NVarChar, pulpit)
                .query('DELETE FROM PULPIT WHERE PULPIT = @pulpit');
        });
    }

    deleteSubjects(subject){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('subject', sql.NVarChar, subject)
                .query('DELETE FROM SUBJECT WHERE SUBJECT = @subject');
        });
    }

    deleteAuditoriums_Types(auditorium_type){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium_type', sql.NVarChar, auditorium_type)
                .query('DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE = @auditorium_type');
        });
    }

    deleteAuditoriums(auditorium){
        return this.connectionPool.then(pool => {
            return pool.request()
                .input('auditorium', sql.NVarChar, auditorium)
                .query('DELETE FROM AUDITORIUM WHERE AUDITORIUM = @auditorium');
        });
    }
}

module.exports = DB