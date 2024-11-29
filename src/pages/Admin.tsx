import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { API, graphqlOperation, Storage } from "aws-amplify";
// import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
// import { createBook } from "../api/mutations";
// import config from "../aws-exports";

// const {
//     aws_user_files_s3_bucket_region: region,
//     aws_user_files_s3_bucket: bucket
// } = config;

type BookDetails = {
  title: string;
  description: string;
  image: string;
  author: string;
  price: string;
  featured?: boolean;
};

const Admin: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    title: "",
    description: "",
    image: "",
    author: "",
    price: "",
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!bookDetails.title || !bookDetails.price) return;
      // await API.graphql(graphqlOperation(createBook, { input: bookDetails }));
      setBookDetails({
        title: "",
        description: "",
        image: "",
        author: "",
        price: "",
        featured: false,
      });
    } catch (err) {
      console.error("Error creating book:", err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const extension = file.name.split(".").pop();
    const name = file.name.split(".")[0];
    const key = `images/${uuidv4()}${name}.${extension}`;
    // const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;

    try {
      // Upload the file to s3 with public access level.
      // await Storage.put(key, file, {
      //   level: "public",
      //   contentType: file.type,
      // });
      // Retrieve the uploaded file to display
      // const imageUrl = await Storage.get(key, { level: "public" });
      // setImage(imageUrl);
      // setBookDetails({ ...bookDetails, image: url });
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <section className="admin-wrapper">
      {/* <AmplifyAuthenticator> */}
      <section>
        <header className="form-header">
          <h3>Add New Book</h3>
          {/* <AmplifySignOut></AmplifySignOut> */}
        </header>
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <div className="form-image">
            {image ? (
              <img className="image-preview" src={image} alt="Preview" />
            ) : (
              <input
                type="file"
                accept="image/jpg"
                onChange={(e) => handleImageUpload(e)}
              />
            )}
          </div>
          <div className="form-fields">
            <div className="title-form">
              <p>
                <label htmlFor="title">Title</label>
              </p>
              <p>
                <input
                  name="title"
                  type="text"
                  placeholder="Type the title"
                  value={bookDetails.title}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, title: e.target.value })
                  }
                  required
                />
              </p>
            </div>
            <div className="description-form">
              <p>
                <label htmlFor="description">Description</label>
              </p>
              <p>
                <textarea
                  name="description"
                  rows={8}
                  placeholder="Type the description of the book"
                  value={bookDetails.description}
                  onChange={(e) =>
                    setBookDetails({
                      ...bookDetails,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </p>
            </div>
            <div className="author-form">
              <p>
                <label htmlFor="author">Author</label>
              </p>
              <p>
                <input
                  name="author"
                  type="text"
                  placeholder="Type the author's name"
                  value={bookDetails.author}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, author: e.target.value })
                  }
                  required
                />
              </p>
            </div>
            <div className="price-form">
              <p>
                <label htmlFor="price">Price ($)</label>
              </p>
              <p>
                <input
                  name="price"
                  type="text"
                  placeholder="What is the price of the book (USD)"
                  value={bookDetails.price}
                  onChange={(e) =>
                    setBookDetails({ ...bookDetails, price: e.target.value })
                  }
                  required
                />
              </p>
            </div>
            <div className="featured-form">
              <p>
                <label>Featured?</label>
                <input
                  type="checkbox"
                  className="featured-checkbox"
                  checked={bookDetails.featured}
                  onChange={() =>
                    setBookDetails({
                      ...bookDetails,
                      featured: !bookDetails.featured,
                    })
                  }
                />
              </p>
            </div>
            <div className="submit-form">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
      {/* </AmplifyAuthenticator> */}
    </section>
  );
};

export default Admin;
