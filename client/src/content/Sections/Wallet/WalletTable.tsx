import { FC, ChangeEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
  Typography,
  Tooltip,
  IconButton,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Modal } from 'antd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import Label from 'src/components/Label';
import Select from 'react-select';
import { updateOrder } from 'src/store/actions/order.action';

interface ProductTableProps {
  products?: any[];
  orderList?: any[];
}

const TableComponent = styled(Table)(
  () => `
    .css-1mhwo98-MuiTypography-root{
      width:185px;
    }
`
);

const theme = useTheme();

const ProductTable: FC<ProductTableProps> = ({ orderList }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedPage = localStorage.getItem('page');
    if (savedPage) {
      setPage(parseInt(savedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.removeItem('page');
  }, []);

  const applyPagination = (
    _orderList: any,
    page: number,
    limit: number
  ): any => {
    return _orderList.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
    localStorage.setItem('page', newPage.toString());
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleViewOrder = (id: string, products: any[]) => {
    setSelectedOrderProducts(products);
    setIsModalOpen(true);
  };

  const filteredReports = orderList;

  const paginatedReports = applyPagination(filteredReports, page, limit);

  const options = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Dispatched', label: 'Dispatched' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const handleDropdown = (id, status) => {
    dispatch(
      updateOrder({
        id: id,
        data: Object.assign({ status: status })
      })
    );
  };

  const getProductStatusLabel = (status: string): JSX.Element => {
    const map = {
      Dispatched: {
        text: 'Dispatched',
        color: 'success'
      },
      Pending: {
        text: 'Pending',
        color: 'warning'
      },
      Cancelled: {
        text: 'Cancelled',
        color: 'error'
      }
    };

    if (map.hasOwnProperty(status)) {
      const { text, color }: any = map[status];
      return <Label color={color}>{text}</Label>;
    } else {
      return <Label color="error">Invalid Status</Label>;
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <TableContainer>
        <TableComponent>
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="center">Customer Name</TableCell>
              <TableCell align="center">Ordered Date</TableCell>
              <TableCell align="center">Delivery Date</TableCell>
              <TableCell align="center">Change Delivery Status</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((order: any) => {
              return (
                <TableRow hover key={order.id}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      XLR {order?.oderId}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {`${order?.buyer?.firstName} ${order?.buyer?.lastName}`}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '15px',
                        justifyContent: 'center'
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          color="text.primary"
                          gutterBottom
                          noWrap
                          align="left"
                        >
                          {moment(order?.createdAt).format('YYYY-MM-DD') || '-'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {moment(order?.createdAt).format('YYYY-MM-DD') || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Select
                      isDisabled={order.status === 'Cancelled'}
                      options={options}
                      value={options.find(
                        (option) => option.value === order.status
                      )}
                      onChange={(selectedOption) =>
                        handleDropdown(order.id, selectedOption.value)
                      }
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getProductStatusLabel(order?.status)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {order?.totalPrice}€
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="View" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          }
                        }}
                        color="success"
                        size="medium"
                        onClick={() =>
                          handleViewOrder(order?.id, order?.products)
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableComponent>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredReports.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25, 30]}
      />
      <Modal
        visible={isModalOpen}
        onCancel={handleModalClose}
        title="Product Details Contain in the Order"
        width={800}
        style={{ height: 600 }}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>
        ]}
      >
        <TableContainer>
          <TableComponent>
            <TableHead>
              <TableRow>
                <TableCell align="center">Product ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrderProducts.map((p) => (
                <TableRow hover key={p.id}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {p?.product?.id}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {p?.product?.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {p?.qty}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {p?.product?.price}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableComponent>
        </TableContainer>
      </Modal>
    </>
  );
};

export default ProductTable;
