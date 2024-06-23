import { css, styled } from 'styled-components';
import { Typography } from '@/components/Typography';
import { respondTo } from '@/styles/theme';

const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'stirfryEasyDishes', label: '볶음&간단' },
  { value: 'soup', label: '탕' },
  { value: 'friedFoods', label: '튀김' },
  { value: 'fruitsDesserts', label: '과일&디저트' }
];

const MenuCategory = ({ selectedCategory, onCategoryChange }) => {
  return (
    <StCategoryList>
      {CATEGORIES.map((category) => {
        const selected = selectedCategory === category.value;

        return (
          <StCategoryItem key={category.value} selected={selected} onClick={() => onCategoryChange(category.value)}>
            <Typography as="span" size="m" weight={selected ? 'bold' : '600'} color={selected ? '#ffffff' : '#777777'}>
              {category.label}
            </Typography>
          </StCategoryItem>
        );
      })}
    </StCategoryList>
  );
};

const StCategoryList = styled.ul`
  display: flex;
  gap: 10px;
  padding-top: 26px;

  ${respondTo.mobile(css`
    gap: 5px;
  `)}
`;

const StCategoryItem = styled.li`
  cursor: pointer;
  padding: 0 5px;
  font-size: 20px;
  font-style: normal;
  line-height: 1.4;
`;

export default MenuCategory;
