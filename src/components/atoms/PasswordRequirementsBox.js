import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import withLocalization from '../../localization/withLocalization';

const useStyles = makeStyles(theme => ({
  listRoot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  listItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0)
  }
}));

const PasswordRequirementsBoxComponent = ({ i10n }) => {
  const classes = useStyles();

  const passwordRequirements = [
    i10n['sign-up--initial.password-strength.minChar'],
    i10n['sign-up--initial.password-strength.oneNumber'],
    i10n['sign-up--initial.password-strength.oneLowerCaseChar'],
    i10n['sign-up--initial.password-strength.oneUpperCaseChar'],
    i10n['sign-up--initial.password-strength.oneSpecialSymbol']
  ];

  return (
    <List component="nav" className={classes.listRoot}>
      {passwordRequirements.map(item => (
        <ListItem className={classes.listItem}>
          <ListItemIcon>
            <Done />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

export const PasswordRequirementsBox = withLocalization(
  PasswordRequirementsBoxComponent
);
