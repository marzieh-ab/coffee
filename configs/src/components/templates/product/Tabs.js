// "use client";
// import React from "react";
// import styles from "./tabs.module.css";
// import { useState } from "react";
// import Description from "./Description";
// import MoreInfoes from "./MoreInfoes";
// import Comments from "./Comments";
// const Tabs = ({product}) => {
//   const [tab, setTab] = useState("description");
//   return (
//     <div data-aos="fade-left" className={styles.tabs}>
//       <input
//         onClick={() => setTab("description")}
//         type="radio"
//         id="description"
//         name="tab-control"
//         checked={tab == "description" && "checked"}
//       />
//       <input
//         onClick={() => setTab("moreInfoes")}
//         type="radio"
//         id="moreInfoes"
//         name="tab-control"
//         checked={tab == "moreInfoes" && "checked"}
//       />
//       <input
//         onClick={() => setTab("comments")}
//         type="radio"
//         id="comments"
//         name="tab-control"
//         checked={tab == "comments" && "checked"}
//       />
//       <ul>
//         <li title="Features">
//           <label htmlFor="description" role="button">
//             {" "}
//             توضیحات{" "}
//           </label>
//         </li>
//         <li title="Delivery Contents">
//           <label htmlFor="moreInfoes" role="button">
//             {" "}
//             اطلاعات بیشتر{" "}
//           </label>
//         </li>
//         <li title="Shipping">
//           <label htmlFor="comments" role="button">
//             {" "}
//             نظرات ({product.comments.length}){" "}
//           </label>
//         </li>
//       </ul>

//       <div className={styles.contents}>
//         <section className={styles.tabs_content}>
//           <Description />
//         </section>
//         <section className={styles.tabs_content}>
//         <MoreInfoes product={JSON.parse(JSON.stringify(product))} />
//         </section>
//         <section className={styles.tabs_content}>
//           <Comments comments={JSON.parse(JSON.stringify(product.comments))} product={JSON.parse(JSON.stringify(product))}  />
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Tabs;

"use client";
import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";
const Tabs = ({ product }) => {
  const [tab, setTab] = useState("description");

  return (
    <>
      <div data-aos="fade-left" className={styles.tabs}>
        <ul>
          <li>
            <button
              className={tab === "description" ? styles.active_tab : ""}
              onClick={() => setTab("description")}
            >
              توضیحات
            </button>
          </li>
          <li>
            <button
              className={tab === "moreInfoes" ? styles.active_tab : ""}
              onClick={() => setTab("moreInfoes")}
            >
              اطلاعات بیشتر
            </button>
          </li>
          <li>
            <button
              className={tab === "comments" ? styles.active_tab : ""}
              onClick={() => setTab("comments")}
            >
              نظرات (
              {product.comments.filter((comment) => comment.isAccept).length})
            </button>
          </li>
        </ul>

        <div className={styles.contents}>
          <section>
            {tab === "description" && <Description />}
            {tab == "moreInfoes" && (
              <MoreInfoes product={JSON.parse(JSON.stringify(product))} />
            )}
            {tab == "comments" && (
              <Comments
                productID={product._id}
                product={JSON.parse(JSON.stringify(product))}
                comments={JSON.parse(JSON.stringify(product.comments))}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Tabs;

