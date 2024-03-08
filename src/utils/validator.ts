import { TestCase } from "@classes/input-test-case";
import { TypeException } from "@exceptions/type_exception";

export default function getNumberOfVariable(
    elements_total: string | number,
    testCaseInstance: TestCase
): number {
    if (typeof elements_total == "string") {
        const var_name = elements_total.replaceAll("$", "");
        if (!Object.hasOwn(testCaseInstance, `${var_name}`))
            throw new TypeException(`$${var_name} is not existed.`);
        const value =
            testCaseInstance[var_name as keyof typeof testCaseInstance];

        if (!Number.isInteger(value))
            throw new TypeException(`$${var_name} must be a number.`);
        elements_total = Number(value);
    }
    return elements_total;
}
