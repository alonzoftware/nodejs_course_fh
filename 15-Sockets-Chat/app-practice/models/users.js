class Users {
  constructor() {
    this.people = [];
  }
  getPeople() {
    return this.people;
  }
  addPerson(id, name, room) {
    this.people.push({ id, name, room });
    return this.people;
  }
  getPerson(id) {
    const person = this.people.filter((person) => person.id === id)[0];
    return person;
  }
  getRoomPeople(room) {
    const peopleRoom = this.people.filter((person) => person.room === room);
    return peopleRoom;
  }
  delPerson(id) {
    const personDel = this.getPerson(id);
    this.people = this.people.filter((person) => person.id != id);
    return personDel;
  }
}

module.exports = Users;
