import styled from 'styled-components';
import { Typography } from '@/components/Typography';
const SectionTitle = ({ size, weight, color, children }) => {
  return (
    <Title size={size} weight={weight} color={color}>
      {children}
    </Title>
  );
};

const Title = styled(Typography)`
  text-align: center;
  margin: 56px auto 58px;
`;

export default SectionTitle;
