import { FC, ChangeEvent, useState } from 'react';
import leadingZeroes from 'leading-zeroes';

import {
  Tooltip,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  TextField,
  useTheme,
  TableContainer,
  Button
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Label from 'src/components/Label';
import { formatDate } from 'src/common/functions';
import { updateWorker } from '../../../store/actions/worker.actions';
import '../../../assets/css/index.css';

interface NewApplicantTableProps {
  className?: string;
  workers?: any[];
}
export type ApplicantStatus = 'Pending' | 'Active' | 'Deactivated';

interface Filters {
  status?: ApplicantStatus;
}

const NewApplicantTable: FC<NewApplicantTableProps> = ({ workers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const selectedBulkActions = selectedWorkers.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [openAccept, setOpenAccept] = useState(false);
  const [openDecline, setOpenDecline] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);

  const handleAcceptOpen = (id: string) => {
    setSelectedApplicantId(id);
    setOpenAccept(true);
  };

  const handleAcceptClose = () => {
    setSelectedApplicantId(null);
    setOpenAccept(false);
  };

  const handleDeclineOpen = (id: string) => {
    setSelectedApplicantId(id);
    setOpenDecline(true);
  };

  const handleDeclineClose = () => {
    setSelectedApplicantId(null);
    setOpenDecline(false);
  };

  const getStatusLabel = (applicantStatus: ApplicantStatus): JSX.Element => {
    const map = {
      Pending: {
        text: 'Pending',
        color: 'warning'
      },
      Active: {
        text: 'Active',
        color: 'success'
      },
      Reviewing: {
        text: 'Reviewing',
        color: 'warning'
      },
      Deactivated: {
        text: 'Deactivated',
        color: 'error'
      }
    };
    const { text, color }: any = map[applicantStatus];

    return <Label color={color}>{text}</Label>;
  };

  const applyFilters = (_workers: any, filters: Filters): any => {
    return _workers.filter((worker) => {
      let matches = true;

      if (filters.status && worker.status !== Number(filters.status)) {
        matches = false;
      }

      return matches;
    });
  };

  //////////////////////////////////////////

  const applyPagination = (_workers: any, page: number, limit: number): any => {
    return _workers.slice(page * limit, page * limit + limit);
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleAcceptApplicant = () => {
    try {
      dispatch(
        updateWorker({ id: selectedApplicantId, data: { status: 'Active' } })
      );
      setOpenAccept(false);
    } catch (err) {}
  };

  const handleDeclineApplicant = () => {
    try {
      dispatch(
        updateWorker({
          id: selectedApplicantId,
          data: { status: 'Deactivated' }
        })
      );
      setOpenDecline(false);
    } catch (err) {}
  };

  const filteredWorkers = applyFilters(workers, filters);

  const paginatedWorkers = applyPagination(filteredWorkers, page, limit);

  const theme = useTheme();

  const handleDetailedClick = (workerId: string) => {
    navigate(`/app/workers/${workerId}`);
  };

  // const handleEmailSend = (workerEmail: string) => {
  //   try {
  //     const payLoad = {
  //       email: workerEmail,
  //       subject: AGREEMENT_SUBJECT,
  //       text: AGREEMENT_MESSAGE,
  //       attachment: AGREEMENT_DOC_NAME
  //     };

  //     dispatch(sendEmail(payLoad));
  //   } catch (err) {}
  // };

  {
    /* /////////////////add-search-bar////////////////////// */
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRowsnew, setfilteredRowsnew] = useState(paginatedWorkers);

  const filteredRows = paginatedWorkers.filter((worker: any) => {
    return (
      worker.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCancelSearch = () => {
    setSearchQuery('');
    setfilteredRowsnew(paginatedWorkers);
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Registered Date</TableCell>
              <TableCell align="center">Farmer Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">E-mail</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Farmer's Market Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((worker: any) => {
              const isWorkerSelected = selectedWorkers.includes(worker.id);
              return (
                <TableRow hover key={worker.id} selected={isWorkerSelected}>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        columnGap: '15px',
                        justifyContent: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          columnGap: '15px',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                          align="left"
                        >
                          {formatDate(worker?.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Button onClick={() => handleDetailedClick(worker?.id)}>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {`E-${leadingZeroes(worker?.userId, 3)}` || '-'}
                      </Typography>
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleDetailedClick(worker?.id)}>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {`${worker?.firstName} ${worker?.lastName}` || '-'}
                      </Typography>
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {worker?.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {worker?.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {worker.address}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {worker?.farm?.name ? worker?.farm?.name : '-'}
                  </TableCell>
                  <TableCell align="center">
                    {getStatusLabel(worker?.status)}
                  </TableCell>
                  <TableCell align="center">
                    {worker?.status == 'Active' ? (
                      <Tooltip title="Deactivate" arrow>
                        {loading ? (
                          <CircularProgress size={20} color="error" />
                        ) : (
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              }
                            }}
                            color="error"
                            size="medium"
                            onClick={() => handleDeclineOpen(worker?.id)}
                          >
                            <ClearIcon />
                          </IconButton>
                        )}
                      </Tooltip>
                    ) : (
                      <Tooltip title="Activate" arrow>
                        {loading ? (
                          <CircularProgress size={20} color="success" />
                        ) : (
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              }
                            }}
                            color="success"
                            size="medium"
                            onClick={() => handleAcceptOpen(worker?.id)}
                          >
                            <CheckIcon />
                          </IconButton>
                        )}
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredWorkers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      <Dialog
        open={openAccept}
        onClose={handleAcceptClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAcceptClose}>Cancel</Button>
          <Button onClick={handleAcceptApplicant} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDecline}
        onClose={handleDeclineClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure about this farmer need to deactivate.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeclineClose}>Cancel</Button>
          <Button onClick={handleDeclineApplicant} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewApplicantTable;
