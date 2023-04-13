"use client";

import Select from "react-select";
import { Category, DropdownOption } from "@/app/types/types";
import { useEffect, useRef, useState } from "react";
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

// create function handle Form Submit
const handleFormSubmit = (e: any) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  console.log(formData);
};

const Form = ({ categories }: Props) => {
  const [subCategories, setSubCategories] = useState<Category[] | null>(null);
  const [subCategoryProperties, setSubCategoryProperties] = useState<
    Category[] | null
  >(null);
  const [models, setModels] = useState<Category[] | null>(null);
  const [currentCategory, setCurrentCategory] = useState<DropdownOption | null>(
    null
  );

  const prevCategoryRef = useRef<DropdownOption | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    // Update subCategories when categories change
    if (currentCategory === null) {
      setSubCategories(null);
      setSubCategoryProperties(null);
      return;
    }

    // Check if currentCategory is different from the previous one
    
    if (
      prevCategoryRef.current &&
      prevCategoryRef.current.value !== currentCategory.value
    ) {
     
      setSubCategories(null);
      setIsLoading(true);
      console.log(
        "Category changed from",
        prevCategoryRef.current,
        "to",
        currentCategory
      );
    }

    // Save currentCategory as the new previous category
    prevCategoryRef.current = currentCategory;
  }, [currentCategory]);

  const getSubCategoryProperties = async (e: any) => {
    if (e?.value) {
      const Id = parseInt(e.value);
      const res = await fetch(`/api/data?categoryId=${Id}`, {
        method: "GET",
      });
      const json = await res.json();
      const data = await json.res.data;
      setSubCategoryProperties(data);
      setIsLoading(false);
    }
  };

  const handleSubCategoryPropertiesChange = async (e: any, type: string) => {

    console.log(e, type);
    if (e === null) {
      setIsLoading(false);
      return;
    }
    if (type === "brand") {
      const Id = parseInt(e.value);
      console.log("brand", Id);
      const res = await fetch(`/api/data?brandId=${Id}`, {
        method: "GET",
      });
      const json = await res.json();
      const data = json.res?.data;
      console.log("proprties", data);
    }
  };

  const handelCategoriesChange = (e: any) => {
    setCurrentCategory(e);

    if (e === null) {
      setIsLoading(true);
      setSubCategories(null);
      setSubCategoryProperties(null);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }

    setIsLoading(true);
    setSubCategories(null);
    setSubCategoryProperties(null);

    const categoryId = parseInt(e.value);
    const subCategory = categories?.data?.categories.find(
      (c: any) => c.id === categoryId
    );

    setTimeout(() => {
      setSubCategories(subCategory?.children || null);
      setIsLoading(false);
    }, 1000);

  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="space-y-4">
      <p>Try Select Client</p>
      <Select
        name={"category"}
        onChange={(e) => {
          setSubCategories(null);
          handelCategoriesChange(e);
        }}
        options={convertOptionsToDropdownOptions(categories.data.categories)}
        placeholder={`اختر تصنيف`}
        isClearable
      />

      {/* Sub Categories */}

      {subCategories && (
        <Select
          name={"subCategory"}
          onChange={(e) => {
            setIsLoading(true);
            getSubCategoryProperties(e);
            if (e === null) {
              setSubCategories(null);
              setSubCategoryProperties(null);
              setIsLoading(false);
              return;
            }
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
            onChange={(e) => {
              const type = cat?.slug;
              handleSubCategoryPropertiesChange(e, type);
            }}
            options={convertOptionsToDropdownOptions(cat?.options)}
            placeholder={cat?.name}
            isClearable
          />
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
