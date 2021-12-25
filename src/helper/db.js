import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase("db.db");

const runAsPromise = (sqlCommand, params=[]) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                sqlCommand,
                params,
                (_, result) => resolve(result),
                (_, error) => reject(error)

            );
          });
    });
};

export const initDb = () => {
    return runAsPromise(`
        create table if not exists places (
        id integer primary key not null, 
        title text not null, 
        imageUri text not null,
        address text not null,
        lat real not null,
        lng real not null
        );`,
        []
    );
};

export const addPlacetoSql = (title, imageUrl) => {
    return runAsPromise(`
        insert into places (
        title, 
        imageUri,
        address,
        lat,
        lng
        ) values(?, ?, ?, ?, ?);`,
        [title, imageUrl, 'empty', 32.12, 50.34]
    );
};

export const getPlacesFromSql = () => {
    return runAsPromise(
        `select * from places`,[]
    );
};