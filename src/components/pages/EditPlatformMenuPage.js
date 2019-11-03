import React, { PureComponent } from 'react';
import { withSnackbar } from 'notistack';
import { PlatformPageLayout } from '../organisms';
import { SnackbarVisitor } from '../../lib/SnackbarVisitor';
import { API } from '../../lib/xhr';
import { EditPlatformMenuTemplate } from '../templates';
import { buildPlatformMenuXml } from '../../lib/buildPlatformMenuXml';

const apiRoute = 'platformmenu';
const fallbackRoute = '/configuration/platform-menu';

class EditPlatformMenuPageComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.modelId = this.props.match.params.id;
    this.notifier = new SnackbarVisitor(props);
    this.api = new API(this.notifier);

    this.state = {
      model: {},
      allLoaded: false,
      translationKeys: [],
      permissions: []
    };
  }

  loadSatelliteData(callback) {
    this.loadTranslationKeys(() => this.loadPermissions(callback));
  }

  loadTranslationKeys(callback) {
    this.api.request
      .get('translationkeys')
      .success(res => {
        this.setState({
          translationKeys: res.body.Result
        });
      })
      .success(callback)
      .go();
  }

  loadPermissions(callback) {
    this.api.request
      .get('permission')
      .success(res => {
        this.setState({
          permissions: res.body.Result
        });
      })
      .success(() => {
        if (callback) {
          callback();
        } else {
          this.setState({ allLoaded: true });
        }
      })
      .go();
  }

  loadModel = () => {
    this.api.request
      .getById(apiRoute, this.modelId)
      .success(res => {
        this.setState({
          model: res.body.Result,
          allLoaded: true
        });
      })
      .go();
  };

  componentDidMount() {
    if (this.modelId) {
      this.loadSatelliteData(this.loadModel);
    } else {
      this.loadSatelliteData();
    }
  }

  onConfirm = () => {
    if (this.modelId) {
      this.updateModel();
    } else {
      this.createModel();
    }
  };

  buildBody = () => {
    const test = [
      {
        Id: 10,
        MenuOrder: 1,
        RelativeRoute: '/something',
        TranslationKey: 'something else',
        RequiredPermissions: [
          { Id: 1, Code: 'permission1' },
          { Id: 2, Code: 'permission2' }
        ]
      },
      {
        Id: 11,
        MenuOrder: 2,
        RelativeRoute: '/something2',
        TranslationKey: 'something else2',
        RequiredPermissions: [
          { Id: 1, Code: 'permission3' },
          { Id: 2, Code: 'permission4' }
        ]
      }
    ];

    const body = {
      PlatformMenu: this.state.model,
      XmlSerializedItems: buildPlatformMenuXml(test),
      XmlSerializedItems2: buildPlatformMenuXml(this.state.model.Items)
    };

    console.log({ body });

    return body;
  };

  createModel = () => {
    const body = this.buildBody();

    this.api.request
      .post(apiRoute, body)
      .success(() => {
        this.props.history.push(fallbackRoute);
      })
      .go();
  };

  updateModel = () => {
    const body = this.buildBody();

    this.api.request
      .put(apiRoute, body, this.modelId)
      .success(() => {
        this.props.history.push(fallbackRoute);
      })
      .go();
  };

  render() {
    const { model, allLoaded, translationKeys, permissions } = this.state;

    return (
      <PlatformPageLayout>
        {allLoaded && (
          <EditPlatformMenuTemplate
            modelId={this.modelId}
            model={model}
            translationKeys={translationKeys}
            permissions={permissions}
            onConfirm={() => this.onConfirm()}
          />
        )}
      </PlatformPageLayout>
    );
  }
}

export const EditPlatformMenuPage = withSnackbar(EditPlatformMenuPageComponent);
