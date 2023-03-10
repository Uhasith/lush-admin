import { FC, ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import leadingZeroes from 'leading-zeroes';
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
  Chip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  deleteProduct,
  updateProduct
} from '../../../store/actions/product.action';
import Label from 'src/components/Label';


import Stack from '@mui/material/Stack';
interface ProductTableProps {
  products?: any[];
}

const TableComponent = styled(Table)(
  () => `
    .css-1mhwo98-MuiTypography-root{
      width:185px;
    }
`
);

const ProductTable: FC<ProductTableProps> = ({ products }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const theme = useTheme();

  const applyPagination = (
    _products: any,
    page: number,
    limit: number
  ): any => {
    return _products.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredReports = products;

  const paginatedReports = applyPagination(filteredReports, page, limit);

  const getProductStatusLabel = (status: string): JSX.Element => {
    const map = {
      Active: {
        text: 'Completed',
        color: 'success'
      },
      Pending: {
        text: 'Pending',
        color: 'warning'
      }
    };

    const { text, color }: any = map[status];

    return <Label color={color}>{text}</Label>;
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleToggle = (id, hasPromotion) => {
    dispatch(
      updateProduct({
        id: id,
        data: Object.assign({ hasPromotion: !hasPromotion })
      })
    );
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
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Delivery Status</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((product: any) => {
              return (
                <TableRow hover key={product.id}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      ID151
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
                      Praveen
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
                          {moment(product?.createdAt).format('YYYY-MM-DD') ||
                            '-'}
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
                      {moment(product?.createdAt).format('YYYY-MM-DD') || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      sx={{ textTransform: 'capitalize' }}
                    >
                      <Stack direction="row" spacing={1}>
                        <Chip label="Apple&#215;2" />
                        <Chip label="Rice&#215;2" />
                      </Stack>
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
                      {getProductStatusLabel(product.status)}
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
                      50&#36;
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableComponent>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredReports.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </>
  );
};

export default ProductTable;
