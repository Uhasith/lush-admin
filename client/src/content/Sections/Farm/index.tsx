import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import FarmLayout from './FarmLayout';

function FarmList() {
  return (
    <>
      <Helmet>
        <title>Farmer's Market</title>
      </Helmet>
      <PageTitleWrapper maxWidth="xl">
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <FarmLayout />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default FarmList;
