import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import CategoryLayout from './CategoryLayout';

function CategoryList() {
  return (
    <>
      <Helmet>
        <title>Product Categories</title>
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
            <CategoryLayout />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default CategoryList;
