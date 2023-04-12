import {
  getAllCats,
  getOptionsChild,
  getSubCategoryProperties,
} from "../../../utils/data";

import ClientOnly from "./components/ClientOnly";
import Form from "./components/Form";
import { Category } from "../types/types";
import SearchableDropdownMenu from "./components/SearchableDropdownMenu";

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
  const models = brandID ? await getOptionsChild(brandID) : null;

  // Get types by selected model from searchParams  '/?brand=55'
  const modelID = searchParams?.model as string | undefined;
  const types = modelID ? await getOptionsChild(modelID) : null;

  return (
    <div className="p-4 all_items w-full min-h-[200px] bg-white rounded-xl">
      <ClientOnly>
        <div className="flilters">
          <Form
            categories={categories}
            subCategory={subCategory}
            subCategoryProperties={subCategoryProperties}
            models={models}
            types={types}
          />
        </div>
      </ClientOnly>
    </div>
  );
}
