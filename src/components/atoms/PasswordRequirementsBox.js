import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Done } from '@material-ui/icons';

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

const passwordRequirements = [
  'La contraseña debe tener al menos 8 caracteres',
  'Debe utilizar al menos un número',
  'Debe utilizar al menos una letra minúscula',
  'Debe utilizar al menos una letra mayúscula',
  'Debe utilizar un caracter especial de entre: (! @ + # $ % ^ & *)'
];

export const PasswordRequirementsBox = () => {
  const classes = useStyles();

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
