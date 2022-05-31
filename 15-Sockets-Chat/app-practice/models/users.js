
class Users {

    constructor() {
        this.people = [];
    }
    getPeople() {
        return this.people;
    }
    addPerson(id, name) {
        this.people.push({ id, name });
        return this.people;
    }
    getPerson(id) {
        const person = this.people.filter(person => person.id === id)[0];
        return person;
    }
    getRoomPeople() {

    }
    delPerson(id) {
        const personDel = this.getPerson(id);
        this.people = this.people.filter(person => person.id != id);
        return personDel;

    }


}

module.exports = Users;