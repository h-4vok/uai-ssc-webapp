import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditUserTemplate } from '../templates';

class EditUserPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.userId = this.props.match.params.id;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: {},
      roles: [],
      clientCompanies: [],
      allLoaded: false
    };
  }

  loadCompanies() {
    this.api.request
      .get('clientcompany')
      .success(res => {
        this.setState({
          clientCompanies: res.body.Result
        });

        if (this.userId) {
          this.loadModel();
        } else {
          this.setState({
            allLoaded: true
          });
        }
      })
      .go();
  }

  loadModel() {
    this.api.request
      .getById('user', this.userId)
      .success(res => {
        this.setState({
          model: res.body.Result,
          allLoaded: true
        });
      })
      .go();
  }

  componentDidMount() {
    this.api.request
      .get('role?userNameLike=')
      .success(res => {
        this.setState({
          roles: res.body.Result
        });

        this.loadCompanies();
      })
      .go();
  }

  onConfirm = () => {
    if (this.userId) {
      this.updateModel();
    } else {
      this.createModel();
    }
  };

  createModel = () => {
    this.api.request
      .post('user', this.state.model)
      .success(() => {
        this.props.history.push('/security/user');
      })
      .go();
  };

  updateModel = () => {
    this.api.request
      .put('user', this.state.model, this.userId)
      .success(() => {
        this.props.history.push('/security/user');
      })
      .go();
  };

  render() {
    const { model, roles, clientCompanies, allLoaded } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && (
          <EditUserTemplate
            modelId={this.roleId}
            model={model}
            roles={roles}
            clientCompanies={clientCompanies}
            onConfirm={() => this.onConfirm()}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const EditUserPage = withSnackbar(EditUserPageComponent);
