import styled from 'styled-components';

interface UploadedImageProps {
  className?: string;
}

const UploadedImageComponent: React.FC<UploadedImageProps> = ({
  className,
}) => (
  <div className={className} />
);

export const UploadedImage = styled(UploadedImageComponent)`
  background-color: black;
  height: 100px;
  width: 100px;
`;
