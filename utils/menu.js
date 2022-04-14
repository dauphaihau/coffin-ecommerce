export const MENU = {
  navbar: [
    {
      title: "Home",
      link: "/",
      id: 'dashboard',
    },
    // {
    //   title: "About",
    //   link: "/about",
    //   id: 'about',
    // },
    {
      title: "Products",
      link: "/products",
      id: 'products',
    },
    {
      title: "Categories",
      link: "/categories",
      id: 'categories',
      subNav: true,
    },
    {
      title: "News",
      link: "/news",
      id: 'news',
    },
    // {
    //   title: "Contact Us",
    //   link: "/contact",
    //   id: 'contact',
    // },
  ],

  admin: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: 'fa-solid fa-store',
    },
    {
      title: "Products",
      icon: 'fa-solid fa-diamond',
      // icon: 'fa-solid fa-coffin-cross',
      // icon: 'fa-solid fa-coffin',
      subLinks: [
        {
          title: "List Products",
          href: "/admin/products",
        },
        {
          title: "New Products",
          href: "/admin/products/new",
        },
      ],
    },
    {
      title: "Users",
      icon: 'fa-solid fa-user',
      subLinks: [
        {
          title: "List Users",
          href: "/admin/users",
        },
        {
          title: "New Users",
          href: "/admin/users/new",
        },
      ],
    },
    {
      title: "Posts",
      href: "/admin/posts",
      id: 'posts',
      icon: "fa-solid fa-clipboard"
    },
  ],
};