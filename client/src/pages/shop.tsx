import Breadcrumb from "../components/breadcrumb";
import Container from "../components/layout/container";
import Section from "../components/layout/section";
import ListProducts from "../components/listProducts";
import products from "./db";
import { FiSliders } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

function Sorting({ sortOtps = [], current, setFilter = () => {return;} } : { sortOtps: {label: string, value: string}[], current?: string, setFilter: React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <Menu as="div" className="relative w-40">
      <Menu.Button className="inline-flex w-full items-center rounded-full text-sm duration-150 outline-none text-gray-700 justify-end">
        <span className="mr-2">{sortOtps.map((otp)=> {if(otp.value == current) return otp.label})}</span>
        <BsChevronDown />
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
        <Menu.Items className="absolute mt-2 w-full text-right px-1 py-1 divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none z-10">
            {
                sortOtps.map((opt, index) => (
                    <Menu.Item key={index}>
                        <button onClick={()=>setFilter(opt.value)} className="group duration-150 justify-end flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">
                            {opt.label}
                        </button>
                    </Menu.Item>
                ))
            }
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function Show({ showOtps = [], current, setFilter = () => {return;} } : { showOtps: {label: string, value: string}[], current: string, setFilter: React.Dispatch<React.SetStateAction<string>> }) {
    return (
        <Menu as="div" className="relative w-fit">
          <Menu.Button className="inline-flex w-full items-center rounded-full text-sm duration-150 outline-none text-gray-700 justify-end">
            <span className="mr-2">Show {current}</span>
            <BsChevronDown />
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
                    showOtps.map((opt, index) => (
                        <Menu.Item key={index}>
                            <button onClick={()=>setFilter(opt.value)} className="group duration-150 flex w-full justify-end items-center rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white">
                                {opt.label}
                            </button>
                        </Menu.Item>
                    ))
                }
            </Menu.Items>
          </Transition>
        </Menu>
      );
}

function PageShop() {
  const [showFilter, setShowFilter] = useState<string>('20');
  const [sort, setSort] = useState<string>('default');

  const sortOtps : {label: string, value: string}[] = [
    { label: "Default Sorting", value: "default" },
    { label: "Price: Low to High", value: "low-to-high" },
    { label: "Price: High to Low", value: "high-to-low" },
  ]

  const showOtps : {label: string, value: string}[] = [
    { label: "20", value: "20" },
    { label: "30", value: "30" },
    { label: "40", value: "40" },
  ]

  return (
    <>
      <Breadcrumb title={"Products"} />
      <Section>
        <Container>
          <div className="border-b mb-5 pb-5 flex items-center justify-between">
            <div className="flex items-center">
              <FiSliders className="mr-2" />
              <span className="font-medium">Filter</span>
            </div>
            <div className="flex items-center">
                <Sorting sortOtps={sortOtps} setFilter={setSort} current={sort}/>
                <span className="mx-2 text-gray-300 font-light">|</span>
                <Show showOtps={showOtps} current={showFilter} setFilter={setShowFilter}/>
            </div>
          </div>
          <ListProducts products={products} limit={30} />
        </Container>
      </Section>
    </>
  );
}

export default PageShop;
