import {
  Formik,
  Field,
  FastField,
  Form,
  FormikProps,
  FastFieldProps,
  FieldArray,
  ErrorMessage,
} from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { showHeaderAdmin } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import "./style.css";

import { useParams } from "react-router-dom";
import { db } from "../../firebase/config";

import updateDocument from "../../firebase/service/updateDocument";

const UpdateProduct = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  let { id }: any = useParams();
  const [productDetail, setProductDetail] = useState<any[]>([
    { productName: "", image: "", description: "", price: "", category: [] },
  ]);
  useEffect(() => {
    dispatch({ type: showHeaderAdmin.type });
    db.collection("products").onSnapshot((snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const result = data.filter((item: any) => item.id === `${id}`); // filter id product
      console.log("result[0]", result);
      console.log("data", data);
      setProductDetail(result);
    });
  }, [dispatch, id]);

  const validate = Yup.object().shape({
    productName: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Required !"),
    image: Yup.string().required("Required").url("Not image URL !"),
    description: Yup.string().required("Required !"),
    price: Yup.string().required("Required !"),
  });

  return (
    <>
      <section>
        <div className="container">
          <div className="row p-5 d-flex justify-content-center  ">
            <div className="col-6">
              <Formik
                enableReinitialize
                initialValues={productDetail[0]}
                validationSchema={validate}
                onSubmit={(values) => {
                  setTimeout(() => {
                    updateDocument("products", id, values);
                    alert("Sửa sản phẩm thành công");
                    history.push(`/admin/dashboardproducts`);
                  }, 1000);
                  console.log("data add", values);
                }}
              >
                {(
                  form: FormikProps<{
                    productName: string;
                    image: string;
                    description: string;
                    price: string;
                    category: any;
                  }>
                ) => (
                  <Form>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={!form.isValid || !form.dirty}
                      >
                        Sửa sản phẩm
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={form.handleReset}
                      >
                        xoá dữu liệu
                      </button>
                      <div className="form-group">
                        <label
                          className="font-weight-bold"
                          htmlFor="exampleFieldProductName"
                        >
                          Tên sản phẩm
                        </label>
                        <FastField
                          type="text"
                          name="productName"
                          className="form-control"
                          id="exampleFieldProductName"
                          aria-describedby="productNameHelp"
                        />
                        {form.touched.productName &&
                          form.errors.productName && (
                            <div>{form.errors.productName}</div>
                          )}
                      </div>
                      <div className="form-group">
                        <label
                          className="font-weight-bold"
                          htmlFor="exampleFieldImage"
                        >
                          Ảnh sản phẩm
                        </label>
                        <Field
                          type="text"
                          name="image"
                          className="form-control"
                          id="exampleFieldImage"
                        />
                        {form.touched.image && form.errors.image && (
                          <div>{form.errors.image}</div>
                        )}
                        {form.values.image ? (
                          <img
                            src={form.values.image}
                            className="img-form-recipes"
                            alt="product"
                          ></img>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label
                          className="font-weight-bold"
                          htmlFor="exampleFieldPrice"
                        >
                          Giá sản phẩm
                        </label>
                        <Field
                          type="text"
                          name="price"
                          className="form-control"
                          id="exampleFieldPrice"
                        />
                        {form.touched.price && form.errors.price && (
                          <div>{form.errors.price}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label
                          className="font-weight-bold"
                          htmlFor="exampleFormDescription"
                        >
                          Mô tả
                        </label>
                        <FastField name="description">
                          {({ field, form }: FastFieldProps) => {
                            return (
                              <textarea
                                className="form-control"
                                {...field}
                                id="exampleFormDescription"
                                rows={3}
                              />
                            );
                          }}
                        </FastField>
                        {form.touched.description &&
                          form.errors.description && (
                            <div>{form.errors.description}</div>
                          )}
                      </div>

                      <FieldArray name="category">
                        {({ insert, remove, push }) => (
                          <div>
                            {form.values.category.length > 0 &&
                              form.values.category.map(
                                (category: any, index: any) => (
                                  <div className="form-row" key={index}>
                                    <div className="form-group col-md-6">
                                      <Field
                                        className="form-control"
                                        name={`category.${index}`}
                                        placeholder="Danh mục"
                                        type="text"
                                      />
                                      <ErrorMessage
                                        name={`category.${index}`}
                                        component="div"
                                        className="field-error"
                                      />
                                    </div>

                                    <div className="form-group col-md-2">
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => remove(index)}
                                      >
                                        X
                                      </button>
                                    </div>
                                  </div>
                                )
                              )}
                            <button
                              type="button"
                              className="btn btn-success mt-5"
                              onClick={() => push("")}
                            >
                              Thêm danh mục
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProduct;
