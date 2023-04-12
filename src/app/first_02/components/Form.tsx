"use client";

import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Category, DropdownOption } from "@/app/types/types";
import { useState } from "react";
import Spinner from "./Spinner";

type Props = {
  categories: any;
  subCategory: any;
  subCategoryProperties: any;
  models: any;
  types: any;
};

// Make a function that Convert options to dropdown options and return it
const convertOptionsToDropdownOptions = (options: any[]) => {
  // Convert options to dropdown options
  const dropdownOptions: DropdownOption[] =
    options === undefined || options.length === 0
      ? [
          {
            label: "لا يوجد",
            value: null,
            isDisabled: true,
          },
        ]
      : options.map((option: any) => {
          return {
            label: option.name,
            value: option.id.toString(),
          };
        });

  return dropdownOptions;
};

// create function handle Form Submit  and pass it to the form onSubmit
const handleFormSubmit = (e: any) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  console.log(formData);
};

const Form = ({ categories }: Props) => {
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [subCategoryProperties, setSubCategoryProperties] = useState<
    Category[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSubCategoryProperties = async (e: any) => {
    if (e?.value) {
      const Id = parseInt(e.value);
      console.log(Id);
      const res = await fetch(`/api/data?id=${Id}`, {
        method: "GET",
      });
      // console.log("res",await res.json());
      const data = await res.json();
      setSubCategoryProperties(await data.res.data);
      setIsLoading(false);
      console.log("SubCategoryProperties", subCategoryProperties);
    }
  };

  const handelChangeGetData = (e: any) => {
    if (e === null) {
      setSubCategories([]);
      return;
    }
    const categoryId = parseInt(e.value);
    const subCategory = categories?.data?.categories.find(
      (c: any) => c.id === categoryId
    );
    setSubCategories(subCategory?.children);
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="space-y-4">
      <p>Try Select Client</p>

      <Select
        name={"category"}
        onChange={(e) => {
          setSubCategories([]);
          handelChangeGetData(e);
        }}
        options={convertOptionsToDropdownOptions(categories.data.categories)}
        placeholder={`اختر تصنيف`}
        isClearable
      />

      {/* Sub Categories */}

      {subCategories.length > 0 && (
        <Select
          name={"subCategory"}
          onChange={(e) => {
            setIsLoading(true);
            getSubCategoryProperties(e);
          }}
          options={convertOptionsToDropdownOptions(subCategories)}
          placeholder={`اختر تصنيف فرعي`}
          isClearable
        />
      )}

      {isLoading && <Spinner />}

      {/* Properties */}

      {subCategoryProperties?.map((cat: any) => (
        <div key={cat?.slug}>
          <Select
            name={cat?.slug}
            options={convertOptionsToDropdownOptions(cat?.options)}
            placeholder={cat?.name}
            isClearable
          />
        </div>
      ))}

      {/* Categories */}
      {/* 
      <SearchableDropdownMenu
        options={categories.data.categories}
        placeholder="التصنيفات الرئيسية"
        type="category"
      /> */}

      {/* Sub Categories */}
      {/* <SearchableDropdownMenu
        options={subCategory?.children}
        placeholder="التصنيفات الفرعية"
        type="subCategory"
      /> */}

      {/* Properties */}
      {/* {subCategoryProperties?.data.map((cat: any) => (
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
      ))} */}

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
