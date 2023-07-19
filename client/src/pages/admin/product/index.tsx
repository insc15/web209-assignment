import Button from "@/components/layout/button";
import Section from "@/components/layout/section";
import IProduct from "@/interfaces/product";
import { getProducts } from "@/services/product";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    ColumnDef,
  } from '@tanstack/react-table'

function PageAdminProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data: products } = await getProducts();
      setProducts(products);
    };
    void fetchProducts();
  }, []);

  const columnHelper = createColumnHelper<{
    index: number
    name: string
  }>()
  
  const columns = [
    columnHelper.accessor('name', {
      cell: info => info.getValue(),
    }),
  ]

  const table = useReactTable({
    products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Section className="px-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold flex items-center">
          <span className="w-1 h-6 bg-primary block mr-2"></span>
          <span>Products</span>
        </h1>
        <Link to={"/admin/products/create"}>
          <Button className="flex items-center">
            <BsPlus className="text-3xl" />
            <span className="ml-2">Thêm sản phẩm mới</span>
          </Button>
        </Link>
      </div>
      <div className="shadow p-3 bg-white">
      {/* <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table> */}
      </div>
    </Section>
  );
}

export default PageAdminProducts;
