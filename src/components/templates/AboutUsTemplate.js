import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper, Link } from '@material-ui/core';

const styles = theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  paperRoot: {
    padding: theme.spacing(3, 4),
    margin: theme.spacing(2),
    minWidth: 500
  }
});

class AboutUsTemplateComponent extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <div>
            <Paper className={classes.paperRoot}>
              <Typography variant="h1" component="h3">
                Sobre Nosotros
              </Typography>
              <Typography component="p">
                Somos la plataforma de gestión de muestras clínicas y ensayos de
                investigación número uno del mercado. Nuestro compromiso
                constante con la calidad y con nuestros clientes nos diferencia
                en el mercado.
              </Typography>
            </Paper>
          </div>
          <div>
            <Paper className={classes.paperRoot}>
              <Typography variant="h3" component="h3">
                Contacto
              </Typography>
              <Typography component="p">
                Av. Paseo Colón 524, 1er Piso
              </Typography>
              <Typography component="p">4317-2839 / 3849 / 3888</Typography>
              <Typography component="p">
                <Link href="mailto:info@ssc.com.ar">info@ssc.com.ar</Link>
              </Typography>
            </Paper>
          </div>
        </div>
      </Container>
    );
  }
}

export const AboutUsTemplate = withStyles(styles)(AboutUsTemplateComponent);
