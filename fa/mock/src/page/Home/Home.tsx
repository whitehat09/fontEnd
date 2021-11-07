import { useEffect, useState } from "react";

import "./css/style.css";
import { useAppDispatch } from "../../app/hooks";

import { useHistory } from "react-router";
import { db } from "../../firebase/config";
import { getProducts } from "../../features/products/productsSlice";
import { getShopingCart } from "../../features/shopingCart/shopingCartSlice";
import { showHeaderUser } from "../../features/auth/authSlice";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    db.collection("products").onSnapshot((snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(data);
      dispatch({ type: getProducts.type, payload: data });
      dispatch({ type: showHeaderUser.type });
    });
  }, [dispatch]);
  return (
    <>
      <section>
        <div className="container">
          <div className="row p-5  ">
            {posts.map((item: any) => (
              <div className="col-4 mt-4" key={item.id}>
                <div className="card ">
                  <img
                    className="card-img-top img-responsive"
                    src={item.image}
                    alt="product"
                    style={{ height: "319px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.productName}</h5>

                    <p>
                      {item.category.map((item: any) => (
                        <span key={item.index}>{item}</span>
                      ))}
                    </p>

                    <p>{item.price} VNĐ</p>
                    <div className=" d-flex justify-content-between">
                      <button
                        style={{ fontSize: "14px" }}
                        className="btn btn-primary text-white"
                        onClick={() =>
                          history.push(`/ProductDetails/${item.id}`)
                        }
                      >
                        Chi tiết sản phẩm
                      </button>
                      <button
                        style={{ fontSize: "14px" }}
                        className="btn btn-danger text-white"
                        onClick={() =>
                          dispatch({ type: getShopingCart.type, payload: item })
                        }
                      >
                        Thêm giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
