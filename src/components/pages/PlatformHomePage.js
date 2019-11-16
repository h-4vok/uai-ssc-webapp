import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { GlobalState } from '../../lib/GlobalState';

class PlatformHomePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.notifier = new SnackbarVisitor(this.props);
    this.api = new API(this.notifier);

    this.state = {
      allLoaded: false
    };
  }

  componentDidMount() {
    this.api.request
      .get('submittedfeedbackform?needForCurrentUser=true')
      .preventDefaultError()
      .preventDefaultFailure()
      .preventDefaultSuccess()
      .success(res => {
        const result = res.body.Result;
        const shouldRedirect = !result || !result.length;

        if (shouldRedirect) {
          this.props.history.push('/do-feedback-form');
          return;
        }

        this.setState({
          allLoaded: true
        });

        if (GlobalState.Authorizer.has('PLATFORM_ADMIN')) {
          //
        } else {
          this.props.history.push('/client-landing');
        }
      })
      .go();
  }

  render() {
    const { history } = this.props;
    const { allLoaded } = this.state;

    return (
      <PlatformPageLayout history={history}>
        {allLoaded && <div styles="text:align: center;">Comience a operar</div>}
      </PlatformPageLayout>
    );
  }
}

export const PlatformHomePage = withSnackbar(PlatformHomePageComponent);
