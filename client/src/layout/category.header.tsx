import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsGridFill, BsChevronDown } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export default function CategorySelector() {
  const links = [
    { href: "/iphone", label: "iPhone" },
    { href: "/samsung", label: "Samsung" },
    { href: "/oppo", label: "Oppo" },
  ];

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
        <Menu.Items className="absolute mt-2 w-full px-1 py-1 divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
          {
            links.map((link) => (
                <Menu.Item>
                    <NavLink to={link.href} className={({ isActive }) => `${ isActive ? "bg-violet-500 text-white" : "text-gray-900 hover:bg-primary hover:text-white"} group duration-150 flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                        {link.label}
                    </NavLink>
                </Menu.Item>
            ))
          }
        </Menu.Items>
      </Transition>
    </Menu>
  );
}