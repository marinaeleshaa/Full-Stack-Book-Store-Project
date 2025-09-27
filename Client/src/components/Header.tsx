"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  // Popover,
  // PopoverButton,
  PopoverGroup,
  // PopoverPanel,
  // Tab,
  TabGroup,
  // TabList,
  // TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  // ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white/10 backdrop-blur-md border-r border-white/20 pb-12 shadow-2xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              {/* <div className="border-b border-white/20">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-white/90 data-[selected]:border-violet-400 data-[selected]:text-violet-300"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div> */}
              <TabPanels as={Fragment}>
                {/* {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-white/10 object-cover group-hover:opacity-75 border border-white/20"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block font-medium text-white group-hover:text-violet-300 transition-colors"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1 text-white/70">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))} */}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-white/20 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-white/20 px-4 py-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all"
                >
                  Sign in
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all"
                >
                  Create account
                </a>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="bg-transparent backdrop-blur-3xl shadow-xl relative border-b border-violet-300/20">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-indigo-500/5"></div>
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="flex h-16 items-center">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="relative rounded-md bg-white/10 backdrop-blur-sm p-2 text-gray-400 lg:hidden border border-violet-300/30 hover:border-violet-300/50 transition-all"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <a href="#" className="flex items-center space-x-2">
                <span className="sr-only">BookStore</span>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-400/20 to-indigo-400/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="hidden sm:block text-white font-bold text-xl">
                  BookStore
                </span>
              </a>
            </div>

            {/* Flyout menus */}
            <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    to={page.href}
                    className="flex items-center text-sm font-medium text-white/90 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </PopoverGroup>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  to="/signIn"
                  className="text-sm font-medium text-white/90 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                >
                  Sign in
                </Link>
                <span aria-hidden="true" className="h-6 w-px bg-white/20" />
                <Link
                  to="/signUp"
                  className="text-sm font-medium text-white/90 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-all"
                >
                  Create account
                </Link>
              </div>

              {/* Search */}
              <div className="flex lg:ml-6">
                {/* Mobile: icon only */}
                <button
                  type="button"
                  className="p-2 text-white/70 hover:text-white lg:hidden rounded-md hover:bg-white/10 transition-all"
                >
                  <span className="sr-only">Open search</span>
                  <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Desktop: input */}
                <div className="hidden lg:flex items-center">
                  <input
                    type="text"
                    placeholder="Search Book..."
                    className="w-64 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                  />
                </div>
              </div>

              {/* Cart */}
              {/* <div className="ml-4 flow-root lg:ml-6">
                <a
                  href="#"
                  className="group -m-2 flex items-center p-2 rounded-md hover:bg-white/10 transition-all"
                >
                  <ShoppingBagIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-white/70 group-hover:text-white transition-colors"
                  />
                  <span className="ml-2 text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    0
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </a>
              </div> */}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
