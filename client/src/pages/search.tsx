import Breadcrumb from "../components/breadcrumb";
import Container from "../components/layout/container";
import Section from "../components/layout/section";
import ListProducts from "../components/listProducts";
import { FiSliders } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import IProduct from "@/interfaces/product";
import { getProducts } from "@/services/product";
import { getAll } from "@/services/category";
import ICate from "@/interfaces/category";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Range } from "react-range";
import currencyFormatter from "@/lib/currencyFormatter";

function Sorting({ sortOtps = [], current, setFilter = () => {return;} } : { sortOtps: {label: string, value: string}[], current?: string, setFilter: React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <Menu as="div" className="relative w-44">
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

type FormValues = { [k: string]: string | string[]; }

function PageSearch() {
  const [priceRangeValues, setPriceRangeValues] = useState<number[]>([0, 1]);
  const [priceRangeConfig, setPriceRangeConfig] = useState<{min: number, max: number}>({min: 0, max: 1})
  const [showFilter, setShowFilter] = useState<string>('20');
  const [sort, setSort] = useState<string>('default');
  const [products, setProducts] = useState<IProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<ICate[]>([])
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      categoryId: searchParams.get('categoryId')?.split(',') || '',
    }
  });

  const sortOtps : {label: string, value: string}[] = [
    { label: "Sắp xếp mặc định", value: "default" },
    { label: "Giá: Thấp đến Cao", value: "low-to-high" },
    { label: "Giá: Cao xuống Thấp", value: "high-to-low" },
  ]

  const showOtps : {label: string, value: string}[] = [
    { label: "20", value: "20" },
    { label: "30", value: "30" },
    { label: "40", value: "40" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      const { data: products } = await getProducts(true, searchParams.toString());
      const { data: categories } = await getAll();

      const min = 0;
      const max = Math.max(...products.map((product) => product.price)) + 100000;
      if(max > min){
        setPriceRangeConfig({min, max});
        setPriceRangeValues([min, max]);
      }

      setProducts(products);
      setFilteredProducts(products);
      setCategories(categories);
    };
    void fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {      
      const { data: products } = await getProducts(true, searchParams.toString());
      setProducts(products);
      setFilteredProducts(products);
    };
    void fetchData();
  }, [searchParams]);

  useEffect(() => {
    switch (sort) {
      case 'low-to-high':
        setFilteredProducts([...products].sort((a, b) => a.price - b.price));
        setProducts([...products].sort((a, b) => a.price - b.price));
        break;
      case 'high-to-low':
        setFilteredProducts([...products].sort((a, b) => b.price - a.price));
        setProducts([...products].sort((a, b) => b.price - a.price));
        break;
      default:
        setFilteredProducts([...products].sort((a, b) => (a._id! as string).localeCompare(b._id as string)));
        setProducts([...products].sort((a, b) => (a._id! as string).localeCompare(b._id as string)));
        break;
    }
  },[sort])

  const onSubmit = (data: FormValues) => {
    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null && v != '' && v.length > 0));
    const params = new URLSearchParams();
    params.append('s', searchParams.get('s') as string);
    Object.entries(filteredData).forEach(([k, v]) => {
      params.append(k, v as string);
    });
    void navigate(`/search?${new URLSearchParams(params).toString()}`, { replace: true })
  }

  const priceFilter = (values: number[]) => {
    
      const min = values[0]
      const max = values[1]

      setFilteredProducts(products.filter((product) => product.price >= min && product.price <= max));
  }

  useEffect(() => {
    handleSubmit(onSubmit)().catch((err) => console.log(err));
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [watch('categoryId')]);

  return (
    <>
      <Breadcrumb title={"Tìm kiếm"} />
      <Section>
        <Container className="flex gap-10">
          <div className="w-3/12">
            <form className="" onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
              <div className="shadow-sm border mb-5">
                <h5 className="text-lg font-medium px-5 py-3 border-b">Danh mục sản phẩm</h5>
                <ul className="mt-3 px-5 pb-3">
                  {categories.map((cate, index) => (
                    <li key={index} className="mb-2">
                      <label className="cursor-pointer">
                        <input type="checkbox" value={cate._id} className="mr-2" {...register('categoryId')} />
                        <span>{cate.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shadow-sm border mb-5">
                <h5 className="text-lg font-medium px-5 py-3 border-b">Giá</h5>
                <Range
                  values={priceRangeValues}
                  step={1}
                  min={priceRangeConfig.min}
                  max={priceRangeConfig.max}
                  rtl={false}
                  onFinalChange={(values) => { priceFilter(values) }}
                  onChange={(values) => { setPriceRangeValues(values); }}
                  renderTrack={({ props, children }) => (
                    <div onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} className="px-5 py-10">
                      <div ref={props.ref} className="bg-primary rounded self-center w-full h-[5px]">
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div {...props} className="h-6 w-6 outline-none rounded-full shadow-[0px_2px_6px_#AAA] bg-white flex justify-center items-center">
                      <div className={`h-3 w-3 duration-150 rounded-full ${isDragged ? 'bg-primary' : 'bg-gray-300'}`}/>
                    </div>
                  )}
                />
                <div className="flex items-center justify-between px-5 pb-3">
                  <input type="text" disabled value={currencyFormatter(priceRangeValues[0])} className="w-1/3 text-center border border-gray-300 rounded-md py-2 outline-none" />
                  <input type="text" disabled value={currencyFormatter(priceRangeValues[1])} className="w-1/3 text-center border border-gray-300 rounded-md py-2 outline-none" />
                </div>
              </div>
            </form>
          </div>
          <div className="w-9/12">
            <div className="border-b mb-5 pb-5 flex items-center justify-between">
              <div className="flex items-center">
                <FiSliders className="mr-2" />
                <span className="font-medium">Lọc</span>
              </div>
              <div className="flex items-center">
                  <Sorting sortOtps={sortOtps} setFilter={setSort} current={sort}/>
                  {/* <span className="mx-2 text-gray-300 font-light">|</span> */}
                  {/* <Show showOtps={showOtps} current={showFilter} setFilter={setShowFilter}/> */}
              </div>
            </div>
            <ListProducts products={filteredProducts} columns={3} limit={24} />
          </div>
        </Container>
      </Section>
    </>
  );
}

export default PageSearch;
