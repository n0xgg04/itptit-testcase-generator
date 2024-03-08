import path from "path";
import fs from "fs";
import _ from "lodash";
import { exec, execSync } from "child_process";
import { TestCase } from "@classes/input-test-case";
import { SolutionNotFoundException } from "@exceptions/file-exception";
import { generate } from "@/generators/input-generator";
import logger from "@utils/logger";
import os from 'os'


type Props = {
    template: new (...arg: any[]) => TestCase;
    amount: number;
    inputDir: string;
    outputDir: string;
    solutionPath: string;
    baseDir?: string;
    inputFilenameTemplate?: string;
    outputFilenameTemplate?: string;
    timeout?: number;
};
export default async function createTestCase({
    baseDir,
    solutionPath,
    inputDir,
    outputDir,
    amount,
    template,
    inputFilenameTemplate = "input$i.txt",
    outputFilenameTemplate = "output$i.txt",
    timeout = 15000
}: Props) {

    if(os.platform() === "win32"){
        inputDir = inputDir.replaceAll('/','\\')
        outputDir = outputDir.replaceAll('/','\\')
        solutionPath = solutionPath.replaceAll('/','\\')
    }

    console.clear();
    logger.clear();
    console.info("Test case generator from @n0xgg04");
    const basePath = baseDir || process.cwd();
    const solutionRealPath = path.join(basePath, solutionPath);
    const solutionFileName = path.basename(solutionPath);
    const inputRealPath = path.join(basePath, inputDir);
    const outputRealPath = path.join(basePath, outputDir);
    const cacheRealPath = path.join(basePath, "cache");
    const solutionBaseName = solutionFileName.split(".")[0];
    const solutionExt = solutionFileName.split(".")[1];
    const solutionExcFile = path.join(cacheRealPath, solutionBaseName);
    if (!fs.existsSync(solutionRealPath))
        throw new SolutionNotFoundException(solutionRealPath);
    else {
        console.info("[Solution File] OK!");
    }

    if (!fs.existsSync(cacheRealPath))
        fs.mkdirSync(cacheRealPath, {
            recursive: true
        });

    if (fs.existsSync(inputRealPath)) {
    } else {
        fs.mkdirSync(inputRealPath, {
            recursive: true
        });
        console.info("[Input] Created input folder !");
    }

    if (fs.existsSync(outputRealPath)) {
    } else {
        fs.mkdirSync(outputRealPath, {
            recursive: true
        });
        console.info("[Output] Created output folder !");
    }

    console.info("Compiling solution...");

    let compileCmd: string;
    if(os.platform() === "win32"){
        console.log("[OS] Windows")
        compileCmd = `g++ -o "${solutionExcFile}" "${solutionRealPath}"`.replaceAll('\\\\','\\')
    }else{
        compileCmd = `g++ -o '${solutionExcFile}' '${solutionRealPath}'`
    }
    exec(
        compileCmd,
        {
            timeout
        },
        (error, stdout, stderr) => {
            if (!error) {
                console.info("Compiled solution file.");
                console.info("Generating...");
                _.times(amount).map((i) => {
                    const inputPath = path.join(
                        inputRealPath,
                        inputFilenameTemplate?.replaceAll("$i", `${i + 1}`)
                    );
                    const outputPath = path.join(
                        outputRealPath,
                        outputFilenameTemplate?.replaceAll("$i", `${i + 1}`)
                    );
                    const input = generate(template);
                    fs.writeFileSync(inputPath, input);
                    let cmd: string;
                    if(os.platform() === "win32"){
                        cmd = `"${solutionExcFile.replaceAll('/','\\')}.exe" < "${path.join(inputRealPath, inputFilenameTemplate?.replaceAll("$i", `${i + 1}`).replaceAll('/','\\'))}"`.replaceAll('\\\\','\\')
                    }else{
                        cmd = `'${solutionExcFile}' < '${path.join(inputRealPath, inputFilenameTemplate?.replaceAll("$i", `${i + 1}`))}'`
                    }
                    exec(
                        cmd,
                        {
                            timeout
                        },
                        (error, stdout) => {
                            if (!error) {
                                fs.writeFileSync(outputPath, stdout);
                                console.log(`Generated test case ${i + 1}`);
                            } else {
                                console.log(`Failed to run ${cmd} :`,error);
                            }
                        }
                    );
                });
            } else {
                console.log(error);
            }
        }
    );
}
