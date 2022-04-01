import { ValueObject } from '../common';

interface NameProps {
  value: string;
}
export class Email extends ValueObject<NameProps> {
  private static validationRegex = new RegExp(
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/
  );
  get value() {
    return this._props.value;
  }
  private constructor(props: NameProps) {
    super(props);
  }
  public static create(email: string) {
    if (this.validationRegex.test(email)) {
      return new Email({ value: email });
    }
    throw new Error(`unable to validate email ${email}`);
  }
}
