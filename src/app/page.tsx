import {
  getAllCats,
  getModels,
  getSubCategoryProperties,
} from "../../utils/data";
import SearchableDropdownMenu from "./components/SearchableDropdownMenu";
import ClientOnly from "./components/ClientOnly";
import { Category } from "./types/types";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Get The categories directly as this page is a server component
  const categories = await getAllCats();

  // Get Selected Category ID  from searchParams
  const CatID = searchParams?.category as string | undefined;

  // Get The subCategories from Selected Category ID & searchParams
  const subCategoryID = searchParams?.subCategory as string | undefined;
  const subCategory = categories?.data?.categories.find(
    (cat: Category) => cat.id === parseInt(CatID!)
  );

  // Get the sub-catgory properties from searchParams  '/?cat=1&sub_cat=15''
  const subCategoryProperties = subCategoryID
    ? await getSubCategoryProperties(subCategoryID)
    : null;

  // Get models by brand from searchParams  '/?brand=55'

  const brandID = searchParams?.brand as string | undefined;
  const models = brandID ? await getModels(brandID) : null;

  if (models) {
    console.log("user selected brand", models.data[0].options);
    // console.log(subCategoryProperties)
  }

  return (
    <div className="p-4 all_items w-full min-h-[200px] bg-white rounded-xl">
      <ClientOnly>
        <div className="flilters">
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
            <div key={cat.slug}>
              <SearchableDropdownMenu
                options={cat?.options}
                placeholder={cat?.name}
                type={cat?.slug}
                multi={cat.slug !== "brand"}
              />
              {cat.slug === "brand" && (
                <SearchableDropdownMenu
                  options={models?.data[0].options}
                  placeholder="الموديلات"
                  type="model"
                  multi
                />
              )}
            </div>
          ))}
        </div>
        <button className="w-full my-4 bg-black text-white  font-light py-4 px-6 ">
          بحـث
        </button>
      </ClientOnly>
    </div>
  );
}
