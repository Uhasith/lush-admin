/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import { createProduct, updateProduct } from 'src/store/actions/product.action';
import { useEffect, useRef, useState } from 'react';
import ImageUpload from 'src/components/ImageUpload';
import axios from 'axios';
import { BASE_URL } from 'src/constants/common-configurations';
import Switch from '@mui/material/Switch';

interface CreateProductFormProps {
  onSuccess(): any;
  formData?: any;
}


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const CreateProductForm = ({ onSuccess, formData }: CreateProductFormProps) => {
  const dispatch = useDispatch();
  const categoryList = useSelector(
    ({ category }: RootStateOrAny) => category.list
  );

  const formRef = useRef();
  const [images, setImages] = useState([]);

  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    if (formData?.images && formData?.images.length > 0) {
      setImages(formData?.images);
    }
  }, []);

  const initialFormValues = {
    name: formData?.name || '',
    weight: formData?.weight || '',
    category: formData?.category?.id || '',
    subCategories: formData?.subCategories || [],
    price: formData?.price || '',
    status: formData?.status || 'Active',
    description: formData?.description || '',
    unitType: formData?.unitType || 'Each'
  };

  const productAddSchema = Yup.object({
    name: Yup.string().required('Product Name is required'),
    category: Yup.string().required('Product Category is required'),
    weight: Yup.string().required('Product Weight is required'),
    price: Yup.string().required('Product Price is required'),
    status: Yup.string().required('Status is required'),
    description: Yup.string().required('Description is required')
  });

  const onSubmitProduct = async (paload: any) => {
    if (images.length > 0) {
      setIsBuffering(true);
      const imageFormData = new FormData();
      images.forEach((file) => {
        if (typeof file !== 'string') imageFormData.append('files', file);
      });

      const results = await axios({
        method: 'POST',
        url: BASE_URL + '/documents/product-img',
        data: imageFormData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (formData) {
        dispatch(
          updateProduct({
            id: formData.id,
            data: Object.assign(paload, { images: results.data })
          })
        );
      } else {
        dispatch(
          createProduct([{ ...paload, images: results.data }])
        );
      }

      setIsBuffering(false);

      onSuccess();
    } else {
      setIsBuffering(false);
    }
  };

  const renderCategoryList = () => {
    return (
      categoryList.length > 0 &&
      categoryList.map((category, index) => (
        <MenuItem value={category?.id} key={index}>
          {category?.name}
        </MenuItem>
      ))
    );
  };

  const renderSubCategoryList = (categoryId: any) => {
    const { subCategories } = categoryList.find(
      (obj: any) => obj.id === categoryId
    );

    return (
      subCategories.length > 0 &&
      subCategories.map((subCategory: any, index: number) => (
        <MenuItem value={subCategory?.name} key={index}>
          {subCategory?.name}
        </MenuItem>
      ))
    );
  };

  const handleImageUpdate = (files: any, isRemove: boolean = false) => {
    if (isRemove) {
      setImages(files);
    } else {
      setImages((prevImages) => [...prevImages, ...files]);
    }
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
          validationSchema={productAddSchema}
          onSubmit={(values) => {
            onSubmitProduct(values);
          }}
          innerRef={formRef}
        >
          {({ errors, handleBlur, handleChange, touched, values }) => {
            return (
              <Form>
                <p>Enter the product details</p>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Product Name"
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
                  label="Unit Type"
                  margin="normal"
                  name="unitType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.unitType}
                  variant="outlined"
                >
                  <MenuItem value={'Each'}>Each</MenuItem>
                  <MenuItem value={'Pound'}>Pound</MenuItem>
                </TextField>

                <TextField
                  error={Boolean(touched.price && errors.price)}
                  fullWidth
                  helperText={touched.price && errors.price}
                  label={
                    values?.unitType == 'Each'
                      ? 'Product Price of Each'
                      : 'Product Price of 1 Pound'
                  }
                  margin="normal"
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.price}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.weight && errors.weight)}
                  fullWidth
                  helperText={touched.weight && errors.weight}
                  label="Product Weight"
                  margin="normal"
                  name="weight"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.weight}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.status && errors.status)}
                  fullWidth
                  helperText={touched.status && errors.status}
                  select
                  label="Product Status"
                  margin="normal"
                  name="status"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.status}
                  variant="outlined"
                >
                  <MenuItem value={'Active'}>Active</MenuItem>
                  <MenuItem value={'Pending'}>Pending</MenuItem>
                </TextField>

                <TextField
                  error={Boolean(touched.category && errors.category)}
                  fullWidth
                  helperText={touched.category && errors.category}
                  select
                  label="Product Category"
                  margin="normal"
                  name="category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  variant="outlined"
                >
                  {renderCategoryList()}
                </TextField>

                <TextField
                  error={Boolean(touched.subCategories && errors.subCategories)}
                  fullWidth
                  helperText={touched.subCategories && errors.subCategories}
                  select
                  label="Product Sub Category"
                  margin="normal"
                  name="subCategories"
                  variant="outlined"
                  onBlur={handleBlur}
                  SelectProps={{
                    multiple: true,
                    value: values.subCategories,
                    onChange: handleChange
                  }}
                  disabled={values.category === ''}
                >
                  {values.category !== '' &&
                    renderSubCategoryList(values.category)}
                </TextField>

                <ImageUpload
                  onImageUpdate={handleImageUpdate}
                  {...(images?.length > 0 && {
                    prevImages: images
                  })}
                />

                <TextField
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Product Description"
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
               {/* //////////////////////Flash deal checkbox//////////////////////////////////// */}



               {/* <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Promote This Product</FormLabel>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
     
      </RadioGroup>
    </FormControl> */}



  
<br />
  <hr />

    <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="Promote This Product"
          labelPlacement="start"
        />


               {/* ////////////////////////////////////////////////////////// */}
                
                <Box sx={{ py: 2 }}>
                  {isBuffering ? (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <CircularProgress />
                    </Box>
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

export default CreateProductForm;
