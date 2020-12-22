import { Meta, Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { UploadedImage } from '../../../../reducers/images.reducer';
import { UploadedImageList, UploadedImageListProps } from './UploadedImageList';

export default {
  title: 'Components/Uploaded Image List',
  component: UploadedImageList,
} as Meta;

const Template: Story<UploadedImageListProps> = (args) => (
  <BrowserRouter>
    <div style={{
      margin: '0 auto',
      maxWidth: '1100px',
    }}
    >
      <UploadedImageList {...args} />
    </div>
  </BrowserRouter>
);

export const Primary = Template.bind({});
Primary.args = {
  images: Array<UploadedImage>(8).fill({
    id: '1',
    width: 1000,
    url: 'http://placehold.it/264x264',
  }),
};

export const NoImages = Template.bind({});
NoImages.args = {
  images: [],
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  images: [],
};
