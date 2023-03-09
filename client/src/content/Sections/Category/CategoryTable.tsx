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
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';

import Label from 'src/components/Label';
import Modal from 'src/components/Modal';
import ShiftTable from '../Jobs/ShiftTable';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteCategory } from '../../../store/actions/category.action';
import CreateCategoryForm from './CreateCategoryForm';

interface ReportTableProps {
  categories?: any[];
}

const TableComponent = styled(Table)(
  () => `
    .css-1mhwo98-MuiTypography-root{
      width:185px;
      
    }
`
);

const ReportTable: FC<ReportTableProps> = ({ categories }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const theme = useTheme();

  const applyPagination = (
    _categories: any,
    page: number,
    limit: number
  ): any => {
    return _categories.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredReports = categories;

  const paginatedReports = applyPagination(filteredReports, page, limit);

  const getShiftStatusLabel = (shiftStatus: string): JSX.Element => {
    const map = {
      Active: {
        text: 'Active',
        color: 'success'
      },
      Inactive: {
        text: 'Inactive',
        color: 'error'
      }
    };

    const { text, color }: any = map[shiftStatus];

    return <Label color={color}>{text}</Label>;
  };

  const handleModalClose = () => {
    setSelectedCategory(null);
    setIsOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    dispatch(deleteCategory(id));
  };

  const handleEditCategory = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(true);
  };

  return (
    <>
      <TableContainer>
        <TableComponent>
          <TableHead>
            <TableRow>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Category ID</TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Sub Categories</TableCell>
              <TableCell align="center">Category Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((category: any) => {
              return (
                <TableRow hover key={category.id}>
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
                          {moment(category?.createdAt).format('YYYY-MM-DD') ||
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
                      {`C-${leadingZeroes(category?.categoryId, 3)}`}
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
                      {category?.name || '-'}
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
                      {category?.description || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {category?.subCategories?.length > 0 ? (
                      category.subCategories.map(({ name }, index) => (
                        <Chip label={name} key={index} sx={{ marginLeft: 1 }} />
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
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getShiftStatusLabel(category?.status) || '-'}
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
                        onClick={() => handleDeleteCategory(category?.id)}
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
                        onClick={() => handleEditCategory(category)}
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
          <CreateCategoryForm
            formData={selectedCategory}
            onSuccess={handleModalClose}
          />
        }
        modalHeader={`${selectedCategory?.name} | Edit`}
      />
    </>
  );
};

export default ReportTable;
