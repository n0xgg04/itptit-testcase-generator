import path from "path";
import fs from "fs";
import _ from "lodash";
import { generate } from "./input-generator";
import { exec, execSync } from "child_process";
import { TestCase } from "@classes/input-test-case";
import { SolutionNotFoundException } from "@exceptions/file-exception";
import logger from "@utils/logger";

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
    console.clear();
    logger.clear();
    logger.info("Test case generator from @n0xgg04");
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
        logger.info("[Solution File] OK!");
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
        logger.info("[Input] Created input folder !");
    }

    if (fs.existsSync(outputRealPath)) {
    } else {
        fs.mkdirSync(outputRealPath, {
            recursive: true
        });
        logger.info("[Output] Created output folder !");
    }

    logger.info("Compiling solution...");

    exec(
        `g++ -o '${solutionExcFile}' '${solutionRealPath}'`,
        {
            timeout
        },
        (error, stdout, stderr) => {
            if (!error) {
                logger.info("Compiled solution file.");
                logger.info("Generating...");
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
                    exec(
                        `'${solutionExcFile}' < '${path.join(inputRealPath, inputFilenameTemplate?.replaceAll("$i", `${i + 1}`))}'`,
                        {
                            timeout
                        },
                        (error, stdout) => {
                            if (!error) {
                                fs.writeFileSync(outputPath, stdout);
                                console.log(`Generated test case ${i + 1}`);
                            } else {
                                console.log(error);
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