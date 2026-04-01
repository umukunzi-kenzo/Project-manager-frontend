"use client";

import { useState } from "react";

const projectsData = [
{

  id:1,
  title:"E-learning",
  status:["Manual ", "Overdue"],
  tasks:55,
  completed:49 ,
  date:"31 mar 2026 - 20 apr 2026",
  section:"department",
},
{
  id:2,
  title:"wood  habitata",
  status:["Manual ", "completed"],
  tasks:40,
  completed:40,
  date:"1 mar 2026 - 1 apr 2026",
  section:"other",
},
{
  id:3,
  title:"E-commerce",
  status:["Manual ", "completed"],
  tasks:100,
  completed:40,
  date:"1 mar 2026 - 1 apr 2026",
  section:"other",
},
{
  id:4,
  title:"SMS",
  status:["Manual ", "completed"],
  tasks:51,
  completed:40,
  date:"1 mar 2026 - 1 apr 2026",
  section:"other",
},
{
  id:5,
  title:"CMS",
  status:["Manual ", "completed"],
  tasks:80,
  completed:40,
  date:"1 mar 2026 - 1 apr 2026",
  section:"department",
}
];


export default function projectsPage(){
const [projects] = useState(projectsData);
  const [search, setSearch] = useState("");

  const filtered = projects.filter((p) =>
  p.title.toLowerCase().includes(search.toLowerCase())
);

  const getProgress = (p) =>
    Math.floor((p.completed / p.tasks) *100);

  const getStatusStyle = (status ) => {
    if(status === "Completed") return "bg-green-600/30 text-green-400";
    if(status === "overdue") return "bg-red-600/30 text-red-400";
    return "bg-gray-700/30 text-gray-300";
  }; 
  
  return (
    <div className="p-6 bg-[#0e0e10] min-h-screen text-white ">

       <div className="flex justify-between item-center mb-6">
        <div>
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-gray-400 text-sm">
          Manage your projects and track progress</p>
       </div>

       <button className="bg-purple-600 text-white px-4 py-2 rounded">
        + New Project
       </button>
      </div>

      <div className="flex gap-6 border-b border-gray-800 mb-4">
        <button className="border-b-2 border-purple-600 pb-2 text-purple-600">
          Ongoing Projects
        </button>

      <button className="text-gray-500">   
        Archived Projects
      </button>
      </div>
 
         <div className="bg-[#1c1c1e] p-4 rounded mb-6 flex gap-3 border border-gray-700">

          <input
          placeholder="Serach Project..."
          value={search}
          onChange={(e) =>  setSearch(e.target.value)}
          className="bg-[#1c1c1e] border  border-gray-700 px-3 py-2 rounded w-1/3 text-white"
           />

           <select className="bg-[#1c1c1e] border border-gray-700 px-3 py-2 rounded text-white">
            <option>Created Date</option>
            <option>Name</option>
           </select>


          <select className="bg-[#1c1c1e] border border-gray-700 px-3 py-2 rounded text-white">
            <option>Asce</option>
            <option>Desc</option>
           </select>
         </div>

         <Section 
         title="My Department Project"
         projects={filtered.filter((p) => p.section === "department")}
         getProgress={getProgress}
         getStatusStyle={getStatusStyle}
        />
   
         <Section
         title="Other Projects"
         projects={filtered.filter((p) => p.section === "other")}
         getProgress={getProgress}
         getStatusStyle={getStatusStyle}
         />
       </div>
  );
}

function Section({ title, projects, getProgress, getStatusStyle}) {
  return(
    <div className="mb-6">
      <h2 className=" text-lg font-semibold mb-6">{title}</h2>

      <div className="space-y-4">
        {projects.map((p) => (
          <div 
          key= {p.id}
          className="bg-[#1c1c1e] p-4 rounded border border-gray-800 hover:border-purple-700"
          >
            {/* tittle and progresss */}
            <div className="flex justify-between items-center"> 
            <h3 className="font-semibold">{p.title}</h3> 
              <span className="text -xs">{getProgress(p)}%</span>
            </div>


           {/* tags */}
           <div className="flex gap-2 mt-2">
           {p.status.map((s, i) =>(
            <span 
            key={i}
            className={`text-xs px-2 py- rounded ${getStatusStyle(s)}`}
            >

            {s}
            </span>
           ))}

           </div>
           {/* date */}
           <p className="text-sm mt-2 text-gray"> {p.completed}/{p.tasks} Task Completed

           </p>
           {/* progress bar */}
           <div className="w-full bg-gray-800 h-2 rounded mt-2">
            <div
            className="bg-purple-600 h-2 rounded"
            style={{width: `${getProgress(p)}%`}}
            >

            </div>
           </div>
          </div>
        ))}
        </div>
    </div>
  );
}