import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';
import React from 'react';


export function openDatabase() {
    console.log('database open success');
}

export function closeDatabase() {
    console.log('database closed');
}