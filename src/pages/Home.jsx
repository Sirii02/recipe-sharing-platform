import React from "react";

function Home() {
    return (
        <div className="container mt-4 text-center">
            <h1 className="display-4">Welcome to Recipe Sharing Platform</h1>
            <p className="lead">Discover and share delicious recipes with the community!</p>
            <div id="carouselExampleFade" class="carousel slide carousel-fade" style={{ maxWidth: "1100px", margin: "auto" }}>
                <div class="carousel-inner">
                    <div class="carousel-item active" style={{ height: "700px", objectFit: "cover" }}>
                        <img src="https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4117-feature.jpg" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item" style={{ height: "700px", objectFit: "cover" }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vada_Pav-Indian_street_food.JPG/640px-Vada_Pav-Indian_street_food.JPG" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item" style={{ height: "700px", objectFit: "cover" }}>
                        <img src="https://www.recipesaresimple.com/wp-content/uploads/2018/06/Kozhikodan-Biriyani-youtube.jpeg" class="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Home;
