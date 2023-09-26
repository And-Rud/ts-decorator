import { KeyObject } from "crypto";

function myDecorator(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    console.log(target, propertyKey, descriptor);
}

class ExampleClass {
    @myDecorator
    method() {}
}

const obj = new ExampleClass();

obj.method();
//====================================================
function memoise(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const cache = new Map();

    descriptor.value = function (...args: any[]) {
        const key = args.toString();

        if (cache.has(key)) {
            console.log(`In cache ${key}`);
            return cache.get(key);
        } else {
            const result = originalMethod.apply(this, args);
            cache.set(key, result);
            console.log(`Saved in cache ${key}`);
            return result;
        }
    };
    return descriptor;
}

class MathOperations {
    @memoise
    factorial(n: number): number {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * this.factorial(n - 1);
        }
    }
}

const mathOps = new MathOperations();

console.log(mathOps.factorial(5));
