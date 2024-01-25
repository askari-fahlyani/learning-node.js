import readline from 'readline/promises';
import { stdin as input , stdout as output } from 'process';

const readlineInterface = readline.createInterface({input,output})

const contactsList = []

const addNewContacts = async ()=>{
    const firstName= await readlineInterface.question("First Name: ");
    const lastName= await readlineInterface.question("Last Name: ");
    const newContect = {
        id:contactsList.length,
        firstName:firstName,
        lastName:lastName
    }
    contactsList.push(newContect)
    
    
}
const showContactsList = ()=>{
    console.log('contacts list:');
    contactsList.map(({id,firstName,lastName})=>(console.log(`#${id} ${firstName} ${lastName}`))).join('\n')
}
const quit = ()=>{
    readlineInterface.close()
}

const  contactsOptionsList = async()=>{
    console.log("n: Add new contact\nl:show contacts list\nq:quit");
    const action = await readlineInterface.question('choose one please: ')

if (action==='n') {
    await addNewContacts()
    showContactsList()
} else if(action==="l"){
    showContactsList()
}else{
    quit()
    return
}
contactsOptionsList()

}


contactsOptionsList()

