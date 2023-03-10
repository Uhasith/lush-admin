

import { Typography, Button, Grid, Input, Box } from '@mui/material';




export default function PageHeader() {





  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Wallet
        </Typography>
        {/* <Typography variant="subtitle2">All product details</Typography> */}
      </Grid>
      
    </Grid>
  );
}
