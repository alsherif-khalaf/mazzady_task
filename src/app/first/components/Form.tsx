"use client";

import SearchableDropdownMenu from "./SearchableDropdownMenu";

type Props = {
  categories: any;
  subCategory: any;
  subCategoryProperties: any;
  models: any;
  types: any;
};

// create function handle Form Submit  and pass it to the form onSubmit
const handleFormSubmit = (e: any) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  console.log(formData)
};

const Form = ({
  categories,
  subCategory,
  subCategoryProperties,
  models,
  types,
}: Props) => {
  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      {/* Categories */}
      <SearchableDropdownMenu
        options={categories.data.categories}
        placeholder="التصنيفات الرئيسية"
        type="category"
      />

      {/* Sub Categories */}
      <SearchableDropdownMenu
        options={subCategory?.children}
        placeholder="التصنيفات الفرعية"
        type="subCategory"
      />

      {/* Properties */}
      {subCategoryProperties?.data.map((cat: any) => (
        <div key={cat?.slug}>
          <SearchableDropdownMenu
            options={cat?.options}
            placeholder={cat?.name}
            type={cat?.slug}
            multi={cat.slug !== "brand"}
          />

          {cat.slug === "brand" && models && (
            <SearchableDropdownMenu
              options={models?.data[0]?.options}
              placeholder="الموديل"
              type="model"
            />
          )}

          {cat.slug === "brand" && types !== null && (
            <SearchableDropdownMenu
              options={types?.data[0]?.options}
              placeholder="النوع"
              type={types?.data[0]?.slug}
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full my-4 bg-black text-white  font-light py-4 px-6 "
      >
        بحـث
      </button>
    </form>
  );
};

export default Form;
