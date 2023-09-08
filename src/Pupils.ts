import { Persons } from "./Persons";
import { Person } from "./Persons";

export default class Pupils extends Persons{
    constructor(){
        super();
    }
    add(pupil:Person):Person&{id:string}{
        for(let person of this.persons.values()){
            if(pupil.name.first===person.name.first){
                throw new Error('Person already exists');
            }
        }
        Persons.validateDate(pupil);
        Persons.validatePhone(pupil);
        Persons.validateSex(pupil);

        let id = Math.random().toString(36).slice(2);
        let pupilFormated:Person&{id:string} = {id,...pupil};
        this.persons.set(id,pupilFormated);
        
        return pupilFormated;
    }
    read(id:string):Person{
        if(this.persons.has(id)){            
            return this.persons.get(id) as Person;
        }else{
            throw new Error('Person does not exist');  
        }        
    }
    update(id:string,person:Partial<Person>):void{
        if(this.persons.has(id)){
            if(person.dateOfBirth){
                Persons.validateDate(person as Person); ;
            }
            if(person.phones){
                Persons.validatePhone(person as Person);
            }
            if(person.sex){
                Persons.validateSex(person as Person);
            }
            this.persons.set(id,{...this.persons.get(id),...person} as Person);
        }else{
            throw new Error('Person does not exist');
        }
    }
}
let pupils = new Pupils();
let pupil1= pupils.add({
    name: {
        first: 'John',
        last: 'Doe',
    },
    dateOfBirth: '01-01-1999',
    phones: [
        {phone:'+995 (551) 12-13-73',primary:true},
        {phone:'+995 (599) 22-11-99',primary:false},
    ],
    sex:'male',
    
})

console.log(pupils.read(pupil1.id));
pupils.update(pupil1.id,{phones:[{phone:'+995 (777) 77-77-77',primary:true}]});
// pupils.remove(pupil1.id);
console.log(pupils.read(pupil1.id));
