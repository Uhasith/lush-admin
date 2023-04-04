import { FC, ChangeEvent, useState } from 'react';
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
  TextField,
  Button,
  Tooltip,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import _ from 'lodash';

import Modal from 'src/components/Modal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { deleteFarm } from '../../../store/actions/farm.action';
import CreateCategoryForm from './CreateFarmForm';
import '../../../assets/css/index.css';

interface FarmTableProps {
  categories?: any[];
}

const TableComponent = styled(Table)(
  () => `
    .css-1mhwo98-MuiTypography-root{
      width:185px;
      
    }
`
);

const FarmTable: FC<FarmTableProps> = ({ categories }) => {
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

  const handleModalClose = () => {
    setSelectedCategory(null);
    setIsOpen(false);
  };

  const handleDeleteFarm = (id: string) => {
    dispatch(deleteFarm(id));
  };

  const handleEditFarm = (farm: string) => {
    setSelectedCategory(farm);
    setIsOpen(true);
  };

  {
    /* /////////////////add-search-bar////////////////////// */
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRowsnew, setfilteredRowsnew] = useState(paginatedReports);

  const filteredRows = paginatedReports.filter((farm: any) => {
    return (
      farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farm.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCancelSearch = () => {
    setSearchQuery('');
    setfilteredRowsnew(paginatedReports);
  };
  {
    /* /////////////////add-search-bar////////////////////// */
  }

  return (
    <>
      {/* /////////////////add-search-bar////////////////////// */}

      <div className="searchbar">
        <TextField
          label="Search"
          variant="standard"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery && (
        <Button
          className="searchbar-btn"
          variant="outlined"
          onClick={handleCancelSearch}
        >
          Cancel
        </Button>
      )}

      {/* /////////////////add-search-bar////////////////////// */}

      <TableContainer>
        <TableComponent>
          <TableHead>
            <TableRow>
              <TableCell align="center">Created Date</TableCell>
              <TableCell align="center">Farmer's Market ID</TableCell>
              <TableCell align="center">Farmer's Market</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Postal Code</TableCell>
              <TableCell align="center">Start/End Time</TableCell>
              <TableCell align="center">Longitude</TableCell>
              <TableCell align="center">Latitude</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((farm: any) => {
              return (
                <TableRow hover key={farm.id}>
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
                          {moment(farm?.createdAt).format('YYYY-MM-DD') || '-'}
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
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {farm?.id || '-'}
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
                      {farm?.name || '-'}
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
                      {farm?.address || '-'}
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
                      {farm?.postalCode || '-'}
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
                      {farm?.openEndTime || '-'}
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
                      {farm?.location?.coordinates[0] || '-'}
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
                      {farm?.location?.coordinates[1] || '-'}
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
                        onClick={() => handleDeleteFarm(farm?.id)}
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
                        onClick={() => handleEditFarm(farm)}
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

export default FarmTable;
