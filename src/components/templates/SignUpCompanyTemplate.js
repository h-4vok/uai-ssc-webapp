import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export const SignUpCompanyTemplate = () => (
  <>
    <Typography variant="h6" gutterBottom>
      Datos de la compañía
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          id="companyName"
          name="companyName"
          label="Nombre de la empresa"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="province" name="province" label="Provincia" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="city" name="city" label="Ciudad" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField id="street" name="street" label="Calle" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="streetNumber"
          name="streetNumber"
          label="Número"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="department"
          name="department"
          label="Departamento"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="postalCode"
          name="postalCode"
          label="Código Postal"
          fullWidth
        />
      </Grid>
    </Grid>
  </>
);
