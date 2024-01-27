import readline from 'readline/promises';
import { stdin as input , stdout as output } from 'process';
import fs from 'fs/promises'


const CONTACTS_lIST_FILE_PATH ='./data-contacts-list.json'
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
    saveContactsList('ADD')
}
const deleteContact = async()=>{
    showContactsList()
   const deleteId = await  readlineInterface.question('enter contact id:\n')
    console.log(deleteId);
   const deleteIndex = contactsList.findIndex(contat=>contat.id===Number(deleteId))
   console.log('delete index is',deleteIndex);
   if (deleteIndex>-1) {
    contactsList.splice(deleteIndex,1)
  await saveContactsList('DELETE')
    console.log('contact is deleted');
    readlineInterface.close()
   }else{
    console.log('there is no such a id');
   }
}
const showContactsList = ()=>{
    console.log('contacts list:\n\n');
    contactsList.map(({id,firstName,lastName})=>(console.log(`#${id} ${firstName} ${lastName}`))).join('\n')
}
const  showOptionsList = async()=>{
    console.log("n: Add new contact\nl:show contacts list\nq:quit\nd:delete Contact\ne: exit");
    const action = await readlineInterface.question('choose one please: ')
if (action==='n') {
    await addNewContacts()
} else if(action==="l"){
    showContactsList()
}else if(action==='d'){
    deleteContact()
}else{
    quit()
    return
}
}

const quit = ()=>{
    readlineInterface.close()
}

const loadContacts = async()=>{
try {
    const myData =await fs.readFile(CONTACTS_lIST_FILE_PATH,'utf-8')
    contactsList.push(
        ...JSON.parse(myData)
    ) 
} catch (error) {
    throw error
}
}
const saveContactsList = async(action)=>{
    const saveBasedOnAction = async(action)=>{
        try {
            const contactsListJson = JSON.stringify(contactsList)
            await fs.writeFile(CONTACTS_lIST_FILE_PATH,contactsListJson)
            if (action==='ADD') {
                console.log('new contacts saved');
                const confirmation = await readlineInterface.question('do you want to add a new contact?\ny: yes\nn: no\n')
                if (confirmation==='y'){
                    addNewContacts()
                }else if(confirmation==='n'){
                    readlineInterface.close()
                }
                else{
                    const askCorrectEntrance = 'please choose one of these:\ny: yes\nn: no\n';
                    incorrectInputHandling(askCorrectEntrance)
                }
            }else{
                readlineInterface.close()
            }
        } 
        catch(err){
            throw err
        }    
    }
    
   await saveBasedOnAction(action)
}

const incorrectInputHandling = async(askCorrectAnswer)=>{
    const newConfirmation = await readlineInterface.question(askCorrectAnswer)
    if (newConfirmation==='y') {
        addNewContacts()
    }else if(newConfirmation==='n'){
        readlineInterface.close()
    }else{
        incorrectInputHandling(askCorrectAnswer)
    }
   
}
const main = async ()=>{
    await loadContacts()
    showOptionsList()
}
await main()
