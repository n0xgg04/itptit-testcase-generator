import { TestCase } from "@classes/input-test-case";
import Effect from "@enums/effect";
import { generate } from "@/../input-generator";

export function UseSubGeneration(testCase: new (...arg: any[]) => TestCase) {
    return function <T extends Object>(
        target: T,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metadataKey = `effect:${propertyKey.toString()}`;
        const effectList: Array<Effect> = Reflect.hasMetadata(
            metadataKey,
            target
        )
            ? Reflect.getMetadata(metadataKey, target)
            : [];

        Reflect.defineMetadata(
            metadataKey,
            [...effectList, Effect.UseSubGeneration],
            target
        );

        Reflect.defineMetadata(
            `${metadataKey}:use_sub_generation`,
            testCase,
            target
        );

        descriptor.value = () => {
            return generate(testCase);
        };
    };
}
