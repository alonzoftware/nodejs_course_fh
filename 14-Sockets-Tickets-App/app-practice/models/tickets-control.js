const path = require("path");
const fs = require("fs");
const { stringify } = require("querystring");

class Ticket {
  constructor(number) {
    this.number = number;
    this.desk = null;
  }
}
class TicketsControl {
  constructor() {
    this.lastTkt = 0;
    this.today = new Date().getDate();
    this.tkts = [];
    this.last4Tkts = [];
    this.init();
  }
  getJson() {
    return {
      lastTkt: this.lastTkt,
      today: this.today,
      tkts: this.tkts,
      last4Tkts: this.last4Tkts,
    };
  }

  init() {
    const { lastTkt, today, tkts, last4Tkts } = require("../db/db.json");
    if (this.today === today) {
      this.lastTkt = lastTkt;
      this.today = today;
      this.tkts = tkts;
      this.last4Tkts = last4Tkts;
    } else {
      this.saveDB();
    }
  }
  saveDB() {
    const pathDB = path.join(__dirname, "../db/db.json");
    fs.writeFileSync(pathDB, JSON.stringify(this.getJson()));
  }

  addTktToQueue() {
    this.lastTkt++;
    const tkt = new Ticket(this.lastTkt, null);
    this.tkts.push(tkt);
    this.saveDB();
    return `Ticket ${this.lastTkt}`;
  }
  attendTkt(desk) {
    if (this.tkts.length === 0) {
      return null;
    }
    const tkt = this.tkts.shift();
    tkt.desk = desk;
    this.last4Tkts.unshift(tkt);
    if (this.last4Tkts.length > 4) {
      this.last4Tkts.splice(-1, 1);
    }
    this.saveDB();
    return tkt;
  }
}
module.exports = TicketsControl;
