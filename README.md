## Simple generate test case
Author: [@n0xgg04](https://github.com/n0xgg04)

Version: 1.0.4

#### Installation:
- Install by npm
```bash
npm i itptit-test-generator ts-node typescript
```

- Create typescript config ``tsconfig.json``

- Config your ts:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "strictPropertyInitialization": false,                             
    "experimentalDecorators": true,                  
    "emitDecoratorMetadata": true,                   
    "module": "nodenext",                              
    "moduleResolution": "NodeNext",                  
    "resolveJsonModule": true,                       
    "declaration": true,                             
    "esModuleInterop": true,                            
    "forceConsistentCasingInFileNames": true,        
    "skipLibCheck": true
  }
}

```

See example code: ``/example``
#### Define a test case structure:
```ts
class SubTest extends TestCase {
    @Int(1, 10)
    a: number;

    @Int(1, 10)
    b: number;

    template = `$a $b`;
}
```
This template will generate input: ``2 5`` (2 randomize number from 1-10)

#### Generate I/O files:
```ts
createTestCase({
    amount: 10, //Amount of test case 
    inputDir: "input", // Folder to save input files
    outputDir: "output", //Folder to save output files
    template: TestCaseInput, //Class template 
    solutionPath: "solve.cpp", //Solution path
    timeout: 15000, //Timeout (Optional)
    inputFilenameTemplate: "input$i.txt", //Filename template (Optional)
    outputFilenameTemplate: "input$i.txt", //Filename template
}).then(() => {
    console.log("DONE")
});
```

- Run generator:
```ts
ts-node <path-to-file>
```


#### Decorators 
```ts
@Int(min, max)
n: number; //Make a random number from min to max

// Example:
@Int(1, 100, ["prime"]) //"prime" : Only prime number, "odd"|"even"
n: number;

@Loop("$var") //Repeat generating $var time
@useSubGeneration(SomeSubTemplate) // Using with loop for repeat generate a template
name(){}

@NumberArray("$var") //Array of number, with $var elements
arr: number[];

@Word(minLength, maxLength) //Random words
str: string;

@WordArray(element, minLength, maxLength) // Words array with $element elements
str: string[];

@UseLogic(() => string | number, ["$array","$of","$variable","$if","$u","$need"])
mylogic: string;
```
