import Button from "@/components/layout/button";
import Section from "@/components/layout/section";
import IProduct from "@/interfaces/product";
import { deleteProduct, getProducts } from "@/services/product";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { BiTrash, BiEdit } from "react-icons/bi";

import {
  ColumnDef,
  createColumnHelper,
} from "@tanstack/react-table";
import currencyFormatter from "@/lib/currencyFormatter";
import Table from "@/components/table";
import { useDialog } from "@/hooks/useDialog";
import { toast } from "react-toastify";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
type IProductTable = Omit<IProduct, "image"> & { image: string, categoryId: { name: string } };

function PageAdminProducts() {
  const [products, setProducts] = useState<IProductTable[]>([]);
  const { showDialog } = useDialog();

  const removeProduct = async (id: string) => {
    const res = await deleteProduct(id);
    if (res.status === 200) {
      toast.success("Xóa sản phẩm thành công")
      setProducts(products.filter(product => product._id !== id));
    } else {
      toast.error("Xóa sản phẩm thất bại")
    }
  }

  const handleRemove = (id: string) => {
    showDialog({
      title: "Xóa sản phẩm",
      content: (
        <div className="text-center">
          <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
          <div className="flex justify-center mt-4">
            <Button className="mr-2" onClick={() => {
              showDialog(null);
            }}>Hủy</Button>
            <Button onClick={() => {
              showDialog(null); void removeProduct(id);
            }}>Xóa</Button>
          </div>
        </div>
      ),
    });
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: products } = await getProducts(true);
      setProducts(products as IProductTable[]);
    };
    void fetchProducts();
  }, []);

  const columnHelper = useMemo(() => createColumnHelper<IProductTable>(), []);

  const columns = useMemo(
    () => [
      {
        id: "index",
        header: "STT",
        cell: ({ row }) => row.index + 1,
      },
      columnHelper.accessor("image", {
        header: "Ảnh",
        cell: (info) => <img className="w-9 h-9" src={info.getValue()} alt="" />,
      }),
      columnHelper.accessor("name", {
        header: "Tên sản phẩm",
        cell: ({ row, cell }) => <a className="hover:text-primary" target="_blank" href={`/products/${row.original._id as string}`}>{cell.getValue()}</a>,
      }),
      columnHelper.accessor("categoryId", {
        header: "Danh mục",
        cell: (info) => info.getValue()?.name,
      }),
      columnHelper.accessor("price", {
        header: "Giá",
        cell: ({ row }) => currencyFormatter(row.original.discount_price || row.original.price),
      }),
      {
        id: "action",
        header: "Hành động",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link className="p-1 border rounded text-gray-700 hover:border-transparent hover:text-white hover:bg-primary cursor-pointer duration-150" to={`/admin/products/${row.original._id as string}/update`}>
              <BiEdit size="22" />
            </Link>
            <button className="p-1 border rounded text-gray-700 hover:border-transparent hover:text-white hover:bg-red-500 cursor-pointer duration-150"
              onClick={() => {
                handleRemove(row.original._id as string)
              }}
            >
              <BiTrash size="22" />
            </button>
          </div>
        ),
      }
    ] as Array<ColumnDef<IProductTable, unknown>>, [columnHelper]
  );

  return (
    <Section className="px-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold flex items-center">
          <span className="w-1 h-6 bg-primary block mr-2"></span>
          <span>Sản phẩm</span>
        </h1>
        <Link to={"/admin/products/create"}>
          <Button className="flex items-center">
            <BsPlus className="text-3xl" />
            <span className="ml-2">Thêm sản phẩm mới</span>
          </Button>
        </Link>
      </div>
      <div className="shadow p-3 bg-white">
        {products.length > 0 ?
          <Table data={products} columns={columns} />
          : <div className="flex justify-center items-center p-3 "><Spin indicator={antIcon} /></div>
        }
      </div>
    </Section>
  );
}

export default PageAdminProducts;
