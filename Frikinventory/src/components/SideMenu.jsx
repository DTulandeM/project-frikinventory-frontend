import logo from "../images/Logo_Friki.svg";
import dashicon from "../images/SquaresFour.svg";
import storeicon from "../images/Storefront.svg";
import produicon from "../images/Cube.svg";
import caticon from "../images/GridFour.svg";
import suppliericon from "../images/Users.svg";
import billicon from "../images/Receipt.svg";
import ordericon from "../images/Receipt.svg";
import delivericon from "../images/Stack.svg";
import reporticon from "../images/Report.svg";
import helpicon from "../images/Question.svg";
import logouticon from "../images/SignOut.svg";

const menuData = [
  {
    category: "Discover",
    items: [
      { title: "Dashboard", icon: dashicon },
      { title: "Stores", icon: storeicon },
    ],
  },
  {
    category: "Inventory",
    items: [
      { title: "Products", icon: produicon },
      { title: "Category", icon: caticon },
      { title: "Suppliers", icon: suppliericon },
      { title: "Billing", icon: billicon },
      { title: "Orders", icon: ordericon },
      { title: "Delivery", icon: delivericon },
      { title: "Reports", icon: reporticon },
    ],
  },
  {
    category: "Settings",
    items: [
      { title: "Help", icon: helpicon },
      { title: "Logout", icon: logouticon },
    ],
  },
];

function SideMenu() {
  return (
    <>
      <section className="sideMenu">
        <nav className="nav">
          <img
            src={logo}
            alt="Logo de Friki Week."
            className="sideMenu__logo"
            id="header-logo"
          />
          <div>
            {menuData.map((category, index) => (
              <div key={index}>
                <div className="nav_title">{category.category}</div>
                <ul className="nav_menu">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="nav_item">
                      <img
                        className="nav_icon"
                        src={item.icon}
                        alt={item.title}
                      />
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </section>
    </>
  );
}

export default SideMenu;
