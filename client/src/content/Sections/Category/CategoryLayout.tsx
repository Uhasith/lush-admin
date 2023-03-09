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
import leadingZeroes from 'leading-zeroes';

import CategoryTable from './CategoryTable';
import { fetchAllCategories } from '../../../store/actions/category.action';
import { DATE_FORMAT } from 'src/constants/common-configurations';
interface Filters {
  status?: string;
  sorted?: string;
}

const statusOptions = [
  {
    id: 'All',
    name: 'All'
  },
  {
    id: 'Active',
    name: 'Active'
  },
  {
    id: 'Inactive',
    name: 'Inactive'
  }
];

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

function ReportLayout() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [filters, setFilters] = useState<Filters>({
    status: 'All',
    sorted: 'desc'
  });

  const categoryList = useSelector(
    ({ category }: RootStateOrAny) => category.list
  );
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(
      fetchAllCategories({
        status: 'All',
        sorted: 'desc'
      })
    );
  }, []);

  const onReportSearch = ({
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

    dispatch(fetchAllCategories(payload));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
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
    onReportSearch(filters);
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
                  <InputLabel> Category Status</InputLabel>
                  <Select
                    value={filters.status || 'All'}
                    onChange={handleStatusChange}
                    label="Status"
                    autoWidth
                  >
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
            title="Product Categories"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />

          <Divider />

          {categoryList?.length > 0 ? (
            <CategoryTable categories={categoryList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh'
              }}
            >
              <h4>No categories found</h4>
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

export default ReportLayout;
