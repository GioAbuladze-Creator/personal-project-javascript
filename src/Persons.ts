export interface Person{
    name: {
        first: string;
        last: string;
    };
    dateOfBirth: string; // format date
    phones: Array<{phone:string;primary:boolean}>; // array of strings
    sex:string;
    description?:string;
}

export abstract class Persons{
    protected persons:Map<string,Person>;
    protected static validatePhone(person:Person):void{
        if(person.phones){
            let primaryPhone=0;
            for(let phone of person.phones){
                if(Object.keys(phone).length!=2){
                    throw new Error('Invalid phone number');
                }
                let phoneRegex=/^\+995\s\([0-9]{3}\)\s[0-9]{2}-[0-9]{2}-[0-9]{2}$/;
                if(!phoneRegex.test(phone.phone)){
                    throw new Error('Invalid phone number');
                }
                if(phone.primary){
                    primaryPhone++;
                }
            }
    
            if(primaryPhone!==1){
                throw new Error('Invalid primary phone');
            }
        }
    }
    protected static validateDate(person:Person):void{
        if(person.dateOfBirth){
            let [dayStr,monthStr,yearStr]:string[]=person.dateOfBirth.split('-');
            let day:number=Number(dayStr);
            let month:number=Number(monthStr);
            let year:number=Number(yearStr);
            if(isNaN(day)||isNaN(month)||isNaN(year)){
                throw new Error('Invalid date format');
            }
            if(day<1 || day>31 || month<1 || month>12 || year<1900 || year>new Date().getFullYear()){
                throw new Error("Invalid date of birth")
            }
            if(new Date(year,month-1,day).getTime()>new Date().getTime()){
                throw new Error("Invalid date of birth")
            }
        }
    }
    protected static validateSex(person:Person):void{
        if(person.sex){
            if(person.sex.toLowerCase()!='male'&&person.sex.toLowerCase()!='female'){
                throw new Error('Invalid sex')
            }
        }
    }
    protected static validateName(person:Person):void{
        if(person.name){
            if(Object.keys(person.name).length != 2){
                throw new Error("Invalid name")
            }
            if(!person.name.hasOwnProperty('first') || typeof person.name.first !== 'string' || person.name.first.length == 0) {
                throw new Error("Invalid first name")
            }
            if(!person.name.hasOwnProperty('last') || typeof person.name.last !== 'string' || person.name.last.length == 0) {
                throw new Error("Invalid last name")
            }
        }
    }
    protected static validateDescription(person:Person):void{
        if(person.description){
            if(typeof person.description !== 'string' || person.description.length == 0) {
                throw new Error("Invalid description")
            }
        }
    }
    constructor(){
        this.persons = new Map();
    }
    abstract read(id:string):object;
    abstract update(id:string,person:object):void;
    remove(id:string):void{
        if(this.persons.has(id)){
            this.persons.delete(id);
        }else{
            throw new Error('Person does not exist');
        }
    }
}
