import { useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import Modal from 'src/components/Modal';
import CreateCategoryForm from './CreateCategoryForm';

function PageHeader() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Product Categories
        </Typography>
        <Typography variant="subtitle2">
          All product category details
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 }, color: '#000' }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => setModalOpen(true)}
        >
          Add New Category
        </Button>
      </Grid>
      <Modal
        isOpen={modalOpen}
        handleClose={handleModalClose}
        content={<CreateCategoryForm onSuccess={handleModalClose} />}
        modalHeader={'Add New Category'}
      />
    </Grid>
  );
}

export default PageHeader;
