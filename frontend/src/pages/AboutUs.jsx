import React from 'react';

function AboutUs() {
    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h1 className="text-center mb-4">About Us</h1>
                
                <p className="text-center">
                    Welcome to <strong>Recipe Sharing Platform</strong>, a place where food enthusiasts can come together
                    to share their favorite recipes, explore new ones, and inspire others with their culinary creations.
                </p>

                <h4 className="mt-4">Our Mission</h4>
                <p>
                    Our mission is to provide a community-driven platform where anyone, from beginners to experts, can 
                    discover, share, and learn new recipes. We aim to bring people closer through the love of food and cooking.
                </p>

                <h4>Why Choose Us?</h4>
                <ul className="list-group">
                    <li className="list-group-item">A vast collection of diverse recipes.</li>
                    <li className="list-group-item">Simple and user-friendly interface.</li>
                    <li className="list-group-item">Community-driven with reviews and ratings.</li>
                    <li className="list-group-item">Access to a global network of food lovers.</li>
                </ul>

                <h4 className="mt-4">Get Involved</h4>
                <p>
                    Whether you're a novice in the kitchen or a seasoned chef, we invite you to contribute by sharing your own 
                    recipes and cooking tips. Join the Recipe Sharing Platform today and be a part of our growing community!
                </p>

                <p className="text-muted text-center mt-4">
                    <strong>Contact Us:</strong> If you have any questions or suggestions, feel free to reach out at 
                    <a href="mailto:contact@recipes.com"> contact@recipes.com</a>.
                </p>
            </div>
        </div>
    );
}

export default AboutUs;
