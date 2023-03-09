import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import _ from 'lodash';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { createFarm, updateFarm } from 'src/store/actions/farm.action';

interface CreateFarmFormProps {
  onSuccess(): any;
  formData?: any;
}

const CreateFarmForm = ({ onSuccess, formData }: CreateFarmFormProps) => {
  const dispatch = useDispatch();

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const initialFormValues = {
    name: formData?.name || '',
    address: formData?.address || '',
    postalCode: formData?.postalCode || '',
    openEndTime: formData?.openEndTime || '',
    longitude: formData?.location?.coordinates[0] || '',
    latitude: formData?.location?.coordinates[1] || ''
  };

  const categoryAddSchema = Yup.object({
    name: Yup.string().required('Farm Name is required'),
    address: Yup.string().required('Address is required'),
    postalCode: Yup.string().required('Farm PostalCode is required'),
    openEndTime: Yup.string().required('Farm Open/End time is required'),
    longitude: Yup.string().required('Farm Longitude is required'),
    latitude: Yup.string().required('Farm Latitude is required')
  });

  const onSubmitFarm = ({
    name,
    longitude,
    latitude,
    address,
    postalCode,
    openEndTime
  }) => {
    const paload = {
      name,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      },
      address,
      postalCode,
      openEndTime
    };

    if (formData) {
      dispatch(updateFarm({ id: formData.id, data: paload }));
    } else {
      dispatch(createFarm(paload));
    }
    onSuccess();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={initialFormValues}
          validationSchema={categoryAddSchema}
          onSubmit={(values) => {
            onSubmitFarm(values);
          }}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => {
            return (
              <Form>
                <p>Enter the farmer's market details</p>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Farmer's Market Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.longitude && errors.longitude)}
                  fullWidth
                  helperText={touched.longitude && errors.longitude}
                  label="Farmer's Market Longitude"
                  margin="normal"
                  name="longitude"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.longitude}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.latitude && errors.latitude)}
                  fullWidth
                  helperText={touched.latitude && errors.latitude}
                  label="Farmer's Market Latitude"
                  margin="normal"
                  name="latitude"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.latitude}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.address && errors.address)}
                  fullWidth
                  helperText={touched.address && errors.address}
                  label="Farmer's Market Address"
                  margin="normal"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.address}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.postalCode && errors.postalCode)}
                  fullWidth
                  helperText={touched.postalCode && errors.postalCode}
                  label="Farmer's Market Postal Code"
                  margin="normal"
                  name="postalCode"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.postalCode}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.openEndTime && errors.openEndTime)}
                  fullWidth
                  helperText={touched.openEndTime && errors.openEndTime}
                  label="Start/End Time (08:00 - 18:00)"
                  margin="normal"
                  name="openEndTime"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.openEndTime}
                  variant="outlined"
                />

                <Box sx={{ py: 2 }}>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {formData ? 'UPDATE' : 'SUBMIT'}
                    </Button>
                  )}
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Box>
  );
};

export default CreateFarmForm;
