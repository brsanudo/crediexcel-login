/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarSuper() {
  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {user ? (
                      <>
                        <NavLink
                          to="/"
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          }
                        >
                          CREDIEXCEL
                        </NavLink>
                        <button
                          onClick={handleClickLogout}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          Cerrar Sesion
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/login"
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          }
                        >
                          Iniciar Sesion
                        </NavLink>
                        <NavLink
                          key="Register"
                          to="/register"
                          className={({ isActive }) =>
                            isActive
                              ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          }
                        >
                          Registrate
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user ? (
                <>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    CREDIEXCEL
                  </NavLink>
                  <button
                    onClick={handleClickLogout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Cerrar Sesion
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    Iniciar Sesion
                  </NavLink>
                  <NavLink
                    key="Register"
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                  >
                    Registrate
                  </NavLink>
                </>
              )}
              {/* {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                        "block px-3 py-2 rounded-md text-base font-medium"
                                    )}
                                    aria-current={
                                        item.current ? "page" : undefined
                                    }
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))} */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
