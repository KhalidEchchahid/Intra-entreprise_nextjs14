"use client"
import { updateUserSkills } from '@/lib/actions/user.action';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface Skill {
  _id: string;
  name: string;
}

interface Level {
  _id: string;
  name: string;
}

interface Props {
  userSkills: string;
  allSkills: string;
  allLevels: string;
  userId: string;
}

const SkillForm = ({ userSkills, allSkills, allLevels, userId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
  const [skills, setSkills] = useState(userSkills ? JSON.parse(userSkills) : []);
  console.log(skills);

  const handleSkillChange = (index: number, field: string, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { skill: '', level: '' }]);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  
  async function onSave() {
    try {
      // make an async call to your API -> create a question
      // contain all form data

      await updateUserSkills({
        userId , 
        skills,
        path: pathname
      });
     
      router.forward();
    } catch (error) {

    }
  }

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div key={index} className="flex items-center space-x-4">
          <select
            value={skill.skill}
            onChange={(e) => handleSkillChange(index, 'skill', e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select skill</option>
            {JSON.parse(allSkills).map((s: Skill) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            value={skill.level}
            onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select level</option>
            {JSON.parse(allLevels).map((l: Level) => (
              <option key={l._id} value={l._id}>
                {l.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => removeSkill(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addSkill}
        className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
      >
        Add Skill
      </button>
      <button
        type="button"
        onClick={onSave}
        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-700"
      >
        Save
      </button>
    </div>
  );
};

export default SkillForm;
