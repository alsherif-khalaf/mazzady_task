export interface SubCategory {
  id: number;
  name: string;
  description: string | null;
  image: string;
  slug: string;
  properties: Property[];
  children?: Category[];
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  image: string;
  slug: string;
  children: Category[] | null;
  circle_icon: string;
  disable_shipping: number;
  subcategories: SubCategory[] | null;
}

export interface CategoryData {
  categories: Category[];
}

export interface Property {
  id: number;
  name: string;
  value: string;
  parent : number;
  child : boolean
  options : any
}


 export interface DropdownOption  {
  label: string;
  value: string | null;
  isDisabled? : boolean
};

export interface OptionType  {
  label: string;
  value: string | null;
  isDisabled?: boolean;
};