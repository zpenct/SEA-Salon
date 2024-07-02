import React from "react";
import ServiceItem from "../service/item";
import { Space, Flex } from "antd";

const items = [
  {
    title: "Haircuts and Styling",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio deserunt sed consequuntur eos, maiores suscipit accusantium labore magni ipsam dolorem",
    image: "/hair.png",
    backgroundGradient: "rgba(240,210,255,1)",
    path: "/services?type=HAIRCUTS_STYLING",
  },
  {
    title: "Manicure and Pedicure",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio deserunt sed consequuntur eos, maiores suscipit accusantium labore magni ipsam dolorem",
    image: "/pedicure.png",
    backgroundGradient: "rgba(227,160,2,1)",
    path: "/services?type=MANICURE_PEDIURE",
  },
  {
    title: "Facial Treatments",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio deserunt sed consequuntur eos, maiores suscipit accusantium labore magni ipsam dolorem",
    image: "/facial.png",
    backgroundGradient: "rgba(65,159,251,1)",
    path: "/services?type=FACIAL_TREATMENTS",
  },
];

const Services = () => {
  return (
    <section
      style={{
        background:
          "linear-gradient(335deg, rgba(231,227,255,1) 37%, rgba(255,255,255,1) 83%)",
        padding: "32px 0px",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "32px", fontSize: "32px" }}
      >
        Services
      </h2>
      <Flex
        justify="center"
        wrap
        gap={24}
        style={{ padding: "0 16px" }}
        className="flex-wrap"
      >
        {items.map((item, index) => (
          <ServiceItem key={item.title} {...item} index={index} />
        ))}
      </Flex>
    </section>
  );
};

export default Services;
