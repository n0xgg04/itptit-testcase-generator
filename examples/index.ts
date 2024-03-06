import { Int, Loop, NumberArray, UseSubGeneration } from "../decorators";
import { TestCase } from "../classes/input-test-case";
import createTestCase from "../test-case-generator";

class SubTest extends TestCase {
    @Int(1, 10)
    a: number;

    @Int(1, 10)
    b: number;

    template = `$a $b`;
}

export class TestCaseInput extends TestCase {
    @Int(1, 2)
    n: number;

    @Int(1, 10)
    s: number;

    @NumberArray("$n", 1, 100)
    array: number[];

    @NumberArray("$s", 1, 100)
    array2: number[];

    @Loop("$n")
    @UseSubGeneration(SubTest)
    Test() {}

    template = `$n $s\n$array\n$Test`;
}

createTestCase({
    amount: 10,
    inputDir: "input",
    outputDir: "output",
    template: TestCaseInput,
    solutionPath: "solve.cpp"
}).then();
