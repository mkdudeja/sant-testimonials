import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { Outlet } from "react-router-dom";

const navigation = [{ name: "Feedbacks", href: "webadmin", current: true }];

const Webadmin: React.FC = () => {
  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <React.Fragment>
          <div className="mx-auto max-w-7xl px-2 lg:px-0">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </React.Fragment>
      </Disclosure>

      {/* Your content */}
      <Outlet />
    </div>
  );
};

export default Webadmin;
