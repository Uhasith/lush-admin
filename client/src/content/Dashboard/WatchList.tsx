import { useEffect, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import {
  Box,
  Grid,
  Card,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import WatchListColumn2 from './WatchListColumn2';
import WatchListColumn3 from './WatchListColumn3';
import WatchListColumn4 from './WatchListColumn4';
import { fetchDashboardData } from 'src/store/actions/common.actions';
import { fetchDetailedChartData } from 'src/store/actions/common.actions';

function WatchList() {
  const dispatch = useDispatch();
  const [selectedWorker, setSelectedWorker] = useState('');
  const _dashboard = useSelector(({ dashboard }: RootStateOrAny) => dashboard);
  const currentUser = useSelector(({ auth }: RootStateOrAny) => auth?.user);

  const workerList = useSelector(
    ({ activeWorker }: RootStateOrAny) => activeWorker.list
  );

  useEffect(() => {
    currentUser?.role == 'Admin' && dispatch(fetchDashboardData());
  }, []);

  useEffect(() => {
    handleWorkerData();
  }, [workerList]);

  useEffect(() => {
    if (selectedWorker) {
      dispatch(fetchDetailedChartData(selectedWorker));
    }
  }, [selectedWorker]);

  const handleWorkerData = () => {
    if (workerList?.length > 0) {
      setSelectedWorker(workerList?.[0]?.id);
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Overview</Typography>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <>
          <Grid item lg={4} xs={12}>
            <WatchListColumn2 count={_dashboard?.workers} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <WatchListColumn3 count={_dashboard?.newApplicants} />
          </Grid>
          <Grid item lg={4} xs={12}>
            <WatchListColumn4 count={_dashboard?.jobs} />
          </Grid>
        </>
      </Grid>
    </>
  );
}

export default WatchList;
