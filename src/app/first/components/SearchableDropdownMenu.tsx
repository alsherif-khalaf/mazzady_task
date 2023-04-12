"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Select, { MultiValue, SingleValue } from "react-select";
import { DropdownOption, OptionType } from "../../types/types";
import React, {  useEffect, useState , useMemo } from "react";

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
  const path = usePathname();
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

  // Add the "other" option to the beginning of the array
  // if (type !== "category") {
  //   dropdownOptions.unshift({ label: "اخر", value: null });
  // }

  if (
    type !== "category" &&
    type !== "subCategory" &&
    type !== "model" &&
    type !== "brand"
  ) {
    dropdownOptions.unshift({ label: "اخر", value: null });
  }

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
      router.push(`${path}?${type}=${id}`);
    } else if (type === "subCategory") {
      const value = newValue as OptionType | null;
      const subCategoryId = value?.value ?? "";
      router.push(
        `${path}?category=${categoryId}&subCategory=${subCategoryId}`
      );
    } else if (type === "brand") {
      const value = newValue as OptionType | null;
      const brandId = value?.value ?? "";
      router.push(
        `${path}?category=${categoryId}&subCategory=${subCategoryId}&brand=${brandId}`
      );
    } else if (type === "model") {
      const value = newValue as OptionType | null;
      const modelId = value?.value ?? "";
      router.push(
        `${path}?category=${categoryId}&subCategory=${subCategoryId}&brand=${brandId}&model=${modelId}`
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

export default React.memo(SearchableDropdownMenu);
// export default SearchableDropdownMenu;