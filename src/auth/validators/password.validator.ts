import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class PasswordComplexityConstraint
  implements ValidatorConstraintInterface
{
  validate(password: string): Promise<boolean> | boolean {
    const complexityRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return complexityRegex.test(password);
  }

  defaultMessage() {
    return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
  }
}

export function PasswordComplexity() {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      validator: PasswordComplexityConstraint,
    });
  };
}
