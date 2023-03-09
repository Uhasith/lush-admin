import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import TextField from '@mui/material/TextField';
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
import CachedIcon from '@mui/icons-material/Cached';
import ProductTable from './ProductTable';
import { fetchAllProducts } from '../../../store/actions/product.action';
import { DATE_FORMAT } from 'src/constants/common-configurations';
import { fetchAllCategories } from 'src/store/actions/category.action';
interface Filters {
  status?: string;
  sorted?: string;
  name?: string;
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
    id: 'Pending',
    name: 'Pending'
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

function ProductLayout() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [filters, setFilters] = useState<Filters>({
    name: '',
    status: 'All',
    sorted: 'desc'
  });

  const productList = useSelector(
    ({ product }: RootStateOrAny) => product.list
  );
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  useEffect(() => {
    dispatch(
      fetchAllProducts({
        status: 'All',
        sorted: 'desc'
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllCategories({
        status: 'Active',
        sorted: 'desc'
      })
    );
  }, []);

  const onReportSearch = ({
    name,
    status,
    sorted,
    startDate,
    endDate
  }: any) => {
    const payload = {
      name,
      status,
      sorted,
      startDate: moment(startDate).format(DATE_FORMAT),
      endDate: moment(endDate).format(DATE_FORMAT)
    };

    dispatch(fetchAllProducts(payload));
    setFilters({ name: '', status: 'All', sorted: 'desc' });
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

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      name: value
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
                  <TextField
                    label="Product Search"
                    onChange={handleSearchInput}
                  />
                </FormControl>

                <FormControl sx={{ width: '180px' }} variant="outlined">
                  <InputLabel> Product Status</InputLabel>
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
            title="Product Management"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />

          <Divider />

          {productList?.length > 0 ? (
            <ProductTable products={productList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh'
              }}
            >
              <h4>No products found</h4>
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

export default ProductLayout;
