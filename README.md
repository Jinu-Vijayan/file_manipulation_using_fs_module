# Basic task manager

You can use this to store tasks in a simple txt file. You can add, delete, update, and read the tasks that you have inside the txt file.

## Usage

### Add new task to the file

```JavaScript
const {appendFile} = require("file_manipulation_using_fs_module");

const dataToWrite = "Some task you want to add";

appendFile("sample.txt", dataToWrite);
```

### Mark a task as done

```JavaScript
const {markTaskAsComplete} = require("file_manipulation_using_fs_module");

const taskName = "the task you want to mark as done";

markTaskAsComplete("sample.txt", taskName);
```

### Read all the tasks in the txt file

```JavaScript
const {readFile} = require("file_manipulation_using_fs_module");

const result = readFile("sample.txt");

console.log(result);
```

### Delete a task

```JavaScript
const {deleteTask} = require("file_manipulation_using_fs_module");

const taskName = "the task you want to delete";

const deleteTask = readFile("sample.txt",taskName);
```