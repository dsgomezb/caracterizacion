import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  farm = new BehaviorSubject([]);
 
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'caracterizacion.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  addFarm(data) {
    console.log("llega aqui");
    console.log(data);
    console.log("--------------");
    //let data = [nombre, id_vereda, longitud, latitud, documento_tecnico];
    return this.database.executeSql('finca(nombre, id_vereda, longitud, latitud, documento_tecnico) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      console.log(data);
      return this.getAllFarms();
    });
  }

  getAllFarms() {
    return this.database.executeSql('SELECT * FROM finca').then(data => {
      return data;
    });
  }

  getFarm(id) {
    return this.database.executeSql('SELECT * FROM finca WHERE id = ?', [id]).then(data => {
      return data;
    });
  }

}