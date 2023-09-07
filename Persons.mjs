export default class Persons {
    #persons;
    #required=['name','dateOfBirth','phones','sex'];
    #validateId(id) {
        if (typeof id !== "string"){
            throw new Error("read method accepts id as a string");
        }
    }
    #validateObject(object, name) {
        if (typeof object !== "object" || object == null || Array.isArray(object)) {
            throw new Error(`${name} must be an object`);
        }
    }
    #personValidation(person,allRequired=true) {
        // will be same for teacher and pupil
        this.#validateObject(person, "Person");        
        
        if(allRequired){
            for(let key of this.#required){
                if(!person.hasOwnProperty(key)){
                    throw new Error(`Invalid ${key}`)
                }
            }
        }
        // name validation
        this.#validateObject(person.name, "Name");

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
        // date of birth validation
        if(person.dateOfBirth && (typeof person.dateOfBirth !== 'string' || person.dateOfBirth.length == 0)) {
            throw new Error("Invalid date of birth")
        }
        if(person.dateOfBirth){
            // dd-mm-yyyy
            let [day,month,year]=person.dateOfBirth.split('-');
            if(isNaN(day) || isNaN(month) || isNaN(year)){
                throw new Error("Invalid date of birth")
            }
            if(day<1 || day>31 || month<1 || month>12 || year<1900 || year>new Date().getFullYear()){
                throw new Error("Invalid date of birth")
            }
            if(new Date(year,month-1,day).getTime()>new Date().getTime()){
                throw new Error("Invalid date of birth")
            }
        }
        // phones validation
        if(person.phones && !Array.isArray(person.phones)){
            throw new Error("Invalid phones")
        }
        if(person.phones){
            let regex=/^\+995\s\([0-9]{3}\)\s[0-9]{2}-[0-9]{2}-[0-9]{2}$/;
            if(person.phones.length==0){
                throw new Error("Invalid phones")
            }
            if(person.phones.length==1 && person.phones[0].primary==false){
                throw new Error("Number should be primary")
            }
            let primaryCount=0;
            for(let phone of person.phones){

                this.#validateObject(phone, "Phone");
                

                if(Object.keys(phone).length != 2){
                    throw new Error("Invalid phones")
                }
                if(!phone.hasOwnProperty('phone')||typeof phone.phone!='string' || !phone.hasOwnProperty('primary')||typeof phone.primary!='boolean'){
                    throw new Error("Invalid phones")
                }
                if(!regex.test(phone.phone)){
                    throw new Error("Invalid phone number")
                }
                if(phone.primary){
                    primaryCount++;
                }

            }
            if(primaryCount!=1){
                throw new Error("Only one number should be primary")
            }
        }
        //sex validation
        if(person.sex && typeof person.sex!='string'){
            throw new Error('Invalid sex')
        }
        if(person.sex){
            if(person.sex.toLowerCase()!='male' && person.sex.toLowerCase()!='female'){
                throw new Error('Invalid sex')
            }
        }
        //description validation
        if(person.hasOwnProperty('description') && typeof person.description!='string'){
            throw new Error('Invalid description')
        }
        
    }
    // to use it outside of class
    static personValidator(person) {
        if(arguments.length!=1){
            throw new Error("Invalid number of arguments");
        }
        const instance = new Persons();
        instance.#personValidation(person);
    }
    
    constructor() {
        this.#persons = new Map();
    }
    add(person) {
        if (arguments.length != 1) {
            throw new Error("Invalid number of arguments");
        }
        // validations
        this.#personValidation(person);
        // we alse have custom validation for teacher and pupil

        // checks and throws error if person already exists
        for(let i of this.#persons.values()){
            if(person.name===i.name){
                throw new Error("Person with this name already exists");
            }
        }

        let id = Math.random().toString(36).slice(2);
        person.id=id;
        this.#persons.set(id, person);
        
        return person;
    }
    read(id) {
        if (arguments.length != 1) {
            throw new Error("Invalid number of arguments");
        }
        this.#validateId(id);
        if (!this.#persons.has(id)) {
            throw new Error("id does not exist");
        }
        // add id in object and return it
        this.#persons.get(id).id=id;
        return this.#persons.get(id);
    }  
    update(id, person) {
        if (arguments.length != 2) {
            throw new Error("Invalid number of arguments");
        }
       this.#validateId(id);

        // validations
        this.#validateId(id);
        this.#personValidation(person,false);
        // custom person validation same as add method

        if (!this.#persons.has(id)) {
            throw new Error("Person with this id does not exist");
        }
        this.#persons.set(id, {...this.#persons.get(id), ...person});
    }
    remove(id){
        if (arguments.length != 1) {
            throw new Error("Invalid number of arguments");
        }
        this.#validateId(id);
        if (!this.#persons.has(id)) {
            throw new Error("Person with this id does not exist");
        }
        this.#persons.delete(id);
    }
}
