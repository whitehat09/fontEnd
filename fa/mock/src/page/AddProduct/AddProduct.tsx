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
import { useEffect } from "react";
import { showHeaderAdmin } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../app/hooks";
import "./style.css";
import addDocument from "../../firebase/service/addDocument";
const AddProduct = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({ type: showHeaderAdmin.type });
  }, [dispatch]);
  const validate = Yup.object().shape({
    productName: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Required !"),
    image: Yup.string().required("Required").url("Not image URL !"),
    description: Yup.string().required("Required !"),
    price: Yup.string().required("Required !"),
  });
  let firstvalue: any = {
    productName: "",
    image: "",
    description: "",
    price: "",
    category: [] as string[],
  };
  return (
    <>
      <section>
        <div className="container">
          <div className="row p-5 d-flex justify-content-center  ">
            <div className="col-6">
              <Formik
                enableReinitialize
                initialValues={firstvalue}
                validationSchema={validate}
                onSubmit={(values) => {
                  setTimeout(() => {
                    addDocument("products", values);
                    alert("Thêm sản phẩm thành công");
                    history.push(`/admin/dashboardproducts`);
                  }, 1000);
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
                        Thêm sản phẩm
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
                          className="font-weight-bold mt-2"
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
                            <div className="text-errors">
                              {form.errors.productName}
                            </div>
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
                          <div className="text-errors">{form.errors.image}</div>
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
                          <div className="text-errors">{form.errors.price}</div>
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
                            <div className="text-errors">
                              {form.errors.description}
                            </div>
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

export default AddProduct;
