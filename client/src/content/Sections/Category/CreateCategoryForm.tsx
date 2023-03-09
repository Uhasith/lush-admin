import * as Yup from 'yup';
import { Formik, Form, FieldArray } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import _ from 'lodash';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';

import {
  createCategory,
  updateCategory
} from 'src/store/actions/category.action';
import { Card, CardContent, IconButton, Typography } from '@mui/material';

interface CreateCategoryFormProps {
  onSuccess(): any;
  formData?: any;
}

const CreateCategoryForm = ({
  onSuccess,
  formData
}: CreateCategoryFormProps) => {
  const dispatch = useDispatch();

  const loading = useSelector(({ common }: RootStateOrAny) => common.loading);

  const initialFormValues = {
    name: formData?.name || '',
    status: formData?.status || 'Active',
    description: formData?.description || '',
    subCategories: formData?.subCategories || [
      {
        name: '',
        description: ''
      }
    ]
  };

  const categoryAddSchema = Yup.object({
    name: Yup.string().required('Category Name is required'),
    status: Yup.string().required('Status is required'),
    description: Yup.string().required('Description is required')
  });

  const onSubmitCategory = ({ name, description, status, subCategories }) => {
    const paload = {
      name,
      description,
      status,
      ...(subCategories[0]?.name && { subCategories })
    };

    if (formData) {
      dispatch(updateCategory({ id: formData.id, data: paload }));
    } else {
      dispatch(createCategory(paload));
    }
    onSuccess();
  };

  const handleAddMoreSubCategory = (helpers: any, index: number) => {
    helpers.insert(index, {
      name: '',
      description: ''
    });
  };

  const SubCategories = ({
    errors,
    handleBlur,
    handleChange,
    touched,
    values
  }): JSX.Element => {
    return (
      <FieldArray
        name="subCategories"
        render={(helpers) => (
          <>
            {Array.from(
              { length: values?.subCategories.length },
              (item, index) => (
                <>
                  <Card key={index} sx={{ margin: '15px 0px' }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          Sub Category #{index + 1}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            values.subCategories.length > 1 &&
                              helpers.remove(index);
                          }}
                          size="small"
                        >
                          ❌
                        </IconButton>
                      </Box>

                      <TextField
                        error={Boolean(
                          touched?.subCategories &&
                            touched?.subCategories[index]?.name &&
                            errors?.subCategories &&
                            errors?.subCategories[index]?.name
                        )}
                        fullWidth
                        helperText={touched.name && errors.name}
                        label="Sub Category Name"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        name={`subCategories.${index}.name`}
                        value={values?.subCategories[index]?.name}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(
                          touched?.subCategories &&
                            touched?.subCategories[index]?.description &&
                            errors?.subCategories &&
                            errors?.subCategories[index]?.description
                        )}
                        fullWidth
                        helperText={touched.description && errors.description}
                        label="Sub Category Description"
                        margin="normal"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        name={`subCategories.${index}.description`}
                        value={values?.subCategories[index]?.description}
                        variant="outlined"
                      />
                    </CardContent>
                  </Card>
                  <Box display="flex">
                    <Button
                      onClick={() => handleAddMoreSubCategory(helpers, index)}
                      color="primary"
                      variant="outlined"
                    >
                      Add more
                    </Button>
                  </Box>
                </>
              )
            )}
          </>
        )}
      />
    );
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
            onSubmitCategory(values);
          }}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => {
            return (
              <Form>
                <p>Enter the category details</p>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Category Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.status && errors.status)}
                  fullWidth
                  helperText={touched.status && errors.status}
                  select
                  label="Category Status"
                  margin="normal"
                  name="status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.status}
                  variant="outlined"
                >
                  <MenuItem value={'Active'}>Active</MenuItem>
                  <MenuItem value={'Inactive'}>Inactive</MenuItem>
                </TextField>

                <SubCategories
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                />

                <TextField
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Category Description"
                  margin="normal"
                  multiline
                  rows={4}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.description}
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

export default CreateCategoryForm;
