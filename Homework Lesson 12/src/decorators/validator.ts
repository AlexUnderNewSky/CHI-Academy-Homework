function ValidateArgs(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    args.forEach((arg, index) => {
      if (typeof arg !== "object") {
        throw new Error(`Argument #${index + 1} is not a object!`);
      }
    });
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

export { ValidateArgs };
