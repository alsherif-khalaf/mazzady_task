"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Select, { MultiValue, SingleValue } from "react-select";
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

    const categoryId = searchParams.get("category");
    const subCategoryId = searchParams.get("subCategory");
    const brandId = searchParams.get("brand");

    if (type === "category") {
      const value = newValue as OptionType | null;
      const id = value?.value ?? "";
      router.push(`/?${type}=${id}`);
    } else if (type === "subCategory") {
      const value = newValue as OptionType | null;
      const subCategoryId = value?.value ?? "";
      router.push(`/?category=${categoryId}&subCategory=${subCategoryId}`);
    } else if (type === "brand") {
      const value = newValue as OptionType | null;
      const brandId = value?.value ?? "";
      router.push(
        `/?category=${categoryId}&subCategory=${subCategoryId}&brand=${brandId}`
      );
    } else if (type === "model") {
      const value = newValue as OptionType | null;
      const modelId = value?.value ?? "";
      router.push(
        `/?category=${categoryId}&subCategory=${subCategoryId}&brand=${brandId}&model=${modelId}`
      );
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
