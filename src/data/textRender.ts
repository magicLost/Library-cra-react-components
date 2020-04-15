/* TEXT TO RENDER */
export type ParentElementType = "LIST" | "PARAGRAPH" | "H";
//LINK - react-router link, ANCHOR - a link
export type ChildElementType = "SPAN" | "ANCHOR" | "LINK" | "TEXT";

export type HType = "h1" | "h2" | "h3" | "h4" | "h5";

export type ChildElementOptions = {
  text?: string;
  href?: string;
  label?: string;
};

export type HeaderOptions = {
  hType: HType;
  text: string;
};

export type ChildElement = {
  type: ChildElementType;
  options: ChildElementOptions;
};

export type ParentElement = {
  type: ParentElementType;
  children?: ChildElement[];
  options?: HeaderOptions;
};

export const textToRenderExample: ParentElement[] = [
  {
    type: "H",
    options: { hType: "h3", text: "ПРОИЗВОДСТВО НАРУЖНОЙ РЕКЛАМЫ" },
  },
  {
    type: "PARAGRAPH",
    children: [
      {
        type: "TEXT",
        options: {
          text:
            "Компания Реклама-Маркет предлагает полный спектр услуг в области производства наружной рекламы, широкоформатной печати и плоттерной резки:",
        },
      },
    ],
  },

  {
    type: "LIST",
    children: [
      {
        type: "LINK",
        options: { href: "#", label: "Оформление вашего магазина" },
      },
      {
        type: "LINK",
        options: { href: "#", label: "Оклейка автомобилей рекламой" },
      },
      {
        type: "TEXT",
        options: {
          text: "Изготовление продукции для выставок и различных мероприятий",
        },
      },
      { type: "TEXT", options: { text: "Печать интерьерных наклеек" } },
      { type: "TEXT", options: { text: "Печать на холсте" } },
      {
        type: "LINK",
        options: { href: "#", label: "POS материалы и изделия из оргстекла" },
      },
    ],
  },

  {
    type: "H",
    options: { hType: "h3", text: "ОСНОВНЫЕ НАПРАВЛЕНИЯ НАШЕЙ РАБОТЫ" },
  },
  {
    type: "PARAGRAPH",
    children: [
      {
        type: "TEXT",
        options: { text: "Основной составляющей нашей продукции является " },
      },
      {
        type: "LINK",
        options: { href: "/large-print", label: "широкоформатная печать" },
      },
      { type: "TEXT", options: { text: " и " } },
      { type: "LINK", options: { href: "#", label: "плоттерная резка" } },
      {
        type: "TEXT",
        options: {
          text:
            ". Поэтому к вашим услугам готовы предложить изготовление наклеек, временных вывесок, наклеек на автомобиль, интерьерные наклейки, постеры, листовки, печать на холсте, наклейки на окна, таблички и многое многое другое.",
        },
      },
    ],
  },
];
