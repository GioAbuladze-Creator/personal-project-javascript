import Pupils from "./Pupils";
import { Person } from "./Persons";
import { Persons } from "./Persons";

export default class Groups {
    private groups: Map<string, { id: string, room: number, pupils: Array<Person & { id: string }> }>;
    private roomValidation(room: number): void {
        if (isNaN(room)) {
            throw new Error("Room must be a number");
        }
        if (room < 0) {
            throw new Error("Room must be a positive number");
        }
    }
    constructor() {
        this.groups = new Map();
    }
    add(room: number): string {
        this.roomValidation(room);
        for (let roomObj of this.groups.values()) {
            if (roomObj.room === room) {
                throw new Error("Room already exists");
            }
        }
        let id = Math.random().toString(36).slice(2);
        this.groups.set(id, { id, room, pupils: [] });
        return id;
    }
    addPupil(groupId: string, pupil: Person & { id: string }): void {
        let group = this.groups.get(groupId);
        if (!group) {
            throw new Error("Group not found");
        }
        //validate pupil when allRequired and also with id
        Persons.validatePupil(pupil, true, true);
        for (let pupilObj of group.pupils) {
            if (pupil.id === pupilObj.id) {
                throw new Error("Pupil already exists");
            }
        }
        group.pupils.push(pupil);
    }
    removePupil(groupId: string, pupilId: string): void {
        let group = this.groups.get(groupId);
        if (!group) {
            throw new Error("Group not found");
        }
        if (!group.pupils.find((pupil) => pupil.id === pupilId)) {
            throw new Error("Pupil not found");
        }
        let index = group.pupils.findIndex((pupil) => pupil.id === pupilId);
        group.pupils.splice(index, 1);
    }
    update(groupId:string,room:{room:number}):void{
        this.roomValidation(room.room);
        let group = this.groups.get(groupId);
        if (!group) {
            throw new Error("Group not found");
        }
        for (let roomObj of this.groups.values()) {
            if (roomObj.room === room.room) {
                throw new Error("Room already exists");
            }
        }
        group.room = room.room;
    }
    read(groupId:string):{id:string,room:number,pupils:Array<Person&{id:string}>}{
        let group = this.groups.get(groupId);
        if (!group) {
            throw new Error("Group not found");
        }
        return group;
    }
    readAll():Array<{id:string,room:number,pupils:Array<Person&{id:string}>}>{
        let groups = [];
        for(let group of this.groups.values()){
            groups.push(group);
        }
        return groups;
    }
    
}
