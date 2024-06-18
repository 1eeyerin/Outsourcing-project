import { useMemo, useState } from 'react';
import { MenuCategory, MenuList } from '@/components/Menu';
import { useFetchAllMenus } from '@/stores/queries/useMenuQueries';

const Menu = () => {
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const { data: allMenus, error, isFetching } = useFetchAllMenus();

  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  const filteredMenus = useMemo(() => {
    if (!allMenus) return [];
    if (selectedCategories.includes('all')) return allMenus; // "전체" 선택 시 모든 메뉴를 반환
    return allMenus.filter((menu) => selectedCategories.includes(menu.category));
  }, [selectedCategories, allMenus]);

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error fetching menus: {error.message}</div>;

  const categories = [
    { value: 'stirfryEasyDishes', label: '볶음&간단' },
    { value: 'soup', label: '탕' },
    { value: 'friedFoods', label: '튀김' },
    { value: 'fruitsDesserts', label: '과일&디저트' }
  ];

  return (
    <div>
      <MenuCategory categories={categories} onChange={handleCategoryChange} />
      <MenuList menus={filteredMenus} />
    </div>
  );
};

export default Menu;
