import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Page } from '../../components/Page/Page';
import { FileUpload } from './components/FileUpload/FileUpload';

export const UploadPage = () => {
  const history = useHistory();

  const onImageUpload = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Page>
      <h1>Upload</h1>
      <FileUpload onImageUpload={onImageUpload} />
    </Page>
  );
};
