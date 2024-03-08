import { createTestCase, Int, TestCase, UseLogic, WordArray } from "../";

function MyLogic(a: number, b: number) {
    return a + b;
}

export class TestCaseInput extends TestCase {
    @Int(1, 10)
    n: number;

    @Int(1, 10)
    m: number;

    @WordArray(2, 1, 100)
    s: string[];

    @UseLogic(MyLogic, ["$m", "$n"])
    a: number;

    template = `$n\n$a`;
}

createTestCase({
    amount: 1,
    inputDir: "input",
    outputDir: "output",
    template: TestCaseInput,
    solutionPath: "solve.cpp"
}).then();
