import Pupils from "./Pupils.mjs";
import Persons from "./Persons.mjs";
export default class Groups {
    #groups;

    constructor() {
        this.#groups = new Map();
    }
    add(room) {
        if (arguments.length != 1) {
            throw new Error("Wrong number of arguments");
        }
        if (!room || typeof room != "number" || isNaN(room) || room < 0) {
            throw new Error("Room must be a number");
        }
        if (this.#groups.has(room)) {
            throw new Error("Room already exists");
        }
        let id = Math.random().toString(36).slice(2);
        // key ->id , value -> {id : id, room : number, pupils : Set()}
        this.#groups.set(id, { id, room, pupils: new Set() });
        return id;
    }
    addPupil(groupId, pupil) {
        if (arguments.length != 2) {
            throw new Error("Wrong number of arguments");
        }
        if (!groupId || typeof groupId != 'string') {
            throw new Error("groupId must be a string");
        }
        if (!this.#groups.has(groupId)) {
            throw new Error("Group does not exist");
        }
        // static method from Persons that checks if pupil is valid here
        Persons.personValidator(pupil);
        //if already exists:
        if (this.#groups.get(groupId).pupils.has(pupil)) {
            throw new Error("Pupil already exists");
        }
        // check and add to pupils Set
        this.#groups.get(groupId).pupils.add(pupil);
    }
    removePupil(groupId, pupilId) {
        if (arguments.length != 2) {
            throw new Error("Wrong number of arguments");
        }
        if (!groupId || typeof groupId != 'string') {
            throw new Error("groupId must be a string");
        }
        if (!this.#groups.has(groupId)) {
            throw new Error("Group does not exist");
        }
        if (!pupilId || typeof pupilId != 'string') {
            throw new Error("pupil.id must be a string");
        }
        // check if pupil exists and delete
        for(let pupil of this.#groups.get(groupId).pupils){
            if(pupil.id === pupilId){
                this.#groups.get(groupId).pupils.delete(pupil);
                return;
            }
        }
        throw new Error("Pupil does not exist");
    }
    update(groupId, room) {
        if (arguments.length != 2) {
            throw new Error("Wrong number of arguments");
        }
        if (!groupId || typeof groupId != 'string') {
            throw new Error("groupId must be a string");
        }
        if (!this.#groups.has(groupId)) {
            throw new Error("Group does not exist");
        }
        if (!room || typeof room !== "object" || room == null || Array.isArray(room)) {
            throw new Error("Room must be a proper object");
        }
        if (!room.hasOwnProperty("room")) {
            throw new Error("Room must have a room property");
        }
        if (typeof room.room !== "number" || room.room < 0) {
            throw new Error("Room must be a number");
        }
        this.#groups.get(groupId).room = room.room;
    }
    read(groupId) {
        if (arguments.length != 1) {
            throw new Error("Wrong number of arguments");
        }
        if (!groupId || typeof groupId != 'string') {
            throw new Error("groupId must be a string");
        }
        if (!this.#groups.has(groupId)) {
            throw new Error("Group does not exist");
        }
        // return a copy of the group 
        this.#groups.get(groupId).pupils = [...this.#groups.get(groupId).pupils];
        return this.#groups.get(groupId);
    }
    readAll(){
        // return a copy of all groups
        for(let group of this.#groups.values()){
            group.pupils = [...group.pupils];
        }
        return [...this.#groups.values()];
    }

}
// For testing
// let groups = new Groups();
// let groupId = groups.add(100);
// let groupId2 = groups.add(777);

// const pupils = new Pupils();
// const data = {
//     name: {
//         first: "Michael",
//         last: "Jordan"
//     },
//     dateOfBirth: "05-02-1970", // dd-mm-yyyy
//     phones: [
//         {
//             phone: "+995 (551) 12-13-73", // +995 (XXX) XX-XX-XX
//             primary: true,
//         }
//     ],
//     sex: "male", // male OR female
//     description: "Basketball player"
// }
// const data2 = {
//     name: {
//         first: "Cristiano",
//         last: "Ronaldo"
//     },
//     dateOfBirth: "11-04-1988", // dd-mm-yyyy
//     phones: [
//         {
//             phone: "+995 (566) 23-13-77", // +995 (XXX) XX-XX-XX
//             primary: true,
//         }
//     ],
//     sex: "male", // male OR female
//     description: "Football player"
// }
// // Create a new pupil
// const pupil = pupils.add(data);
// const pupil2 = pupils.add(data2);
// groups.addPupil(groupId, pupil);
// groups.addPupil(groupId, pupil2);
// groups.removePupil(groupId, pupil.id)
// groups.update(groupId, {room:299})
// groups.read(groupId)
// console.log(groups.readAll())
