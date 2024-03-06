export class SolutionNotFoundException extends Error {
    constructor(path: string) {
        super(`Solution in ${path} is not found!`);
    }
}

export class InitializeFailedException extends Error {
    constructor(err?: string) {
        super(`Failed to create folder/file. Error: ${err}`);
    }
}
