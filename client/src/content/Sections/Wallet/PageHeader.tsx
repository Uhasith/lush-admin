import { Typography, Grid } from '@mui/material';

export default function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Wallet
        </Typography>
      </Grid>
    </Grid>
  );
}
