import React, { useCallback } from 'react';
import { useDropzone, DropzoneRootProps } from 'react-dropzone';
import styled from 'styled-components';
import { apiSettings } from '../../../../config/api';
import { apiRequest } from '../../../../utils/apiRequest';

interface FileUploadProps {
  onImageUpload: () => void;
}

const getColor = (props: DropzoneRootProps) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }

  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
  margin-bottom: 1rem;
`;

export const FileUpload = ({ onImageUpload }: FileUploadProps) => {
  const onDrop = useCallback(async ([file]) => {
    const formData = new FormData();

    formData.append('file', file);

    const response = await apiRequest(
      `${apiSettings.baseURL}/images/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (response.approved === 1) {
      onImageUpload();
    }
  }, [onImageUpload]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <div className="container">
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps({ multiple: false })} />
        <p>Upload a cat picture</p>
      </Container>
    </div>
  );
};
