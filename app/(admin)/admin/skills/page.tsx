import Level from "@/components/adminShared/forms/Level";
import Skills from "@/components/adminShared/forms/Skills";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllLevels } from "@/lib/actions/level.action";
import { getAllSkills } from "@/lib/actions/skill.action";

const page = async () => {
  const { skills } = await getAllSkills();

  
  const {levels } = await getAllLevels();
  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Skills & Mastry level</h1>
      </div>
      <div className="flex justify-between">
        <div >
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
            <div className="px-4 py-2">
              <h1 className="text-gray-800 font-bold text-2xl uppercase">
                Add or Edite Skill       
              </h1>
            </div>

            <Skills />
            <ScrollArea className="h-80">
            <ul className="divide-y divide-gray-200 px-4">
              {skills.map((skill) => (
                <li className="py-4" key={skill._id}>
                  <div className="flex items-center">
                    <p className="ml-3 block text-gray-900">
                      <span className="text-lg font-medium">{skill.name}</span>
                      <span className="text-sm font-light text-gray-500"></span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            </ScrollArea>
          </div>
        </div>

        <div>
          <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
            <div className="px-4 py-2">
              <h1 className="text-gray-800 font-bold text-2xl uppercase">
                Add or Edite mastry level 
              </h1>
            </div>

            <Level />
            
            
            <ScrollArea className="h-80">
            <ul className="divide-y divide-gray-200 px-4">
              {levels.map((level) => (
                <li className="py-4" key={level._id}>
                  <div className="flex items-center">
                    <p className="ml-3 block text-gray-900">
                      <span className="text-lg font-medium">{level.name}</span>
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
    </div>
  );
};

export default page;
