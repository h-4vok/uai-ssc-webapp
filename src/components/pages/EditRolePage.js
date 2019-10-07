import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditRoleTemplate } from '../templates';

class EditRolePageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.roleId = this.props.match.params.id;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);
    this.state = {
      model: {},
      permissions: [],
      allLoaded: false
    };
  }

  componentDidMount() {
    this.api.request
      .get('permission')
      .success(permissionResponse => {
        // Got permissions
        this.setState({
          permissions: permissionResponse.body.Result
        });

        // Get Model
        if (this.roleId) {
          this.api.request
            .get(`role/${this.roleId}`)
            .success(modelResponse => {
              this.setState({
                model: modelResponse.body.Result,
                allLoaded: true
              });
            })
            .go();
        } else {
          this.setState({ allLoaded: true, model: {} });
        }
      })
      .go();
  }

  onConfirm() {
    let route = 'role';
    let verb = 'post';

    if (this.roleId) {
      route = `role/${this.roleId}`;
      verb = 'put';
    }

    this.api.request[verb](route, this.state.model)
      .success(() => {
        this.props.history.push('/security/role');
      })
      .go();
  }

  render() {
    const { model, permissions, allLoaded } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && (
          <EditRoleTemplate
            modelId={this.roleId}
            model={model}
            permissions={permissions}
            onConfirm={() => this.onConfirm()}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const EditRolePage = withSnackbar(EditRolePageComponent);
