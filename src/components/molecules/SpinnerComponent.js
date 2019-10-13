import React, { PureComponent } from 'react';
import LoadingOverlay from 'react-loading-overlay';

export class SpinnerComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this.spinnerService = this.props.spinnerService;
    this.spinnerService.attachComponent(this);
  }

  show() {
    this.setState({ active: true });
  }

  hide() {
    this.setState({ active: false });
  }

  render() {
    const { active } = this.state;

    return (
      <LoadingOverlay
        active={active}
        spinner
        styles={{
          wrapper: {
            position: active ? 'fixed' : 'inherit',
            top: '0px',
            bottom: '0px',
            left: '0px',
            right: '0px'
          }
        }}
      >
        {this.props.children}
      </LoadingOverlay>
    );
  }
}
