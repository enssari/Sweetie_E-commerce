import React, { useEffect, useState } from "react";
import basket from '../assets/basket.png';
import close from '../assets/icons8-close.svg';

export const Hero = () => {
  const [amounts, setAmounts] = useState([]);
  const [sweets, setSweets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [input, setInput] = useState("");
  const [resetProducts, setResetProducts] = useState(false);
  const [productBasket, setProductBasket] = useState([]);
  const [shopClicked, setShopClicked] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, input, resetProducts]);

  const fetchProducts = () => {
    let apiUrl = "/api/sweets";

    if (selectedCategory) {
      apiUrl += `?category=${selectedCategory}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setAmounts(new Array(data.length).fill(1));
        setSweets(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const addAmount = (index) => {
    if (amounts[index] < 100) {
      const newAmounts = [...amounts];
      newAmounts[index] += 1;
      setAmounts(newAmounts);
    }
  };
  const decreaseAmount = (index) => {
    if (amounts[index] > 0) {
      const newAmounts = [...amounts];
      newAmounts[index] -= 1;
      setAmounts(newAmounts);
    }
  };
  
  const addToBasket = (sweet, index) => {
    const updatedBasket = [...productBasket];
    const existingProductIndex = updatedBasket.findIndex((prod) => prod.id === sweet.id);

    if (existingProductIndex !== -1) {
      // If the product is already in the basket, update its quantity
      updatedBasket[existingProductIndex].quantity += amounts[index];
    } else {
      // If the product is not in the basket, add it
      updatedBasket.push({
        id: sweet.id,
        name: sweet.name,
        image: sweet.image,
        price: sweet.price,
        quantity: amounts[index],
      });
    }

    setProductBasket(updatedBasket);
  };


  const removeProductFromBasket = (index) => {
    const updatedBasket = [...productBasket];
    updatedBasket.splice(index, 1);
    setProductBasket(updatedBasket);
  };

  const toggleCategory = (category) => {
    setSelectedCategory(category);
    setInput("");
    fetchProducts();
    setResetProducts(false);
  };

  const product = sweets
    .filter((sweet) => {
      if (resetProducts) {
        return true;
      }

      return (
        !selectedCategory ||
        sweet.category === selectedCategory ||
        input === sweet.category
      );
    })

    .map((sweet, index) => {

      const totalPrice = amounts[index] > 0 ? sweet.price * amounts[index] : sweet.price;
      const formattedPrice = parseFloat(totalPrice).toFixed(2);

      return (
        <>
          <div
            className="flex flex-col items-center justify-center mt-[3rem]
                  lg:mt-0"
            id="products"
          >
            <div
              className="rounded-sm shadow-2xl border-black border-solid border-[1px] w-[23rem]
                    lg:w-[16rem]"
              id="product"
            >
              <div id="product-image">
                <img
                  src={`${sweet.image}`}
                  alt={sweet.name}
                  className="w-full h-[18.5rem] lg:h-[12rem]"
                />
              </div>

              <div
                className="rounded-md tracking-wider text-center"
                id="product-name"
              >
                <h1 className="font-medium text-black tracking-tighter">
                  {sweet.name}
                </h1>
              </div>

              <div className="justify-center flex" id="add-to-basket">
                <button
                  onClick={() => addToBasket(sweet, index)}
                  className="bg-gradient-to-r py-5 p-3 text-white
                            font-bold w-full border-solid border-[1px] border-green-700
                            text-[1.2rem] from-green-300 to-green-500 hover:from-green-400
                            hover:to-green-600 duration-200"
                >
                  Add to basket
                </button>
              </div>
            </div>

            <div
              className="flex flex-row justify-between pt-3 space-x-12"
              id="amount-buttons"
            >
              <div className="flex items-center" id="decrease">
                <button
                  onClick={() => {
                    decreaseAmount(index);
                  }}
                  className="border-solid border-2 border-yellow-200 text-[2rem]
                            w-[4rem] h-[3.5rem] rounded-md text-white font-bold bg-softorange
                            hover:bg-orange-400 duration-200"
                >
                  -
                </button>
              </div>

              <div id="amount-text">
                <h1 className="font-mono">{amounts[index]}</h1>
              </div>

              <div className="flex items-center" id="add">
                <button
                  onClick={() => {
                    addAmount(index);
                  }}
                  className="border-solid border-2 border-yellow-200 text-[2rem]
                            w-[4rem] h-[3.5rem] rounded-md text-white font-bold bg-softorange
                            hover:bg-orange-400 duration-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="" id="price">
              <h1 className="text-white tracking-widest font-bold">
                {formattedPrice}$
              </h1>
            </div>
          </div>

          <hr className="w-full font-bold opacity-[60%] lg:hidden" />
        </>
      );
    });

    const categories = [
      "Cake",
      "Syrupy",
      "Cookie",
      "Chocolate",
      "Brownie",
      "Lollipop",
    ];

    const categoryButtons = () => {
      return (
        <div
          className="space-x-5 flex flex-row lg:flex-col lg:space-x-0
        lg:space-y-12 lg:items-start"
          id="category-buttons"
        >
          {categories.map((category) => (
            <button
              onClick={() => {
                toggleCategory(category);
              }}
              key={category}
              className="hover:text-yellow-200 font-medium lg:border-r-softorange
            lg:border-b-white lg:border-b-solid lg:border-b-2 lg:pb-2
            lg:rounded-lg text-white"
            >
              {category}
            </button>
          ))}
        </div>
      );
    };

    return (
      <div id="hero-container">
        <div className="flex flex-col justify-center items-center" id="hero-content">
          <div 
          className={`bg-white absolute w-full top-0 ${shopClicked ? 'opacity-100 h-auto' :
          'opacity-0 pointer-events-none h-[1rem]'} duration-500`}
          id="shopping-menu">
              <div className="p-5" id="shopping-content">
                  <div className="flex items-end flex-col" id="close-menu">
                      <button
                      className='hover:animate-pulse'
                      onClick={() => setShopClicked(false)}>
                          <img src={close} alt="close" />
                      </button>
                  </div>

                  <div className="mt-7 pb-6" id="products">
                    <ul className="w-[28rem] md:w-[35rem] md:space-y-7 lg:w-[45rem] m-auto">
                      {productBasket.map((prod, index) => {
                        return(
                          <ul 
                          key={index}
                          className="flex flex-row border-solid border-[1px] border-[#dddddd] p-2
                          shadow-lg lg:pb-4 justify-between">
                            <div className="flex flex-row space-x-5" id="left-side-basket">
                              <div 
                              className="flex items-center font-bold border-solid border-[1px] border-black
                              h-[1.5rem] p-2 mt-[1.8rem] lg:p-4"
                              id="prod-amount">
                                {prod.quantity}
                              </div>

                              <div className="flex justify-center items-center" id="product-image">
                                <img src={prod.image} alt={prod.name} className="w-[4rem] lg:w-[6rem]"/>
                              </div>
                            
                              <div className="flex items-center font-mono" id="prod-name">
                                {prod.name}
                              </div>

                              <div className="relative md:left-[5rem]" id="prod-price">
                                <h1 className="text-green-400 font-medium">
                                  {prod.price * prod.quantity}$
                                </h1>
                              </div>
                            </div>

                            <div className="flex items-center" id="right-side-basket">
                              <div className="flex items-center relative md:left-[8rem] lg:left-[14rem]"
                              id="delete-product">
                                <button
                                onClick={() => removeProductFromBasket(index)}>
                                  <img src={close} alt="delete-p" />
                                </button>
                              </div>
                            </div>
                          </ul>
                        )
                      })}
                    </ul>
                  </div>
              </div>
          </div>

          <div 
          className="items-center justify-center flex mt-8 md:mt-10
          duration-75 hover:border-b-solid hover:border-b-[2px] 
          hover:border-b-white h-[5rem] sm:h-[6rem] md:h-[8.5rem]"
          id="basket">
            <button
            onClick={() => setShopClicked(!shopClicked)}>
              <img src={basket} alt="basket" 
              className="w-[4rem] sm:w-[5rem] md:w-[7rem] object-cover
              hover:animate-pulse"/>
            </button>
          </div>

          <div className="flex justify-center p-10 xl:p-[5rem]" id="searchbar">
            <input
              type="text"
              onChange={(input) => {
                const categoryInput =
                  input.target.value.charAt(0).toUpperCase() +
                  input.target.value.slice(1);

                const isCategoryMatch = categories.includes(categoryInput);

                setSelectedCategory(isCategoryMatch ? categoryInput : "");
                setResetProducts(!isCategoryMatch);
                setInput(categoryInput);
              }}
              value={input}
              className="focus:outline-none w-[25rem] h-[3rem] pl-5
                  border-solid border-[1px] border-black rounded-md
                  shadow-md shadow-softorange focus:border-[2px]
                  duration-100 hover:shadow-lg hover:shadow-softorange
                  sm:w-[35rem] sm:h-[4rem] lg:w-[40rem] xl:h-[5rem]"
              placeholder="Search for sweets"
            />
          </div>

          <div
            className="lg:flex lg:flex-row lg:pt-[5rem] xl:pt-0 w-full"
            id="product-container"
          >
            <div
              className="bg-gradient-to-r from-orange-400 to-softorange 
                  lg:w-[20rem] lg:rounded-sm pb-8"
              id="category-select-wrapper"
            >
              <ul className="px-4 py-2 w-full sm:w-[35rem] md:w-[45rem] lg:w-auto m-auto">
                <div className="" id="header">
                  <h1 className="font-mono font-bold text-yellow-300 md:text-[2.1rem]">
                    Categories
                  </h1>
                </div>

                <hr className="opacity-[70%]" />
                <br />

                <li>{categoryButtons()}</li>
              </ul>
            </div>

            <div
              className="lg:grid lg:grid-cols-2 xl:grid-cols-3 
            lg:w-[40rem] xl:w-[55rem] m-auto 2xl:w-[80rem]"
              id="product-wrapper"
            >
              {product}
            </div>
          </div>
        </div>
      </div>
    );
  };

