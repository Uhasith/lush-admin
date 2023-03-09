import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Select,
  MenuItem,
  CardHeader,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import FarmTable from './FarmTable';
import { fetchAllFarms } from '../../../store/actions/farm.action';
import { DATE_FORMAT } from 'src/constants/common-configurations';
interface Filters {
  status?: string;
  sorted?: string;
}

const sortOptions = [
  {
    id: 'asc',
    name: 'Asc'
  },
  {
    id: 'desc',
    name: 'Desc'
  }
];

const CardHeaderComponent = styled(CardHeader)(
  () => `
    .MuiCardHeader-action{
     width:65%;
    }
`
);

function FarmLayout() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [filters, setFilters] = useState<Filters>({
    status: 'All',
    sorted: 'desc'
  });

  const farmList = useSelector(({ farm }: RootStateOrAny) => farm.list);

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(
      fetchAllFarms({
        status: 'All',
        sorted: 'desc'
      })
    );
  }, []);

  const onFarmSearch = ({
    status,
    worker,
    sorted,
    startDate,
    endDate
  }: any) => {
    const payload = {
      status,
      worker,
      sorted,
      startDate: moment(startDate).format(DATE_FORMAT),
      endDate: moment(endDate).format(DATE_FORMAT)
    };

    dispatch(fetchAllFarms(payload));
  };

  const handleSortChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      sorted: value
    }));
  };

  const applyFilters = (): any => {
    onFarmSearch(filters);
  };

  return (
    <>
      {!loading ? (
        <Card>
          <CardHeaderComponent
            action={
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                  columnGap: '20px'
                }}
              >
                <FormControl sx={{ width: '180px' }} variant="outlined">
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sorted || 'desc'}
                    onChange={handleSortChange}
                    label="Sort"
                    autoWidth
                  >
                    {sortOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <IconButton
                  sx={{
                    '&:hover': {
                      background: theme.colors.primary.lighter
                    },
                    color: '#5569FF',
                    width: '10%'
                  }}
                  color="inherit"
                  size="small"
                  onClick={applyFilters}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            }
            title="Farmer's Market Management"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />

          <Divider />

          {farmList?.length > 0 ? (
            <FarmTable categories={farmList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh'
              }}
            >
              <h4>No farmer's market found</h4>
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

export default FarmLayout;
