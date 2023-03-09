import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';
import ProductLayout from './ProductLayout';

function ProductList() {
  return (
    <>
      <Helmet>
        <title>Products</title>
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
            <ProductLayout />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ProductList;
