import { cn } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronsUpDownIcon } from "lucide-react";
import React, { Fragment } from "react";

export const Select = Listbox;

// eslint-disable-next-line
interface SelectWrapper extends React.HTMLAttributes<HTMLDivElement> {}

export function SelectWrapper({
  children,
  className,
  ...props
}: SelectWrapper) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  );
}

interface SelectButtonProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}
export function SelectButton({ children, id, className }: SelectButtonProps) {
  return (
    <Listbox.Button
      id={id}
      className={cn(
        "relative w-full border h-9 border-neutral-200 dark:border-neutral-800 cursor-pointer text-sm font-medium rounded bg-white dark:bg-neutral-900 py-2 pl-3 pr-10 text-left",
        className
      )}
    >
      <span className="block truncate">{children}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronsUpDownIcon
          className="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </span>
    </Listbox.Button>
  );
}

export function SelectOptions({ children }: { children: React.ReactNode }) {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 shadow-lg rounded-md p-1.5 space-y-1 text-base focus:outline-none sm:text-sm border">
        {children}
      </Listbox.Options>
    </Transition>
  );
}

export function SelectOption({
  children,
  value,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}) {
  return (
    <Listbox.Option
      value={value}
      className={({ active }) =>
        `cursor-pointer m-0.5 truncate font-medium rounded-md ${
          active ? "dark:bg-neutral-800 bg-neutral-100" : ""
        }`
      }
    >
      {({ selected }) => (
        <>
          <span
            className={`block rounded pointer-events-none py-1.5 pl-3 pr-0.5  ${
              selected
                ? "bg-neutral-800 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900"
                : ""
            }`}
          >
            {children}
          </span>
        </>
      )}
    </Listbox.Option>
  );
}
