import './App.css';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedIcons, setSelectedIcons] = useState([false, false, false, false, false]);
  const [showMap, setShowMap] = useState(false); 
  const [mapCenter, setMapCenter] = useState([43.6426, -79.3871]);
  const [reviewInput, setReviewInput] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);

  const handleIconClick = (index) => {
    const newSelectedIcons = [...selectedIcons];
    newSelectedIcons[index] = !newSelectedIcons[index];
    setSelectedIcons(newSelectedIcons);
  };

  const handleContinueClick = () => {
    setShowMap(true); 
    const newSelectedIcons = [...selectedIcons];
    if (newSelectedIcons[3]) { 
      newSelectedIcons[2] = true; 
      newSelectedIcons[4] = false; 
    } else if (newSelectedIcons[2]) { 
      newSelectedIcons[4] = true; 
    }
    setSelectedIcons(newSelectedIcons);
  };

  const iconNames = [
    'gluten-free',
    'nut-free',
    'vegetarian',
    'vegan',
    'pescatarian',
  ];
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const data = [
      {
        "restaurant_id": 1,
        "name": "MERK",
        "address": "189 Ottawa St N Hamilton, ON L8H 3Z4 Canada",
        "position": [
            43.24788,
            -79.81788
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Korean Fried Chicken', dietaryAttributes: [true, false, false, false, false]},
          {name: 'Sprouts', dietaryAttributes: [true, false, true, false, true]}
        ]
    },
    {
        "restaurant_id": 2,
        "name": "Das Schnitzelhaus",
        "address": "131 Ottawa Street N Hamilton, ON L8L 1Y5 Canada",
        "position": [
            43.2462118,
            -79.8184547
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Hungarian Goulash Soup', dietaryAttributes: [true, true, false, false, false]},
          {name: 'Small Vienna', dietaryAttributes: [false, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 3,
        "name": "Caro Restaurant and Bar",
        "address": "4 Ottawa Street N Hamilton, ON L8H 3Y7 Canada",
        "position": [
            43.242741,
            -79.819429
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Margherita Pizza', dietaryAttributes: [false, true, true, false, true]}
        ]
    },
    {
        "restaurant_id": 4,
        "name": "Hambrgr Ottawa Street",
        "address": "207 Ottawa Street N Hamilton, ON L8H 3Z4 Canada",
        "position": [
            43.24838,
            -79.81775
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'The O.G. Poutine', dietaryAttributes: [false, true, true, false, true]},
          {name: 'The Biggie Mac', dietaryAttributes: [false, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 5,
        "name": "Pizzaiolo",
        "address": "191 Ottawa Street N Hamilton, ON L8H 3Z4 Canada",
        "position": [
            43.247981,
            -79.817793
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Cheese Pizza', dietaryAttributes: [false, true, true, false, true]},
          {name: 'Honolulu Pizza', dietaryAttributes: [false, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 6,
        "name": "The Ship",
        "address": "23 Augusta Street Hamilton, ON L8N 1P6 Canada",
        "position": [
            43.25215,
            -79.87
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Duck Wings', dietaryAttributes: [true, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 7,
        "name": "Shawarma And Grill",
        "address": "1010 King Street E Hamilton, ON L8M 1C8 Canada",
        "position": [
            43.250243,
            -79.833364
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Falafel', dietaryAttributes: [false, true, true, true, true]},
          {name: 'Chicken Shwarma', dietaryAttributes: [false, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 8,
        "name": "Cannon Coffee",
        "address": "180 Ottawa Street N Hamilton, ON L8H 3Z3 Canada",
        "position": [
            43.2474063,
            -79.8175491
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Brownie', dietaryAttributes: [true, false, true, false, true]},
          {name: 'Affogato', dietaryAttributes: [true, true, true, false, true]}
        ]
    },
    {
        "restaurant_id": 9,
        "name": "Maipai",
        "address": "631 Barton Street E Hamilton, ON L8L 3A1 Canada",
        "position": [
            43.25726,
            -79.83817
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Korean-inspired Buffalo Wings', dietaryAttributes: [false, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 10,
        "name": "The Hearty Hooligan",
        "address": "292 Ottawa Street N Hamilton, ON L8H 3Z9 Canada",
        "position": [
            43.2502413562309,
            -79.8164660856128
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Chopped Cheese Sandwich', dietaryAttributes: [false, true, true, false, true]}
        ]
    },
    {
        "restaurant_id": 11,
        "name": "541 Eatery & Exchange",
        "address": "541 Barton Street E Hamilton, ON L8L 2Z2 Canada",
        "position": [
            43.2582480392112,
            -79.842354356135
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Roasted Potatoes', dietaryAttributes: [true, true, true, true, true]}
        ]
    },
    {
        "restaurant_id": 12,
        "name": "Purple Pear",
        "address": "946 Barton Street E Hamilton, ON L8E 5H3 Canada",
        "position": [
            43.2530719,
            -79.8232905
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Rib Eye Steak', dietaryAttributes: [true, true, false, false, false]},
          {name: 'Vegetarian Curry', dietaryAttributes: [false, true, true, false, true]}
        ]
    },
    {
        "restaurant_id": 13,
        "name": "Boardwalk Cheesesteaks",
        "address": "131 Ottawa Street North Hamilton, ON L8L 1Y5 Canada",
        "position": [
            43.246309,
            -79.818385
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Boardwalk Original', dietaryAttributes: [false, true, false, false, false]},
          {name: 'Boardwalk Mac n Cheese', dietaryAttributes: [false, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 14,
        "name": "Crown & Press",
        "address": "303 Ottawa Street N Hamilton, ON L8H 3Z8 Canada",
        "position": [
            43.250742261944495,
            -79.8168618391281
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Planted Vegan Falafel Wrap', dietaryAttributes: [true, true, true, true, true]},
          {name: 'Butter Croissant', dietaryAttributes: [false, true, true, false, true]}
        ]
    },
    {
        "restaurant_id": 15,
        "name": "El Grito Mexicano",
        "address": "236 James Street N Hamilton, ON L8R 2L3 Canada",
        "position": [
            43.26260029055808,
            -79.8662367
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Tinga Taco', dietaryAttributes: [false, true, false, false, false]},
          {name: 'Vegetarian Quesadilla', dietaryAttributes: [false, true, true, false, true]}
        ]
    },
    {
        "restaurant_id": 16,
        "name": "The Standard",
        "address": "10 James Street N Hamilton, ON L8R 2J9 Canada",
        "position": [
            43.25707698556034,
            -79.8686649
        ],
        "hasMenu": true,
        "menuItems": [
          {name: "Ahi Tuna + Cucumber Crudo", dietaryAttributes: [false, true, false, false, true]}
        ]
    },
    {
        "restaurant_id": 17,
        "name": "Hotties Smashburger",
        "address": "657 Barton Street E Hamilton, ON L8L 3A3 Canada",
        "position": [
            43.2569083205337,
            -79.8370677
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 18,
        "name": "Hammerhead's On Ottawa",
        "address": "80 Ottawa Street N Hamilton, ON L8H 3Z1 Canada",
        "position": [
            43.24474,
            -79.81852
        ],
        "hasMenu": true,
        "menuItems": [
          {name: "Fried fish and chips", dietaryAttributes: [false, true, false, false, true]}
        ]
    },
    {
        "restaurant_id": 19,
        "name": "Bardō Locke Street",
        "address": "258 Locke Street S Hamilton, ON L8P 4B9 Canada",
        "position": [
            43.25287960000001,
            -79.8869319898459
        ],
        "hasMenu": true,
        "menuItems": [
          {name: "French Fries", dietaryAttributes: [true, true, true, true, true]},
          {name: "Chicken Curry", dietaryAttributes: [true, false, false, false, false]}
        ]
    },
    {
        "restaurant_id": 20,
        "name": "Spencer's at the Waterfront",
        "address": "1340 Lakeshore Rd Burlington, ON L7S 1B1 Canada",
        "position": [
            43.3200156696798,
            -79.800730282846
        ],
        "hasMenu": true,
        "menuItems": [
          {name: "Oysters", dietaryAttributes: [true, true, false, false, true]}
        ]
    },
    {
        "restaurant_id": 21,
        "name": "Bon Temps",
        "address": "61 Young Street Hamilton, ON L8N 1V1 Canada",
        "position": [
            43.25088,
            -79.86872
        ],
        "hasMenu": true,
        "menuItems": [
          {name: "Frog Legs", dietaryAttributes: [true, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 22,
        "name": "Shawarma Royale Plus",
        "address": "114 York Blvd Hamilton, ON L8R 1R6 Canada",
        "position": [
            43.260103,
            -79.872464
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Falafel', dietaryAttributes: [false, true, true, true, true]},
          {name: 'Chicken Shwarma', dietaryAttributes: [false, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 23,
        "name": "Wildcat",
        "address": "353 Barton Street E Hamilton, ON L8L 2X8 Canada",
        "position": [
            43.26036882056457,
            -79.85036727116393
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 24,
        "name": "Ellis Kitchen",
        "address": "148 Ottawa Street N Hamilton, ON L8H 3Z3 Canada",
        "position": [
            43.24665396751856,
            -79.81787567116335
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Beef Patty', dietaryAttributes: [false, true, false, false, false]}
        ]
    },
    {
        "restaurant_id": 25,
        "name": "Breezy Corners Hamilton",
        "address": "1145 Main Street E Hamilton, ON L8M 1P3 Canada",
        "position": [
            43.2431531544495,
            -79.8216541483998
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Egg Omelet', dietaryAttributes: [true, true, true, false, true]}
        ]
    },
    {
        "restaurant_id": 26,
        "name": "Mehfill Indian Cuisine",
        "address": "135 King William Street Hamilton, ON L8R 1H8 Canada",
        "position": [
            43.2563399,
            -79.8638957
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Chana Masala', dietaryAttributes: [true, true, true, true, true]}
        ]
    },
    {
        "restaurant_id": 27,
        "name": "Conversate Steak & Seafood",
        "address": "38 King William Street Hamilton, ON L8R 1A1 Canada",
        "position": [
            43.260372379181,
            -79.8461121358878
        ],
        "hasMenu": true,
        "menuItems": [
          {name: 'Steak', dietaryAttributes: [true, true, false, false, false]}

        ]
    },
    {
        "restaurant_id": 28,
        "name": "Homemade Noodles",
        "address": "135 King Street E Hamilton, ON L8N 1B2 Canada",
        "position": [
            43.2554837113039,
            -79.8649081215262
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 29,
        "name": "The Burnt Tongue",
        "address": "10 Cannon St E Hamilton, ON L8L 1Z5 Canada",
        "position": [
            43.2605786,
            -79.8669351
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 30,
        "name": "Charred Chicken",
        "address": "244 James Street N Hamilton, ON L8R 2L2 Canada",
        "position": [
            43.2627364,
            -79.8663839
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 31,
        "name": "Moxies",
        "address": "560 Centennial Pkwy N Hamilton, ON L8E 0G2 Canada",
        "position": [
            43.24413465984123,
            -79.75436891991411
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 32,
        "name": "Berkeley North",
        "address": "31 King William Street Hamilton, ON L8R 1A1 Canada",
        "position": [
            43.2574045478956,
            -79.8677145254958
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 33,
        "name": "Cowabunga",
        "address": "536 Upper Wellington Street Hamilton, ON L9A 3P5 Canada",
        "position": [
            43.239642,
            -79.866656
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 34,
        "name": "Mancala Monk Board Game Cafe",
        "address": "1229 Cannon Street E Hamilton, ON L8H 1T8 Canada",
        "position": [
            43.2475,
            -79.81656
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 35,
        "name": "BAB Korean Food & BBQ",
        "address": "387 Barton Street E Hamilton, ON L8L 2Y2 Canada",
        "position": [
            43.26012,
            -79.84875
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 36,
        "name": "Down The Street Food Co",
        "address": "205 Ottawa Street N Hamilton, ON L8H 3Z4 Canada",
        "position": [
            43.2482913,
            -79.81758271599351
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 37,
        "name": "Shorty's Pizza",
        "address": "1099 Cannon Street E Hamilton, ON L8L 2J6 Canada",
        "position": [
            43.2485677,
            -79.8215868
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 38,
        "name": "Gage Park Diner",
        "address": "975 Main Street E Hamilton, ON L8M 1N2 Canada",
        "position": [
            43.24506,
            -79.82929
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 39,
        "name": "Kohinoor Bistro",
        "address": "1443 Main Street E Hamilton, ON L8K 1C4 Canada",
        "position": [
            43.24030732938412,
            -79.8085219
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 40,
        "name": "Boom Scorch",
        "address": "187 King Street E Hamilton, ON L8N 1B3 Canada",
        "position": [
            43.255107,
            -79.863545
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 41,
        "name": "The Mule",
        "address": "41 King William Street Hamilton, ON L8R 1A2 Canada",
        "position": [
            43.25726,
            -79.86713
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 42,
        "name": "NoodleBox",
        "address": "1241 Barton Street E Unit Q8 Hamilton, ON L8H 2V4 Canada",
        "position": [
            43.25025,
            -79.81007
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 43,
        "name": "Born and Raised",
        "address": "224 James Street N Hamilton, ON L8R 2L3 Canada",
        "position": [
            43.26235,
            -79.86626
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 44,
        "name": "Ottawa Market",
        "address": "204 Ottawa St N Hamilton, ON L8H 3Z5 Canada",
        "position": [
            43.24803,
            -79.81718
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 45,
        "name": "Bernie’s Tavern",
        "address": "1101-1103 Cannon St E Hamilton, ON L8L 2J5 Canada",
        "position": [
            43.24857,
            -79.8213948
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 46,
        "name": "Hambrgr",
        "address": "49 King William Street Hamilton, ON L8R 1A2 Canada",
        "position": [
            43.25721,
            -79.8669
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 47,
        "name": "Khansama",
        "address": "1357 Main Street E Hamilton, ON L8K 1B6 Canada",
        "position": [
            43.2411024,
            -79.8120445
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 48,
        "name": "Pagoda Caribbean Cuisine",
        "address": "1247 Main Street E Hamilton, ON L8K 1A8 Canada",
        "position": [
            43.242007,
            -79.816356
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 49,
        "name": "Tacomex",
        "address": "162 King Street W Hamilton, ON L8P 1A5 Canada",
        "position": [
            43.25827,
            -79.87411
        ],
        "hasMenu": false,
        "menuItems": null
    },
    {
        "restaurant_id": 50,
        "name": "Menya Kyu",
        "address": "154 James Street S Hamilton, ON L8P 3A2 Canada",
        "position": [
            43.25218,
            -79.8714
        ],
        "hasMenu": false,
        "menuItems": null
    }
    ];
    setRestaurants(data);
  }, []);

  const getMarkerColor = (restaurant) => {
    if (!restaurant.hasMenu) {
      return 'gray';
    }
    const selectedRestrictions = selectedIcons.map((isSelected, index) => isSelected);
    const allDietaryRestrictionsMet = restaurant.menuItems.some((item) =>
      selectedRestrictions.every((restriction, index) => !restriction || item.dietaryAttributes[index])
    );

    return allDietaryRestrictionsMet ? 'green' : 'yellow';
  }

  const handleReviewClick = (event) => {
    event.stopPropagation();
    setIsReviewing(true); 
  };

  const handleReviewChange = (e) => {
    setReviewInput(e.target.value);
  };

  const handleReviewSubmit = () => {
    //Backend Implementation
    console.log('Review Submitted:', reviewInput);
    setReviewInput('');
    setIsReviewing(false); 
  };


  return (
    <div className='big_container'>
      <div className="header" id="header">
        <img src='/logo.png' alt='logo' className='logo'/>
        <h1>My Diet Map</h1>
      </div>

      <div className='centered-content'>
        {!showMap && (
          <>
            <div className='option_title' id='option_title'>
              <p>Dietary Restrictions</p>
            </div>
            <div className='restrictions' id='restrictions'>
              {iconNames.map((icon, index) => (
                <div
                  key={index}
                  className={`icon-container ${selectedIcons[index] ? 'selected' : ''}`}
                  onClick={() => handleIconClick(index)}
                >
                  <img
                    src={selectedIcons[index] ? `/${icon}-true.png` : `/${icon}-false.png`}
                    alt={icon}
                    className="icon"
                  />
                </div>
              ))}
            </div>
            <div className="button-container">
              <button className="continue-button" onClick={handleContinueClick}>Continue</button>
            </div>
          </>
        )}
        {showMap && (
          <div className="map-container">
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '90vh', width: '80vw' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {restaurants.map((restaurant) => {
                const markerColor = getMarkerColor(restaurant);
                return (
                  <Marker
                    key={restaurant.id}
                    position={restaurant.position} 
                    icon={new Icon({
                      iconUrl: markerColor+'.png', // Customize with actual marker colors
                      iconSize: [32, 32],
                    })}
                  >
                    <Popup>
                      <h3>{restaurant.name}</h3>
                      <p>{restaurant.address}</p>
                      {restaurant.hasMenu && restaurant.menuItems ? (
                        <>
                          <ul>
                            {restaurant.menuItems.map((item, index) => (
                              <li key={index}>
                                {item.name} - {iconNames.filter((_, i) => item.dietaryAttributes[i]).join(', ')}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p>No menu available</p>
                      )}
                      {!isReviewing && <button onClick={(e) => handleReviewClick(e)}>Review an Item</button>}
                      {isReviewing && (
                      <div>
                        <textarea
                          value={reviewInput}
                          onChange={handleReviewChange}
                          placeholder="Enter item name"
                          rows="1"
                          cols="20"
                        />
                        <div>
                          <button onClick={handleReviewSubmit}>Submit Review</button>
                        </div>
                      </div>
                      )}
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;