import React, {useState,useEffect,} from "react";
import "./style/main.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./components/RatingStars";
import ShoppingCart from "./components/ShoppingCart";

const products = [
	{
		id: 1,
		name: "CHICKEN MAGGI",
		rating: 4.3,
		price: 410,
		image: require("./assets/images/1.jpg"),
	},
	{
		id: 2,
		name: "GRILLED CHICKEN WINGS",
		rating: 4.2,
		price: 229,
		image: require("./assets/images/2.jpg"),
	},
	{
		id: 3,
		name: "BAKED CHICKEN WINGS",
		rating: 3.2,
		price: 200,
		image: require("./assets/images/3.jpg"),
	},
	{
		id: 4,
		name: "CRISPY FRIED CHICKEN LEGS",
		rating: 4.8,
		price: 150,
		image: require("./assets/images/4.jpg"),
	},
	{
		id: 5,
		name: "CHICKEN NUGGETS",
		rating: 4.5,
		price: 99,
		image: require("./assets/images/5.jpg"),
	},
	{
		id: 6,
		name: "PEPPER CHICKEN WINGS",
		rating: 3.8,
		price: 180,
		image: require("./assets/images/6.jpg"),
	},
  {
		id: 7,
		name: "CHICKEN MEATBALLS",
		rating: 4.3,
		price: 199,
		image: require("./assets/images/7.jpg"),
	},
	{
		id: 8,
		name: "RED CHILLI MEATBALLS",
		rating: 4.2,
		price: 240,
		image: require("./assets/images/8.jpg"),
	},
	{
		id: 9,
		name: "RICE WITH FRIED CHICKEN",
		rating: 3.2,
		price: 200,
		image: require("./assets/images/9.jpg"),
	},
	{
		id: 10,
		name: "CHICKEN NOODLES",
		rating: 4.8,
		price: 119,
		image: require("./assets/images/10.jpg"),
	},
	{
		id: 11,
		name: "COCA COLA",
		rating: 4.5,
		price: 40,
		image: require("./assets/images/11.jpg"),
	},
	{
		id: 12,
		name: "FRESH JUICE",
		rating: 3.8,
		price: 80,
		image: require("./assets/images/12.jpg"),
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] =
		useState(false);
	const [productsInCart, setProducts] =
		useState(
			JSON.parse(
				localStorage.getItem(
					"shopping-cart"
				)
			) || []
		);
	useEffect(() => {
		localStorage.setItem(
			"shopping-cart",
			JSON.stringify(productsInCart)
		);
	}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {...product,count: 1,};
		setProducts([...productsInCart,newProduct,]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =oldState.findIndex((item) =>
						item.id === productId);
			if (productsIndex !== -1) {oldState[productsIndex].count =count;}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<h3 className="logo">Logo</h3>
				<button
					className="btn shopping-cart-btn"
					onClick={() =>
						setCartVisible(true)
					}>
					<GiShoppingBag size={24} />
					{productsInCart.length >
						0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
									product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p>
								{
									product.description
								}
							</p>
							<span className="product-price">
								RS : {product.price}
							</span>
							<div className="buttons">
								<button className="btn">
									Detail
								</button>
								<button
									className="btn"
									onClick={() =>
										addProductToCart(
											product
										)
									}>
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;
