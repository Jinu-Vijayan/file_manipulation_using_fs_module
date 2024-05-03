const fs = require("fs");

const fileName = "sample.txt"

const stringToArray = (fileName) => {
    const data = readFile(fileName);
    const result = JSON.stringify(data);
    const resultWithOutQuotationMarks = result.slice(1,result.length - 1);
    const resultAsArray = resultWithOutQuotationMarks.split("\\n");
    const filteredResult = resultAsArray.filter((elem)=> elem !== "");

    return filteredResult;
}

const appendFile = (fileName,dataToWrite) => {
    try{
        fs.appendFileSync(fileName,`${dataToWrite}\n`);
        console.log("Data written succesfully");
    }catch(error){
        console.log(error);
    }
}

const readFile = (fileName) => {
    try{
        const data = fs.readFileSync(fileName,{encoding: "utf-8"});
        return data;
    }catch(error){
        console.log(error);
        return null;
    }
}

const markTaskAsComplete = (fileName, taskName) => {

    const data = stringToArray(fileName)

    const mappedResult = data.map((elem)=> {
        if(elem.trim()=== taskName.trim()){
            const completedTask = `[${taskName}]`;
            return completedTask;
        }
        return elem;
    })

    mappedResult.push("")
    const dataToWrite = mappedResult.join("\n")

    try{
        fs.writeFileSync(fileName, dataToWrite);
    }catch(error){
        console.log(error);
    }

}

appendFile(fileName,"this is task1");
appendFile(fileName,"this is task2");
appendFile(fileName,"this is task3");

const result = readFile('sample.txt');
console.log(result);

markTaskAsComplete(fileName, 'this is task1');
markTaskAsComplete(fileName, 'this is task2');