"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import { DropdownOption } from "../types/types";
import { useEffect, useState } from "react";

type OptionType = {
  label: string;
  value: string;
  isDisabled?: boolean;
};

type Props = {
  options: any[];
  type: string;
  placeholder: string;
  multi?: boolean;
};

const SearchableDropdownMenu: React.FC<Props> = ({
  options,
  type,
  placeholder,
  multi = false,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<OptionType | OptionType[] | null>(
    null
  );

  // Convert options to dropdown options
  const dropdownOptions: DropdownOption[] =
    options === undefined || options.length === 0
      ? [
          {
            label: "لا يوجد",
            value: "0",
            isDisabled: true,
          },
        ]
      : options.map((option: any) => ({
          label: option.name,
          value: option.id.toString(),
        }));

  useEffect(() => {
    const selectedValue = searchParams.get(type);
    if (selectedValue) {
      const selectedOption = options?.find(
        (option) => option.id === Number(selectedValue)
      );
      if (selectedOption) {
        setSelected({
          label: selectedOption.name,
          value: selectedValue,
        });
      }
    }
  }, [searchParams, type, options]);

  // Handle dropdown menu change
  const handleChange = (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>
  ) => {

    console.log(newValue);
    console.log(type);


    setSelected(newValue as OptionType | OptionType[] | null);

    if (type === "category") {
      console.log("category");
      const value = newValue as OptionType | null;
      const id = value ? value.value : "";
      router.push(`/?${type}=${id}`);
    }

    if (type === "subCategory") {
      const value = newValue as OptionType | null;
      const subCategoryId = value ? value.value : "";
      const categoryQueryParam = searchParams.get("category");
      const categoryId = categoryQueryParam ? categoryQueryParam : "";
      router.push(`/?category=${categoryId}&subCategory=${subCategoryId}`);
    }

    if (type === "brand") {
      const value = newValue as OptionType | null;
      const brandId = value ? value.value : "";
      const categoryQueryParam = searchParams.get("category");
      const subCategoryQueryParam = searchParams.get("subCategory");
      const categoryId = categoryQueryParam ? categoryQueryParam : "";
      router.push(`/?category=${categoryId}&subCategory=${subCategoryQueryParam}&brand=${brandId}`);
    }

  };

  return (
    <div className="my-4">
      <p className="pb-2 font-bold text-sm">{placeholder}</p>

      <Select
        options={dropdownOptions}
        onChange={handleChange}
        placeholder={`اختر من  ${placeholder}`}
        isClearable
        isMulti={multi}
        value={selected}
      />
    </div>
  );
};

export default SearchableDropdownMenu;
