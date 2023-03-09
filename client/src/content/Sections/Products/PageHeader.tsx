import { useState, useRef, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Button, Grid, Input, Box } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Modal from 'src/components/Modal';
import CreateProductForm from './CreateProductForm';
import Papa from 'papaparse';
import { createProduct } from 'src/store/actions/product.action';

interface ProductData {
  [key: string]: string | string[];
}

export default function PageHeader() {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<ProductData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<String>(null);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
      setError('');
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<ProductData>) => {
          const products = results.data;
          const updatedProducts = products.map((product) => ({
            ...product,
            images: Array.isArray(product.images)
              ? product.images.map((image) =>
                  image.replace('[', '').replace(']', '').trim()
                )
              : product.images
                  .replace('[', '')
                  .replace(']', '')
                  .split(',')
                  .map((image) => image.trim()),
            subCategories: Array.isArray(product.subCategories)
              ? product.subCategories.map((subCat) =>
                  subCat.replace('[', '').replace(']', '').trim()
                )
              : product.subCategories
                  .replace('[', '')
                  .replace(']', '')
                  .split(',')
                  .map((subCat) => subCat.trim())
          }));
          setFileData(updatedProducts);
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      setError('Only .csv File Allowed');
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleFileSubmit = () => {
    dispatch(createProduct(fileData));
    console.log('Success:', fileData);
    setUploadedFile(null);
    setFileData([]);
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleFileSelect = () => {
    setUploadedFile(null);
    setFileData([]);
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileData([]);
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.value = ''; // reset the file input value
    }
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Product Management
        </Typography>
        <Typography variant="subtitle2">All product details</Typography>
      </Grid>
      <Grid item>
        {uploadedFile ? (
          <>
            <Button color="primary" sx={{ mt: { xs: 2, md: 0 }, mr: { xs: 2, md: 3 } }} variant="contained" onClick={handleFileSubmit}>
              Submit File
            </Button>
            <Button color="secondary" variant="contained" onClick={handleRemoveFile}>
              Remove File
            </Button>
          </>
        ) : (
          <>
            <Button color="primary" sx={{ mt: { xs: 2, md: 0 } }} variant="contained" startIcon={<AddTwoToneIcon fontSize="small" />} onClick={handleFileSelect}>
              Import Products
            </Button>
            {error && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Box>
            )}
          </>
        )}
        <Input
          id="product-import"
          type="file"
          onChange={handleImport}
          inputRef={fileInputRef}
          style={{ display: 'none' }}
        />
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 }, color: '#000' }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => setModalOpen(true)}
        >
          Add New Product
        </Button>
      </Grid>
      <Modal
        isOpen={modalOpen}
        handleClose={handleModalClose}
        content={<CreateProductForm onSuccess={handleModalClose} />}
        modalHeader={'Add New Product'}
      />
    </Grid>
  );
}
