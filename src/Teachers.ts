import {Persons} from './Persons';
import {Person} from './Persons';
interface Teacher extends Person{
    emails:Array<{email:string;primary:boolean}>;
    subjects:Array<{subject:string}>;
}
        
export default class Teachers extends Persons{
    private validateEmail(person:Teacher):void{
        if(person.emails){
            let primaryEmail=0;
            for(let email of person.emails){
                if(Object.keys(email).length!=2){
                    throw new Error('Invalid email');
                }
                let emailRegex=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
                if(!emailRegex.test(email.email)){
                    throw new Error('Invalid email');
                }
                if(email.primary){
                    primaryEmail++;
                }
            }
            if(primaryEmail!==1){
                throw new Error('Invalid primary email');
            }
        }
    }
    private validateSubject(person:Teacher):void{
        if(person.subjects){
            for(let subject of person.subjects){
                if(Object.keys(subject).length!=1){
                    throw new Error('Invalid subject');
                }
                if(!subject.subject){
                    throw new Error('Invalid subject');
                }
            }
        }
    }
    private validateTeacher(teacher:Teacher,allrequired:boolean=true):void{
        let required=['name','dateOfBirth','phones','sex','emails','subjects'];
        for(let key of Object.getOwnPropertyNames(teacher)){
            if(!required.includes(key) && key!='description'){
                throw new Error(`Invalid teacher`);
            }
        }
        if(allrequired){
            for(let key of required){
                if(!teacher.hasOwnProperty(key)){
                    throw new Error(`Invalid teacher`);
                }
            }
        }
        Persons.validateName(teacher);
        Persons.validateDate(teacher);
        this.validateEmail(teacher);
        Persons.validatePhone(teacher);
        Persons.validateSex(teacher);
        this.validateSubject(teacher);
        Persons.validateDescription(teacher);
    }
    constructor(){
        super();
    }
    add(teacher:Teacher):string{
        for(let person of this.persons.values()){
            if(teacher.name.first===person.name.first){
                throw new Error('Person already exists');
            }
        }
        this.validateTeacher(teacher);
        let id = Math.random().toString(36).slice(2);
        let teacherFormated:Teacher&{id:string} = {id,...teacher};
        this.persons.set(id,teacherFormated);

        return id;
    }
    read(id:string):Teacher{
        if(this.persons.has(id)){            
            return this.persons.get(id) as Teacher;
        }else{
            throw new Error('Teacher does not exist');  
        }        
    }
    update(id:string,person:Partial<Teacher>):void{
        if(this.persons.has(id)){
            this.validateTeacher(person as Teacher,false);
            this.persons.set(id,{...this.persons.get(id),...person} as Teacher);
        }else{
            throw new Error('Person does not exist');
        }
    }

}   