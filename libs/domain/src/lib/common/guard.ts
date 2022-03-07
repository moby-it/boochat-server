interface PropertyMetadata {
    propName: string;
    value: unknown;
}
export class Guard {
    public static AgainstNullOrUndefined<T>(props: PropertyMetadata[]) {
        props.forEach(prop => {
            if (prop.value == null || prop.value == undefined) {
                throw new Error(`${prop.propName}: ${prop.value}. ${prop.propName} cannot have value of null or undefined.`);
            }
        });
    }
}