import * as console from "../shared/Logger";
import * as React from "react";
import { ButtonProps, PropsWithoutForwardedRef } from "../shared/NativeScriptComponentTypings";
import { Button as NativeScriptButton } from "tns-core-modules/ui/button/button";
import { TextBaseComponentProps, RCTTextBase, RNSFriendly } from "./TextBase";

export const RNSFriendlyButton = RNSFriendly(NativeScriptButton);

const elementKey: string = "button";
/* Registration is instead performed in elementRegistry to remove this side-effect from the module and hence aid tree-shaking */
// register(
//     elementKey,
//     (
//         props: Props,
//         rootContainerInstance: Container,
//         hostContext: HostContext,
//     ) => {
//         return new RNSFriendlyButton();
//     }
// );

interface Props {
    // onPress
}

export type ButtonComponentProps<
    E extends NativeScriptButton = NativeScriptButton
> = Props /* & typeof _Button.defaultProps */ & Partial<ButtonProps> & TextBaseComponentProps<E>;

/**
 * A React wrapper around the NativeScript Button component.
 * https://facebook.github.io/react-native/docs/button#color
 */
export class _Button<
    P extends ButtonComponentProps<E>,
    S extends {},
    E extends NativeScriptButton = NativeScriptButton
> extends RCTTextBase<P, S, E> {
    render() {
        const {
            forwardedRef,

            onLoaded,
            onUnloaded,
            onAndroidBackPressed,
            onShowingModally,
            onShownModally,

            onTap,
            onDoubleTap,
            onPinch,
            onPan,
            onSwipe,
            onRotation,
            onLongPress,
            onTouch,

            onPropertyChange,

            text,
            formattedText,
            children,
            ...rest
        } = this.props;

        if (text && formattedText) {
            console.warn(`Both text and formattedText provided; shall use formattedText.`);
        }

        const textContent = {
            [formattedText ? "formattedText" : "text"]: formattedText || text,
        };

        return React.createElement(
            elementKey,
            {
                className: "btn btn-primary btn-active", // NativeScript defaults from documentation
                ...rest,
                ...textContent,
                ref: forwardedRef || this.myRef,
            },
            children // Weird that a button may contain children, but what do I know.
        );
    }
}

type OwnPropsWithoutForwardedRef = PropsWithoutForwardedRef<ButtonComponentProps<NativeScriptButton>>;

export const Button: React.ComponentType<
    OwnPropsWithoutForwardedRef & React.ClassAttributes<NativeScriptButton>
> = React.forwardRef<NativeScriptButton, OwnPropsWithoutForwardedRef>(
    (props: React.PropsWithChildren<OwnPropsWithoutForwardedRef>, ref: React.RefObject<NativeScriptButton>) => {
        const { children, ...rest } = props;

        return React.createElement(
            _Button,
            {
                ...rest,
                forwardedRef: ref,
            },
            children
        );
    }
);
