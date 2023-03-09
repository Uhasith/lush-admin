import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector, RootStateOrAny } from 'react-redux';

const PageHeader = () => {
  const theme = useTheme();
  const currentUser = useSelector(({ auth }: RootStateOrAny) => auth.user);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={''}
          src={'/static/images/logo/adminavatar.svg'}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {currentUser?.firstName}!
        </Typography>
        <Typography variant="subtitle2">Lush Produce Services!</Typography>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
