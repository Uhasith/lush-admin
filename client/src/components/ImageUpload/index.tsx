/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { BASE_URL } from 'src/constants/common-configurations';

const thumbsContainer: any = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
  columnGap: '15px'
};

const thumb: any = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
  overflow: 'visible',
  position: 'relative'
};

const thumbInner: any = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img: any = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const closeBtn: any = {
  position: 'absolute',
  top: '-12px',
  color: 'red',
  right: '-18px',
  cursor: 'pointer',
  border: 'none',
  background: 'none'
};

const dropZone: any = {
  border: '1px dashed #c4c4c4',
  borderRadius: '7px',
  textAlign: 'center',
  color: '#858EA0',
  cursor: 'pointer'
};

const ImageUploader = ({ onImageUpdate, prevImages }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    prevImages?.length > 0 && setFiles(prevImages);
  }, [prevImages]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);

      onImageUpdate(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const handleRemove = (index: number) => {
    const _files = [...files];
    _files.splice(index, 1);
    setFiles(_files);

    onImageUpdate(_files, true);
  };

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <button style={closeBtn} onClick={() => handleRemove(index)}>
          <CloseOutlinedIcon fontSize="small" />
        </button>
        {file?.preview ? (
          <img
            src={file.preview}
            style={img}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        ) : (
          <img src={`${BASE_URL}/documents/product-img/${file}`} style={img} />
        )}
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container" style={{ marginTop: '16px' }}>
      <div {...getRootProps({ className: 'dropzone' })} style={dropZone}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some images here, or click to select images</p>
      </div>
      {files?.length > 0 && <aside style={thumbsContainer}>{thumbs}</aside>}
    </section>
  );
};

export default ImageUploader;
