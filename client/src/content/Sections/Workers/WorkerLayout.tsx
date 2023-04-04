import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  IconButton,
  useTheme,
  Card,
  Divider,
  CardHeader,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import {} from '@mui/material';
import _ from 'lodash';
import WorkerTable from './WorkerTable';

import { fetchWorkerList } from '../../../store/actions/worker.actions';
import { fetchAllFarms } from '../../../store/actions/farm.action';

function WorkerLayout() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const workerList = useSelector(({ worker }: RootStateOrAny) => worker.list);
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const [userText, setUserText] = useState('');
  useEffect(() => {
    dispatch(fetchWorkerList());
  }, []);
  useEffect(() => {
    dispatch(fetchAllFarms());
  }, []);

  const _workerList =
    _.reject(
      workerList,
      (worker: any) =>
        worker.status == 'Pending' ||
        worker.status == 'Reviewing' ||
        worker.userType == 'Visitor'
    ) || [];

  const handleUserChange = (event: any) => {
    setUserText(event.target.value);
  };

  const applyFilters = (): any => {
    if (userText.length > 0) {
      dispatch(fetchWorkerList({ worker: userText }));
    } else {
      dispatch(fetchWorkerList());
    }
  };

  return (
    <>
      {!loading ? (
        <Card>
          <CardHeader
            title="Farmers"
            action={
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                  columnGap: '20px'
                }}
              >
             
              </Box>
            }
          />
          <Divider />

          {_workerList.length > 0 ? (
            <WorkerTable workers={_workerList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <h4>No Active Farmers</h4>
            </Box>
          )}
        </Card>
      ) : (
        <Box
          sx={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress size={64} disableShrink thickness={3} />
        </Box>
      )}
    </>
  );
}

export default WorkerLayout;
