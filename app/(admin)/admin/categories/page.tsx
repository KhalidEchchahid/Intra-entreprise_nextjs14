import Categorie from "@/components/adminShared/forms/Categorie";
import Role from "@/components/adminShared/forms/Role";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllCategories } from "@/lib/actions/categorie.action";
import { getAllRols } from "@/lib/actions/role.action";

const page = async () => {
  const { categories } = await getAllCategories();
  const {roles} = await getAllRols();
  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Categories</h1>
      </div>

      <div className="flex">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
          <div className="px-4 py-2">
            <h1 className="text-gray-800 font-bold text-2xl uppercase">
              Add or Edite Catagorie
            </h1>
          </div>

          <Categorie />
          <ScrollArea className="h-100">
            <ul className="divide-y divide-gray-200 px-4">
              {categories.map((categorie) => (
                <li className="py-4" key={categorie._id}>
                  <div className="flex items-center">
                    <p className="ml-3 block text-gray-900">
                      <span className="text-lg font-medium">{categorie.name}</span>
                      <span className="text-sm font-light text-gray-500"></span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
          <div className="px-4 py-2">
            <h1 className="text-gray-800 font-bold text-2xl uppercase">
              Add or Edit Role
            </h1>
          </div>

          <Role />
          <ScrollArea className="h-100">
            <ul className="divide-y divide-gray-200 px-4">
              {roles.map((role) => (
                <li className="py-4" key={role._id}>
                  <div className="flex items-center">
                    <p className="ml-3 block text-gray-900">
                      <span className="text-lg font-medium">{role.name}</span>
                      <span className="text-sm font-light text-gray-500"></span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
      
    </div>
  );
};

export default page;
