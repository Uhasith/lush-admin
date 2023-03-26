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
import WalletTable from './WalletTable';
import { fetchAllOrders } from '../../../store/actions/order.action';
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
    id: 'Completed',
    name: 'Completed'
  },
  {
    id: 'Pending',
    name: 'Pending'
  }
];

const CardHeaderComponent = styled(CardHeader)(
  () => `
    .MuiCardHeader-action{
     width:65%;
    }
`
);

function OrderLayout() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [orderItems, setOrderItems] = useState([]);

  const [filters, setFilters] = useState<Filters>({
    name: '',
    status: 'All',
    sorted: 'desc'
  });

  const orderList = useSelector(({ order }: RootStateOrAny) => order.list);

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);
  const currentUser = useSelector(({ auth }: RootStateOrAny) => auth.user);

  useEffect(() => {
    dispatch(
      fetchAllOrders({
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

  useEffect(() => {
    filterOrderList();
  }, [orderList]);

  const filterOrderList = () => {
    const updatedList = orderList?.filter((order: any) => {
      const productOwner = order.products.filter(
        (product: any) => product?.product?.createdBy === currentUser?._id
      );
      return productOwner.length > 0;
    });

    const result = updatedList.map((order: any) => {
      const _product = order.products.find(
        (product: any) => product.product.createdBy === currentUser?._id
      );

      return {
        oderId: order?.orderId,
        buyerFirstName: `${_product?.buyer?.firstName} ${_product?.buyer?.lastName}`,
        productName: _product?.product?.name,
        productQty: _product?.qty,
        status: order?.status,
        price: _product?.price,
        orderdDate: order?.createdAt
      };
    });

    setOrderItems(result);
  };

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

    dispatch(fetchAllOrders(payload));
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
                  <InputLabel> Payment Status</InputLabel>
                  <Select
                    value={filters.status || 'All'}
                    onChange={handleStatusChange}
                    label="Status"
                    autoWidth
                  >
                    {statusOptions?.map((statusOption) => (
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
            title="Payment Status"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />

          <Divider />

          {orderItems?.length > 0 ? (
            <WalletTable orderList={orderList} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh'
              }}
            >
              <h4>No wallet items found</h4>
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

export default OrderLayout;
