export class ValidatorVisitor {
  constructor(model) {
    this.model = model;
    this.validations = this.validations || {};
  }

  validate(...args) {
    // If we are given values then we only validate those fields. Otherwise all of them.
    const properties = args || Object.keys(this.validations);

    // Output message
    let msg = true;
    const invalidPropFound = () => msg !== true;

    // Iterate all propeties received
    properties.forEach(property => {
      if (invalidPropFound()) {
        return;
      }

      // See what closures that property maps to
      const propertySpecs = this.validations[property];
      if (!propertySpecs) return;

      // Validate that property
      propertySpecs.forEach(spec => {
        if (invalidPropFound()) return;

        msg = spec();
      });
    });

    return msg;
  }
}
