import React, { PureComponent } from 'react';
import { PricingChart } from '../organisms/PricingChart';

export class SignUpPricingTemplate extends PureComponent {
  constructor(props) {
    super(props);

    const { model } = this.props;

    this.state = { model };
  }

  onInputChange = event => {
    this.props.model[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <PricingChart
        history={this.props.history}
        model={this.state.model}
        isSignUp
      />
    );
  }
}
