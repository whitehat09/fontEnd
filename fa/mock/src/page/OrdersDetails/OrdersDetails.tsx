import { useEffect, useState } from "react";
import { showHeaderAdmin } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";

import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";

//import updateDocument from "firebase-functions";
import "./css/style.css";

const OrdersDetails = () => {
  const dispatch = useAppDispatch();
  let { id }: any = useParams();
  const [productDetail, setProductDetail] = useState<any[]>([]);
  useEffect(() => {
    dispatch({ type: showHeaderAdmin.type });
    db.collection("orders").onSnapshot((snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const result = data.filter((item: any) => item.id === `${id}`); // filter id product
      console.log(result);
      setProductDetail(result);
    });
  }, [id, dispatch]);
  console.log("orders", productDetail[0]?.order);

  return (
    <>
      <section>
        <div className="container">
          <div className="row p-5 d-flex justify-content-center  ">
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Tên người đặt</th>
                  <th scope="col">Ảnh đại diện</th>
                  <th scope="col">Nhà Cung cấp</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-long">{productDetail[0]?.User?.uid}</td>
                  <td>{productDetail[0]?.User?.displayName}</td>
                  <td>
                    <img
                      className="card-img-top img-responsive"
                      src={productDetail[0]?.User?.photoURL}
                      alt="product"
                      style={{ height: "auto", width: "80px" }}
                    />
                  </td>
                  <td>{productDetail[0]?.User?.providerId} VNĐ</td>
                  <td>{productDetail[0]?.User?.email}</td>
                </tr>
              </tbody>
            </table>

            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">hình ảnh</th>
                  <th scope="col">số lượng</th>
                  <th scope="col">Giá tiền/1 sản phẩm</th>
                  <th scope="col">đơn vị tiền</th>
                </tr>
              </thead>
              <tbody>
                {productDetail[0]?.order.map((item: any) => (
                  <tr>
                    <td>{item.productName}</td>
                    <td>
                      <img
                        className="card-img-top img-responsive"
                        src={item.image}
                        alt="product"
                        style={{ height: "auto", width: "80px" }}
                      />
                    </td>
                    <td>{item.quantity} </td>
                    <td>{item.price} </td>
                    <td>VNĐ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrdersDetails;
