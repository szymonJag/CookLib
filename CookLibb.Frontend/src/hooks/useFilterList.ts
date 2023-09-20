import { useState } from 'react';

// Define an interface for the list elements
interface ListItem {
  id: number;
  name: string;
  // Add other properties as needed
}

// Define the custom hook as a generic function
export function useFilterList<T extends ListItem>(initialList: T[]) {
  const [filterText, setFilterText] = useState('');
  const [filteredElements, setFilteredElements] = useState(initialList);

  const filterList = () => {
    if (filterText.trim() === '') {
      setFilteredElements(initialList); // Show all items when input is empty
    } else {
      const filteredList = initialList.filter((element) =>
        element.name.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredElements(filteredList);
    }
  };

  return {
    filterText,
    setFilterText,
    filteredElements,
    filterList,
  };
}
