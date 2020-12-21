import { Page } from '../../components/Page/Page';
import { UploadedImageList } from './components/UploadedImageList/UploadedImageList';

export const HomePage: React.FC = () => (
  <Page>
    <h1>Uploaded images</h1>
    <UploadedImageList images={[]} />
  </Page>
);
