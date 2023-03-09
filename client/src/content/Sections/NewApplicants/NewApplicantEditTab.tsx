import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import { formatDate } from 'src/common/functions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import ApplicantDocuments from './ApplicantDocuments/ApplicantDocuments';
import bglogo from 'src/assets/images/bglogo.jpg';

const Input = styled('input')({
  display: 'none'
});
const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    
        position: relative;
        overflow: visible;
        display: inline-block;
        margin-top: -${theme.spacing(9)};
        margin-left: ${theme.spacing(2)};
    
        .MuiAvatar-root {
          width: ${theme.spacing(16)};
          height: ${theme.spacing(16)};
        }  
        
    `
);
const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
        position: absolute;
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        bottom: -${theme.spacing(1)};
        right: -${theme.spacing(1)};
    
        .MuiIconButton-root {
          border-radius: 100%;
          background: ${theme.colors.primary.main};
          color: ${theme.palette.primary.contrastText};
          box-shadow: ${theme.colors.shadows.primary};
          width: ${theme.spacing(4)};
          height: ${theme.spacing(4)};
          padding: 0;
      
          &:hover {
            background: ${theme.colors.primary.dark};
          }
        }
    `
);
const CardCover = styled(Card)(
  ({ theme }) => `
        position: relative;
        .MuiCardMedia-root {
          height: ${theme.spacing(26)};
        }
    `
);
const CardCoverAction = styled(Box)(
  ({ theme }) => `
        position: absolute;
        right: ${theme.spacing(2)};
        bottom: ${theme.spacing(2)};
    `
);
const CoverPhoto = styled(CardMedia)`
  background-size: contain;
`;

const NewApplicantEditTab = ({ _worker }: any) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/app/new-applicants');
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12} md={12}>
        <>
          <Box display="flex" mb={3}>
            <Tooltip arrow placement="top" title="Go back">
              <IconButton
                color="primary"
                sx={{ p: 2, mr: 2 }}
                onClick={handleBackClick}
              >
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>

            <Box>
              <Typography
                variant="h3"
                component="h3"
                gutterBottom
                sx={{ textTransform: 'capitalize' }}
              >
                {`${_worker?.firstName} ${_worker?.lastName}` || (
                  <Skeleton variant="text" width={210} />
                )}
              </Typography>

              <Typography variant="subtitle2">
                {_worker.email || '-' || (
                  <Skeleton variant="text" width={210} />
                )}
              </Typography>
            </Box>
          </Box>
          <CardCover style={{ backgroundColor: '#fff' }}>
            <CoverPhoto image={'/static/images/logo/bglogo.png'} />
            <CardCoverAction>
              <Input accept="image/*" id="change-cover" multiple type="file" />
            </CardCoverAction>
          </CardCover>
          <AvatarWrapper>
            <Avatar variant="rounded" src={''} />
            <ButtonUploadWrapper>
              <Input
                accept="image/*"
                id="icon-button-file"
                name="icon-button-file"
                type="file"
              />
            </ButtonUploadWrapper>
          </AvatarWrapper>

          <Box py={2} pl={2} mb={3}>
            <Typography gutterBottom variant="h4">
              {_worker.email || <Skeleton variant="text" width={210} />}
            </Typography>

            <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
              {_worker?.status == 'Active' ? (
                <Label color="success">Active</Label>
              ) : (
                <Label color="warning">Reviewing</Label> || (
                  <Skeleton variant="text" width={60} />
                )
              )}
            </Typography>
          </Box>
        </>
      </Grid>

      <Grid item xs={12} md={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <Box
                    p={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography variant="h4" gutterBottom>
                        Personal Details
                      </Typography>
                      <Typography variant="subtitle2">
                        Manage informations related to personal details
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      startIcon={<EditTwoToneIcon />}
                      disabled
                    >
                      Edit
                    </Button>
                  </Box>
                  <Divider />
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="subtitle2">
                      <Grid container spacing={0}>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Full Name:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Text color="black">
                            <b>
                              {' '}
                              {`${_worker?.firstName} ${_worker?.lastName}` || (
                                <Skeleton variant="text" width={210} />
                              )}
                            </b>
                          </Text>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Contact Number:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Text color="black">
                            <b>
                              {' '}
                              {_worker?.phoneNumber || (
                                <Skeleton variant="text" width={210} />
                              )}
                            </b>
                          </Text>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Email address:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Text color="black">
                            <b>
                              {' '}
                              {_worker?.email || (
                                <Skeleton variant="text" width={210} />
                              )}
                            </b>
                          </Text>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={4}
                          md={3}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Address:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
                          <Box sx={{ maxWidth: { xs: 'auto', sm: 500 } }}>
                            <Text color="black">
                              <b>
                                {' '}
                                {_worker?.address || (
                                  <Skeleton variant="text" width={210} />
                                )}
                              </b>
                            </Text>
                          </Box>
                        </Grid>
                      </Grid>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <Box
                    p={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography variant="h4" gutterBottom>
                        Account Settings
                      </Typography>
                      <Typography variant="subtitle2">
                        Manage details related to account
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="subtitle2">
                      <Grid container spacing={0}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Registered as:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Text color="black">
                            <b>
                              {' '}
                              {_worker.userType || (
                                <Skeleton variant="text" width={210} />
                              )}
                            </b>
                          </Text>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Account Type:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Text color="black">
                            <b>
                              {_worker.role || (
                                <Skeleton variant="text" width={210} />
                              )}
                            </b>
                          </Text>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Account status:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Label color="warning">
                            <AccessTimeIcon fontSize="small" />
                            <b style={{ paddingLeft: 5 }}>Reviewing</b>
                          </Label>
                        </Grid>
                      </Grid>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <Box
                    p={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <Typography variant="h4" gutterBottom>
                        Farm Details
                      </Typography>
                      <Typography variant="subtitle2">
                        Manage farm details related to worker
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="subtitle2">
                      <Grid container spacing={0}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Farm Name:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Text color="black">
                            <b>
                              {' '}
                              {_worker?.farm?.name || (
                                <Skeleton variant="text" width={210} />
                              )}
                            </b>
                          </Text>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Nearest Marketplace:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Text color="black">
                            <b>
                              {' '}
                              {_worker?.farm?.nearestMarket || (
                                <Skeleton variant="text" width={210} />
                              )}
                            </b>
                          </Text>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Postal Code:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Text color="black">
                            <b>
                              {_worker?.farm?.postalCode || (
                                <Skeleton variant="text" width={210} />
                              )}
                            </b>
                          </Text>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={6}
                          textAlign={{ sm: 'right' }}
                        >
                          <Box pr={3} pb={2}>
                            Open/Close Time:
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Text color="black">
                            <b>
                              {`${_worker?.farm?.openTime} - ${_worker?.farm?.closeTime}` || (
                                <Skeleton variant="text" width={210} />
                              )}
                            </b>
                          </Text>
                        </Grid>
                      </Grid>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {_worker?.id && (
              <ApplicantDocuments
                workerId={_worker?.id}
                employeeId={_worker?.userId}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewApplicantEditTab;
