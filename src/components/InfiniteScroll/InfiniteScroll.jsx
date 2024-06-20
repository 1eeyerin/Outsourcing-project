import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const InfiniteScroll = ({ fetchNextPage, hasNextPage, children }) => {
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (!(inView && hasNextPage)) return;
    fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <>
      {children}
      <StInView ref={ref} />
    </>
  );
};

const StInView = styled.div`
  height: 20px;
`;

export default InfiniteScroll;
