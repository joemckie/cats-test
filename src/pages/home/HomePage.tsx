import styled from 'styled-components';
import { Page } from '../../components/Page/Page';
import { UploadedImage } from './components/UploadedImage/UploadedImage';

const ImageGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-gap: 10px;
`;

export const HomePage: React.FC = () => (
  <Page>
    <h1>Uploaded images</h1>
    <ImageGrid>
      {
        Array(20).fill(null).map(() => <UploadedImage />)
      }
    </ImageGrid>
  </Page>
);
