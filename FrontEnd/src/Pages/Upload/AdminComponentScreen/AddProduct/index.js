import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddProduct() {
  const navigate = useNavigate();

  const [txtname, setName] = useState("");
  const [txtdescription, setdescription] = useState("");
  const [txtprice, setprice] = useState("");
  const [txtdiscount, setdiscount] = useState("");
  const [txtsize, setsize] = useState("");
  // const [txtcolor, setcolor] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [txtstock, setstock] = useState("");
  const [fileimage, setPhoto] = useState("");
  const [fileimagedetails, setPhotoDetails] = useState([]); // Thay đổi thành một mảng để chứa nhiều ảnh
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  const uploadProduct = async () => {
    const formData = new FormData();
    formData.append("name", txtname);
    formData.append("description", txtdescription);
    formData.append("image", fileimage);

    fileimagedetails.forEach((image, index) => {
      formData.append(`imagedetails[${index}]`, image);
    });
    formData.append("price", txtprice);
    formData.append("size", txtsize);
    formData.append("color", selectedColor);
    formData.append("stock", txtstock);
    formData.append("discount", txtdiscount);

    const response = await axios.post("http://127.0.0.1:8000/api/products", formData, {
      withCredentials: false,
      headers: { "Content-Type": "multipart/form-data", "X-CSRF-TOKEN": csrfToken },
    });

    if (response) {
      setMessage(response.message); //"message": "Product successfully created."
      setTimeout(() => {
        navigate("/upload");
      }, 100);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadProduct();
  };

  // Xử lý khi người dùng chọn nhiều ảnh
  const handleImageDetailsChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setPhotoDetails(selectedImages);
  };

  useEffect(() => {
    // Fetch CSRF token from the meta tag
    const metaCsrfToken = document.head.querySelector('meta[name="csrf-token"]');
    if (metaCsrfToken) {
      setCsrfToken(metaCsrfToken.content);
    }
  }, []);
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-4">
            <h5 className="mb-4">Add Product </h5>
            <p className="text-warning">{message}</p>

            <form onSubmit={handleSubmit}>
              {csrfToken && <input type="hidden" name="_token" value={csrfToken} />}
              <div className="mb-3 row">
                <label className="col-sm-3">Product Title </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name product"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3">Descriptionss </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setdescription(e.target.value)}
                    placeholder="Describe your product"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3">Price</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setprice(e.target.value)}
                    placeholder="$"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3">Discount</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setdiscount(e.target.value)}
                    placeholder="%"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3">Size</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setsize(e.target.value)}
                    placeholder="Size"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3">Stock</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setstock(e.target.value)}
                    placeholder="stock"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3">color</label>
                <div className="col-sm-9 color-picker" >
                  <input
                    type="color"
                    className="form-control"
                    onChange={(e) => setSelectedColor(e.target.value)}
                    placeholder="color"
                  />
                  <div className="color-indicator" style={{ backgroundColor: selectedColor }}></div>
                </div>
              </div>

              
              <div className="mb-3 row">
                <label className="col-sm-3">Product Image</label>
                <div className="col-sm-9">
                  <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3">Product imagedetails</label>
                <div className="col-sm-9">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageDetailsChange}
                    multiple
                    placeholder="Select up to 4 photos"
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3"></label>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddProduct;
