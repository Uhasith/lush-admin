import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Box } from '@mui/material';
import Footer from 'src/components/Footer';
import BarChart from 'src/components/Graph/Graph';
import WatchList from './WatchList';
import { errorClose } from 'src/store/actions/common.actions';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(errorClose());
  }, []);

  return (
    <>
      <Helmet>
        <title>Lush | Admin</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
        <br />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pb: 3 }}
        >
          <Typography variant="h3">Data Analyst Monthly Sales</Typography>
        </Box>

        <div className="graph">
          <BarChart />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
