const fs = require("fs");

const fileName = "sample.txt"

/**************************************************************************************************************
stringToArray function is used to generate an array of tasks from the tasks that are soted inside the txt file

@param {String} fileName - the name of the file in which you have stored the tasks

@returns {Array} An array of strings , where each sting is a task that was stored inside the txt file
***************************************************************************************************************/

const stringToArray = (fileName) => {
    const data = readFile(fileName);
    const result = JSON.stringify(data);
    const resultWithOutQuotationMarks = result.slice(1,result.length - 1);
    const resultAsArray = resultWithOutQuotationMarks.split("\\n");
    const filteredResult = resultAsArray.filter((elem)=> elem !== "");

    return filteredResult;
}

/**********************************************************************************************************************************
overWriteDb function is used to overwrite all the data that currently exists in the file with the data that is generated inside the function
@param {String} fileName - the name of the file which you want to overwrite
@param {Array} arr - array of strings that contains the tasks

@returns none
************************************************************************************************************************************/

const overWriteDb = (fileName, arr) => {
    arr.push("");
    const dataToWrite = arr.join("\n");
    try{
        fs.writeFileSync(fileName, dataToWrite);
    }catch(error){
        console.log(error);
    }
}

/**************************************************************************************************************
appendFile function is used to add new tasks to the txt file 
@param {String} fileName - the name of the file on which you want to add the task
@param {String} dataToWrite - the task which you want to add to the file

@returns none
***************************************************************************************************************/
const appendFile = (fileName,dataToWrite) => {
    try{
        fs.appendFileSync(fileName,`${dataToWrite}\n`);
        console.log("Data written succesfully");
    }catch(error){
        console.log(error);
    }
}

/**************************************************************************************************************
readFile function is used to get all the tasks that are stored in the txt file
@param {String} fileName - the name of the file from which you want to read the task from

@returns {String} return the tasks stored in the file
***************************************************************************************************************/

const readFile = (fileName) => {
    try{
        const data = fs.readFileSync(fileName,{encoding: "utf-8"});
        return data;
    }catch(error){
        console.log(error);
        return null;
    }
}

/**************************************************************************************************************
markTaskAsComplete function is used to mark a task in the txt file as done
@param {String} fileName - the name of the file on which you stored the tasks in
@param {String} taskName - the task which you want to mark as done

@returns none

When a task is marked as done the task will get wraped in square braces ([])
***************************************************************************************************************/

const markTaskAsComplete = (fileName, taskName) => {

    const data = stringToArray(fileName)

    const mappedResult = data.map((elem)=> {
        if(elem.trim()=== taskName.trim()){
            const completedTask = `[${taskName}]`;
            return completedTask;
        }
        return elem;
    })

    overWriteDb(fileName, mappedResult);

}

/**************************************************************************************************************
deleteTask function is used to delete a task in the txt file 
@param {String} fileName - the name of the file on which you stored the tasks in
@param {String} taskName - the task which you want to delete from the file

@returns none

***************************************************************************************************************/

const deleteTask = (fileName, taskName) => {
    const data = stringToArray(fileName);

    const filteredResult = data.filter((elem) => elem !== taskName);

    overWriteDb(fileName, filteredResult);
}

// appendFile(fileName,"this is task1");
// appendFile(fileName,"this is task2");
// appendFile(fileName,"this is task3");

// const result = readFile('sample.txt');
// console.log(result);

// markTaskAsComplete(fileName, 'this is task1');
// markTaskAsComplete(fileName, 'this is task2');

// deleteTask(fileName, "this is task3");

// appendFile(fileName,"this is task4");

// markTaskAsComplete(fileName, 'this is task4');

module.exports = {
    appendFile,
    readFile,
    markTaskAsComplete,
    deleteTask
}