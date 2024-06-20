import { styled } from 'styled-components';

const MenuCategory = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <StCategoryList>
      {categories.map((category) => (
        <StCategoryItem
          key={category.value}
          selected={selectedCategory === category.value}
          onClick={() => onCategoryChange(category.value)}
        >
          {category.label}
        </StCategoryItem>
      ))}
    </StCategoryList>
  );
};

const StCategoryList = styled.ul`
  display: flex;
  gap: 10px;
`;

const StCategoryItem = styled.li`
  cursor: pointer;
  font-weight: ${(props) => (props.selected ? 'bold' : '600')};
  color: ${(props) => (props.selected ? '#ffffff' : '#777777')};
  padding: 0 5px;
  font-size: 20px;
  font-style: normal;
  line-height: 1.4;
`;

export default MenuCategory;
