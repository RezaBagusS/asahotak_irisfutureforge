import { StaticImageData } from "next/image";
import { ReactElement } from "react";

export interface CustInputProps {
    type: string;
    placeholder?: string;
    label?: string;
    value?: string;
}

export interface CustButtonProps {
    text: string;
    action?: string;
    disabled?: boolean;
}

export interface ListModuleProps {
    title?: string;
    icon?: ReactElement;
    link?: string;
    isActive?: boolean;
}