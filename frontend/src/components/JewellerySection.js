import React from "react";
import { useNavigate } from "react-router-dom";
import "./JewellerySection.css";

function JewellerySection() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Rings",
      image:
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Necklaces",
      image:
        // "https://images.unsplash.com/photo-1685970731571-72ede0cb26ea?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1676329945867-01c9975aa9d1?q=80&w=933&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Earrings",
      image:
        "https://images.unsplash.com/photo-1693212793204-bcea856c75fe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWFycmluZ3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Bracelets",
      image:
        // "https://images.unsplash.com/photo-1629890731335-52295b8be1d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

        "https://images.unsplash.com/photo-1689743801114-230453abfceb?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Jewellery Sets",
      image:
        "https://rukminim1.flixcart.com/image/1532/1532/xif0q/jewellery-set/w/g/x/-original-imahfskt5swwr4z7.jpeg?q=90",
    },
    {
      name: "Pendant",
      image:
        "https://images.unsplash.com/photo-1705326452390-3ecf6070595f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Anklets",
      image:
        "https://rukminim2.flixcart.com/image/1528/1528/xif0q/anklet/l/e/a/na-na-2-gold-plated-payal-anklets-indian-traditional-ethnic-original-imahe5mdkjhyzxfe.jpeg?q=90",
    },
    {
      name: "Bangles",
      image:
        "https://images.unsplash.com/photo-1679156271456-d6068c543ee7?q=80&w=711&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="jewellery-section">
      <h2>Shop by Categories</h2>

      <div className="jewellery-grid">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="jewellery-card"
            onClick={() => navigate(`/category/${cat.name}`)}
          >
            <div className="jewellery-section-img">
              <img src={cat.image} alt={cat.name} />
            </div>

            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JewellerySection;
