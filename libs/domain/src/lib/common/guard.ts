interface PropertyMetadata {
  propName: string;
  value: unknown;
}
export class Guard {
  public static AgainstNullOrUndefined(props: PropertyMetadata[]) {
    props.forEach(prop => {
      if (prop.value == null || prop.value == undefined) {
        throw new Error(`${prop.propName}: ${prop.value}. ${prop.propName} cannot have value of null or undefined.`);
      }
    });
  }
  public static AgainstEmptyArray(prop: PropertyMetadata) {
    if (!Array.isArray(prop.value)) {
      throw new Error(`${prop.propName}: ${prop.value}. ${prop.propName} is not an array `);
    }
    if (!prop.value.length) {
      throw new Error(`${prop.propName}: ${prop.value}. ${prop.propName} is an empty array `);
    }
  }
}
