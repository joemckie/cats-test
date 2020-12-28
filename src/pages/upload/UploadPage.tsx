import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Page } from '../../components/Page/Page';
import { UploadedImage } from '../../reducers/images.reducer';
import { store } from '../../store';
import { FileUpload } from './components/FileUpload/FileUpload';

export const UploadPage = () => {
  const history = useHistory();
  const { dispatch } = useContext(store);

  const onImageUpload = useCallback((uploadedImage: UploadedImage) => {
    history.push('/');

    dispatch({
      type: 'FINALISE_UPLOAD',
      payload: uploadedImage,
    });
  }, [dispatch, history]);

  return (
    <Page>
      <h1>Upload</h1>
      <FileUpload onImageUpload={onImageUpload} />
    </Page>
  );
};
