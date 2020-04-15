export interface MenuItem {
  title: string;
  href?: string;
  items?: MenuItem[];
}

export const exampleMainMenuItems: MenuItem[] = [
  {
    title: "Портфолио",
    href: "#",
  },
  {
    title: "О компании",
    href: "#",
  },
  {
    title: "Услуги",
    items: [
      { title: "Онлайн репетитор", href: "#" },
      { title: "Прокат авто", href: "#" },
      {
        title: "Прически из кос",
        items: [
          { title: "С начесом", href: "#" },
          { title: "Кубиком", href: "#" },
          { title: "Как у деда", href: "#" },
          { title: "Млесклантриатрика", href: "#" },
          { title: "Супом", href: "#" },
        ],
      },
      { title: "Шугаринг", href: "#" },
      { title: "Ремонт компьютеров", href: "#" },
      { title: "Вывоз мусора", href: "#" },
      { title: "Фотограф", href: "#" },
      { title: "Химчисмка", href: "#" },
      { title: "Лангустины", href: "#" },
    ],
  },
  {
    title: "Цены",
    href: "#",
  },
  {
    title: "Контакты",
    href: "#",
  },
];
