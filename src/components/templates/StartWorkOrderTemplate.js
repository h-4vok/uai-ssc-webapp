import React, { PureComponent } from 'react';
import {
  Typography,
  Box,
  Button,
  Container,
  AppBar,
  Tabs,
  Tab
} from '@material-ui/core';
import { PlaylistAddCheck, PlaylistAdd } from '@material-ui/icons';
import { ParentSamplesSearch } from '../organisms';
import withLocalization from '../../localization/withLocalization';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

class StartWorkOrderTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { samples } = this.props;

    this.state = {
      selectableSamples: this.mapAsSelectableSamples(samples),
      tabValue: 0
    };
  }

  mapAsSelectableSamples = samples => {
    return samples;
  };

  handleTabChange = (evt, newTab) => this.setState({ tabValue: newTab });

  render() {
    const { model, i10n, onConfirm } = this.props;
    const { selectableSamples, tabValue } = this.state;

    return (
      <Container maxWidth="md">
        <Box mt={3} mb={1}>
          <Typography variant="h5">
            {i10n['start-work-order.page.title']}
          </Typography>
        </Box>
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              label={i10n['start-work-order.page.select-your-samples']}
              icon={<PlaylistAdd />}
            />
            <Tab
              label={i10n['start-work-order.page.selected-samples']}
              icon={<PlaylistAddCheck />}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <ParentSamplesSearch samples={selectableSamples} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <p>Hola maestro 2</p>
        </TabPanel>
        <Box mt={4}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={onConfirm}
          >
            {i10n['global.confirm']}
          </Button>
        </Box>
      </Container>
    );
  }
}

export const StartWorkOrderTemplate = withLocalization(
  StartWorkOrderTemplateComponent
);
