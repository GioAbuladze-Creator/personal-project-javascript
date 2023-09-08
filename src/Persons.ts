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
        let primaryPhone=0;
        for(let phone of person.phones){
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
    protected static validateDate(person:Person):void{
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
    protected static validateSex(person:Person):void{
        if(person.sex.toLowerCase()!='male'&&person.sex.toLowerCase()!='female'){
            throw new Error('Invalid sex')
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
