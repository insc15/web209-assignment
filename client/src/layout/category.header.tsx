import { getAll } from "@/api/categories";
import ICate from "@/interfaces/category";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsGridFill, BsChevronDown } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export default function CategorySelector() {
  const [category, setCategory] = useState<ICate[]>([])
  useEffect(() => {
    getAll().then(({ data }) => {
      setCategory(data);
    })
  }, [])


  return (
    <Menu as="div" className="relative">
      <Menu.Button className="inline-flex w-full items-center rounded-full bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-button-hover duration-150 focus:outline-none">
        <BsGridFill className="mr-2" />
        <p>Categories</p>
        <BsChevronDown className="ml-auto" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute mt-2 w-full px-1 py-1 divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none z-10">
          {
            category.map((cate, index) => (
              <Menu.Item key={index}>
                <NavLink to={cate.name} className={({ isActive }) => `${isActive ? "bg-violet-500 text-white" : "text-gray-900 hover:bg-primary hover:text-white"} group duration-150 flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                  {cate.name}
                </NavLink>
              </Menu.Item>
            ))
          }
        </Menu.Items>
      </Transition>
    </Menu>
  );
}