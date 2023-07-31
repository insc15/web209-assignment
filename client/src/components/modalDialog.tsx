import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

function ModalDialog( {isOpen, setIsOpen, title, children = null } : { isOpen: boolean, setIsOpen: (isOpen : any)=>void, title: string, children?: ReactNode}) {
    isOpen = Boolean(isOpen);
    
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <Transition.Child as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px]" />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-white overflow-hidden">
                        <Dialog.Title className={'px-3 py-2 bg-primary text-white font-bold'}>{title}</Dialog.Title>
                        <div className={'py-2 px-3'}>
                            {children}
                        </div>
                    </Dialog.Panel>
                </div>
            </Transition.Child>
            </Dialog>
        </Transition>
    );
}

export default ModalDialog;