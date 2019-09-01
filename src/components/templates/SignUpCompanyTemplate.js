import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { SimpleSelect } from '../atoms';

const provinces = [
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán'
];

const provincesItems = [];

for (let i = 0; i < provinces.length; i++) {
  provincesItems.push({ value: i, label: provinces[i] });
}

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
        <SimpleSelect
          name="province"
          label="Provincia"
          fullWidth
          items={provincesItems}
        />
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
