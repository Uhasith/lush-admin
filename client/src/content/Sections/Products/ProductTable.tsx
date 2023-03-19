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
import { deleteProduct, updateProduct } from '../../../store/actions/product.action';
import Label from 'src/components/Label';
import Modal from 'src/components/Modal';
import CreateProductForm from './CreateProductForm';
import { BASE_URL } from 'src/constants/common-configurations';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

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



  //////////////////////////3.1.2023/////////////////////////////////////////
  
  //////////////////////////3.1.2023/////////////////////////////////////////

  
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
        text: 'Active',
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

  const handleModalClose = () => {
    setSelectedProduct(null);
    setIsOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleToggle = (id,hasPromotion) => {

    dispatch(updateProduct({  
      id: id,
      data: Object.assign({ hasPromotion: !hasPromotion }) 
    }));
  };


  

  return (
    <>
      <TableContainer>

    {/* //////////////////////////3.15.2023///////////////////////////////////////// */}
    


    {/* //////////////////////////3.15.2023///////////////////////////////////////// */}
    
        <TableComponent>
          <TableHead>
            <TableRow>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Product ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Weight</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Sub Categories</TableCell>
              <TableCell align="center">Promote Product</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((product: any) => {
              return (
                <TableRow hover key={product.id}>
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
                      {`P-${leadingZeroes(product?.productId, 3)}`}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                  >
                    {product.images[0] ? (
                      <Avatar
                        sx={{
                          width: theme.spacing(8),
                          height: theme.spacing(11)
                        }}
                        variant="rounded"
                        alt={''}
                        src={
                          product.images[0].includes('http://') ||
                          product.images[0].includes('https://')
                            ? product.images[0]
                            : `${BASE_URL}/documents/product-img/${product.images[0]}`
                        }
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: theme.spacing(8),
                          height: theme.spacing(11)
                        }}
                        variant="rounded"
                        alt={''}
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                      />
                    )}
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {product?.name || '-'}
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
                      {`€ ${product?.price} per ${product?.unitType}` || '-'}
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
                      {`${product?.weight}` || '-'}
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
                      {product?.description || '-'}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {product?.category?.name || '-'}
                  </TableCell>

                  <TableCell align="center">
                    {product?.subCategories?.length > 0 ? (
                      product?.subCategories.map((subCat, index) => (
                        <Chip
                          label={subCat}
                          key={index}
                          sx={{ marginLeft: 1 }}
                        />
                      ))
                    ) : (
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        -
                      </Typography>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <FormControlLabel
                      value="start"
                      control={<Switch  
                      
                        color="primary"
                        checked={product.hasPromotion}
                        onChange={() => handleToggle(product.id,product.hasPromotion)} />}
                      label=""
                      labelPlacement="start"
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
                      {getProductStatusLabel(product.status)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          }
                        }}
                        color="error"
                        size="medium"
                        onClick={() => handleDeleteProduct(product?.id)}
                      >
                        <DeleteTwoToneIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          }
                        }}
                        color="info"
                        size="medium"
                        onClick={() => handleEditProduct(product)}
                      >
                        <EditTwoToneIcon />
                      </IconButton>
                    </Tooltip>
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
      <Modal
        isOpen={isOpen}
        width={800}
        handleClose={handleModalClose}
        content={
          <CreateProductForm
            formData={selectedProduct}
            onSuccess={handleModalClose}
          />
        }
        modalHeader={`${selectedProduct?.name} | Edit`}
      />
    </>
  );
};

export default ProductTable;
