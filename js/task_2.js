const CATEGORY = "category";
const PRODUCT = "product";
const menu = [
  {
    type: CATEGORY,
    name: "Mac",
    menu: [
      {
        type: PRODUCT,
        name: "MacBook Pro 16”",
      },
      {
        type: PRODUCT,
        name: "iMac 24”",
      },
      {
        type: PRODUCT,
        name: "iMac 27”",
      },
      {
        type: CATEGORY,
        name: "Accessories",
        menu: [
          {
            type: CATEGORY,
            name: "Featured Magic",
            menu: [
              {
                type: PRODUCT,
                name: "Magic Keyboard",
              },
              {
                type: PRODUCT,
                name: "Magic Trackpad",
              },
            ],
          },
          {
            type: CATEGORY,
            name: "Audio",
            menu: [
              {
                type: PRODUCT,
                name: "AirPods Pro",
              },
              {
                type: PRODUCT,
                name: "AirPods Max",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: CATEGORY,
    name: "Ipad",
    menu: [
      {
        type: PRODUCT,
        name: "iPad Pro 11”",
      },
      {
        type: PRODUCT,
        name: "iPad Pro 12.9”",
      },
      {
        type: CATEGORY,
        name: "Accessories",
        menu: [
          {
            type: PRODUCT,
            name: "Apple Pencil",
          },
          {
            type: PRODUCT,
            name: "Smart Keyboard",
          },
        ],
      },
    ],
  },
  {
    type: CATEGORY,
    name: "Empty Category",
    menu: [],
  },
];

console.log('Задача №2. Меню');

const printMenu = (array, level = 0) => {
    
    if (array.length === 0) return; 
    
    let spaces = "";

    for (let index = 0; index < level; index++) {
        spaces = spaces + " ";
    }        
    
    array.forEach((element) => {
       console.log(`${spaces}${element.type === CATEGORY ? "*" : "-"} ${element.name}`);

        if (element.type === CATEGORY) {
            printMenu(element.menu, level + 1); 
        }    
    });
};

printMenu(menu);