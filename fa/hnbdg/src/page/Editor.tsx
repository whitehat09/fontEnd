import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addNewArticle,
  getCurrentUser,
  getSpecificArticle,
  updateArticle,
} from "../features/articles/articleSlice";
import * as Yup from "yup";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { useHistory, useParams } from "react-router-dom";
import { ParamType } from "./Article";
import { Editor } from "@tinymce/tinymce-react";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const EditorComponent = () => {
  const { isLogin } = useAppSelector((state: RootState) => state.login);
  const { specificArticle, currentUser } = useAppSelector(
    (state: RootState) => state.articleReducer
  );
  const dispatch = useDispatch();
  const { article_slug } = useParams<ParamType>();
  const history = useHistory();

  useEffect(() => {
    if (!isLogin) {
      history.push("/login");
    } else {
      dispatch({
        type: getCurrentUser.type,
      });
      if (article_slug) {
        dispatch({
          type: getSpecificArticle.type,
          payload: article_slug,
        });
      }
    }
  }, [history, isLogin, article_slug, dispatch]);

  const { title, description, body, tagList, slug } = specificArticle;

  let initialValues: any = {
    title: "",
    description: "",
    body: "",
    tagList: [] as string[],
  };

  if (article_slug) {
    initialValues = {
      title: title || "",
      description: description || "",
      body: body || "",
      tagList: tagList || ([] as string[]),
      slug: slug || "",
    };
  }

  const handleSubmit = (values: any, actions: any) => {
    const { title, description, body, tagList } = values;
    const data = { article: { title, description, body, tagList } };

    if (article_slug) {
      dispatch({
        type: updateArticle.type,
        payload: { article: values },
      });
    } else {
      dispatch({
        type: addNewArticle.type,
        payload: data,
      });
    }
    actions.resetForm();
    setTimeout(() => {
      history.push(`/profile/${currentUser.username}`);
    }, 1000);
  };

  const preventEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleAddTag = (push: any, e: any) => {
    if (e.key === "Enter") {
      push(e.target.value);
      e.target.value = "";
    }
  };
  const editorRef = useRef<any>(null);

  return (
    <div>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(props) => (
                  <Form onKeyPress={preventEnter}>
                    <div className="form-group">
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Article Title"
                        className="form-control"
                      />
                    </div>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="title" />
                    </div>
                    <div className="form-group">
                      <Field
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Write your article"
                        className="form-control"
                      />
                    </div>
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="description" />
                    </div>
                    <Editor
                      apiKey="8dnz21e4a9eovwdg61omqsv23m5ledzxdwwvbq3ai6t1ik7b"
                      initialValue={
                        article_slug && specificArticle.body ? specificArticle?.body : "<p></p>"
                      }
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                      onEditorChange={(e) => {
                        props.handleChange({
                          target: { name: "body", value: e },
                        });
                      }}
                    />
                    <div style={{ color: "red" }}>
                      <ErrorMessage name="body" />
                    </div>

                    <div>
                      <FieldArray name="tagList">
                        {({ remove, push }) => (
                          <div>
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter tags"
                                onKeyPress={(e) => handleAddTag(push, e)}
                              />
                            </div>
                            {props.values.tagList?.map(
                              (tag: any, index: any) => (
                                <div
                                  key={index}
                                  style={{
                                    display: "inline-block",
                                    background: "gray",
                                    color: "#fff",
                                    paddingLeft: "4px",
                                    marginRight: "10px",
                                  }}
                                >
                                  <span>{tag}</span>
                                  <button
                                    type="button"
                                    style={{
                                      background: "#fff",
                                      color: "#333",
                                    }}
                                    onClick={() => remove(index)}
                                  >
                                    x
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </FieldArray>
                    </div>
                    <button
                      className="btn btn-lg pull-xs-right btn-primary"
                      type="submit"
                    >
                      Publish Article
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorComponent;
