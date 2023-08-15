export default class Persons {
    #persons;
    #personValidation(person) {
        // will be same for teacher and pupil
        if (typeof person !== 'object' || Array.isArray(person) || person === null || Object.keys(person) == 0) {
            throw new Error("Invalid Object")
        }
        // name validation
        if(!person.hasOwnProperty('name') || typeof person.name !== 'object' || Array.isArray(person.name) || person.name === null || Object.keys(person.name) == 0) {
            throw new Error("Invalid name")
        }
        if(!person.name.hasOwnProperty('first') || typeof person.name.first !== 'string' || person.name.first.length == 0) {
            throw new Error("Invalid first name")
        }
        if(!person.name.hasOwnProperty('last') || typeof person.name.last !== 'string' || person.name.last.length == 0) {
            throw new Error("Invalid last name")
        }
        // date of birth validation
        if(!person.hasOwnProperty('dateOfBirth') || typeof person.dateOfBirth !== 'string' || person.dateOfBirth.length == 0) {
            throw new Error("Invalid date of birth")
        }else{
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
        if(!person.hasOwnProperty('phones')||!Array.isArray(person.phones)){
            throw new Error("Invalid phones")
        }else{
            let regex=/^\+995\s\([0-9]{3}\)\s[0-9]{2}-[0-9]{2}-[0-9]{2}$/;
            for(let phone of person.phones){
                if(typeof phone!='object' || Array.isArray(phone) || phone === null || Object.keys(phone) == 0){
                    throw new Error("Invalid phones")
                }
                if(!phone.hasOwnProperty('phone')||typeof phone.phone!='string' || !phone.hasOwnProperty('primary')||typeof phone.primary!='boolean'){
                    throw new Error("Invalid phones")
                }
                if(!regex.test(phone.phone)){
                    throw new Error("Invalid phone number")
                }
            }
                
            if(typeof person.phones[0].phone!='string' || !regex.test(person.phones[0].phone)){
                throw new Error("Invalid phone number")
            }          
            for(let i of person.phones){
                if(typeof i != 'object' || Array.isArray(i) || i === null || Object.keys(i) == 0){
                    throw new Error("Invalid phones")
                }
                if(!i.hasOwnProperty('phone')||typeof i.phone!='string' || !i.hasOwnProperty('primary')||typeof i.primary!='boolean'){
                    throw new Error("Invalid phones")
                }
            }
        }
        //sex validation
        if(!person.hasOwnProperty('sex')||typeof person.sex!='string'){
            throw new Error('Invalid sex')
        }
        if(person.sex.toLowerCase()!='male' && person.sex.toLowerCase()!='female'){
            throw new Error('Invalid sex')
        }
        //description validation
        if(person.hasOwnProperty('description') && typeof person.description!='string'){
            throw new Error('Invalid description')
        }
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
        if (typeof id != "string") {
            throw new Error("Invalid type of arguments");
        }
        if (!this.#persons.has(id)) {
            throw new Error("Person with this id does not exist");
        }
        // add id in object and return it
        this.#persons.get(id).id=id;
        return this.#persons.get(id);
    }  
    update(id, person) {
        if (arguments.length != 2) {
            throw new Error("Invalid number of arguments");
        }
        if (typeof id != "string") {
            throw new Error("Invalid type of arguments");
        }

        // validations
        this.#personValidation(person);
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
        if (typeof id != "string") {
            throw new Error("Invalid type of arguments");
        }
        if (!this.#persons.has(id)) {
            throw new Error("Person with this id does not exist");
        }
        this.#persons.delete(id);
    }

    // remove print () we dont need it
    print(){
        console.log(this.#persons)
    }

}
