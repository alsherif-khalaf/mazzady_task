"use client";

import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Category, DropdownOption } from "@/app/types/types";
import { ReactNode, useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import Modal from "react-modal";

type Props = {
  categories: any;
  subCategory: any;
  subCategoryProperties: any;
  models: any;
  types: any;
};

// Make a function that Convert options to dropdown options and return it
const convertOptionsToDropdownOptions = (options: any[], type: string) => {
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

  if (
    type !== "category" &&
    type !== "subCategory" &&
    type !== "model" &&
    type !== "brand"
  ) {
    dropdownOptions.unshift({ label: "اخر", value: "null" });
  }

  return dropdownOptions;
};

//

const createOption = [
  {
    label: "إبدأ بكتابة عنصر جديد ",
    value: null,
    isDisabled: true,
  },
];

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
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [otherOptions, setOtherOptions] = useState<{ [key: string]: boolean }>(
    {}
  );

  const [formData, setFormData] = useState(new FormData());

  const [isOpen, setIsOpen] = useState(false);

  //  function handle Form Submit
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setFormData(formData);
    setIsOpen(true);
    console.log(formData);
  };

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

  useEffect(() => {
    // Update subCategories when categories change
    Modal.setAppElement("#mazzady");
  }, []);

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
      setIsModelLoading(true);
      const res = await fetch(`/api/data?brandId=${Id}`, {
        method: "GET",
      });
      const json = await res.json();
      const data = json.res?.data;
      console.log("proprties", data);
      setTimeout(() => {
        setIsModelLoading(false);
        setModels(data);
      }, 1000);
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

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className="formdata text-bold text-slate-600" dir="ltr">
          {Object.keys(formData) && (
            <ul>
              {Array.from(formData.entries()).map(([key, value]) => {
                let renderedValue: ReactNode = value as ReactNode;
                return (
                  <li key={key}>
                    {key} : {renderedValue}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Modal>

      <form onSubmit={(e) => handleFormSubmit(e)} className="space-y-4">
        <p className="text-center"> Select Client</p>
        <Select
          name={"category"}
          getOptionValue={(option: any) => option?.label}
          onChange={(e) => {
            setSubCategories(null);
            handelCategoriesChange(e);
          }}
          options={convertOptionsToDropdownOptions(
            categories.data.categories,
            "category"
          )}
          placeholder={`اختر تصنيف`}
          isClearable
        />

        {/* Sub Categories */}

        {subCategories && (
          <Select
            name={"subCategory"}
            getOptionValue={(option: any) => option?.label}
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
            options={convertOptionsToDropdownOptions(
              subCategories,
              "subCategory"
            )}
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
              getOptionValue={(option: any) => option?.label}
              onChange={(e) => {
                if (e?.value === "null") {
                  console.log("The null");
                  setOtherOptions({ ...otherOptions, [cat?.slug]: true });
                }
                const type = cat?.slug;
                if (cat?.slug === "brand") {
                  setIsModelLoading(true);
                  setModels(null);
                }
                handleSubCategoryPropertiesChange(e, type);
              }}
              options={convertOptionsToDropdownOptions(cat?.options, cat?.slug)}
              placeholder={cat?.name}
              isClearable
            />

            {otherOptions[cat?.slug] &&
              cat?.slug !== "model" &&
              cat?.slug !== "brand" && (
                <div className="my-4">
                  <CreatableSelect
                    getOptionValue={(option: any) => option?.label}
                    name={`other ${cat?.slug}`}
                    options={createOption}
                    formatCreateLabel={(inputValue: any) => {
                      return `إنشي   ${inputValue} `;
                    }}
                    placeholder={` إنشي   ${cat?.name} `}
                    isClearable
                  />
                </div>
              )}

            {models &&
              cat?.slug === "brand" &&
              models?.map((model: any) => (
                <div key={model?.slug} className="my-4">
                  <Select
                    getOptionValue={(option: any) => option?.label}
                    name={model?.slug}
                    options={convertOptionsToDropdownOptions(
                      model?.options,
                      model?.slug
                    )}
                    placeholder={model?.name}
                    isClearable
                  />
                </div>
              ))}

            {isModelLoading && cat?.slug === "brand" && (
              <div className="my-4">
                <Spinner />
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full my-4 bg-black text-white  font-light py-4 px-6 "
        >
          تنفيذ
        </button>
      </form>
    </>
  );
};

export default Form;
