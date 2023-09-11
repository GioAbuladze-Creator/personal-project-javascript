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
        Persons.validatePupil(pupil);

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
            Persons.validatePupil(person as Person,false);
            this.persons.set(id,{...this.persons.get(id),...person} as Person);
        }else{
            throw new Error('Person does not exist');
        }
    }
}
