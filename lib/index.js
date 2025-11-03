/**
 * Drop Down
 *
 * Shows a drop down menu
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-02-20
 */
// Ouroboros modules
import Portal from '@ouroboros/react-portal';
// NPM modules
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
/**
 * Drop Down
 *
 * @name DropDown
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function DropDown({ children, onClose, parent = null, position = 'bottom-left' }) {
    // State
    const [style, styleSet] = useState(false);
    // Refs
    const contentRef = useRef(null);
    // Parent and Position effect
    useEffect(() => {
        // If we have no parent
        if (!parent) {
            // Clear style
            styleSet(false);
            return;
        }
        // Init new style
        const oStyle = {
            position: 'absolute',
            zIndex: 1000
        };
        // Get the position / dimensions of the element
        const oRect = parent.getBoundingClientRect();
        // Set the styles based on the position requested
        switch (position) {
            case 'bottom-center':
                oStyle.top = oRect.bottom + 'px';
                oStyle.left = (oRect.right - (oRect.width / 2)) + 'px';
                oStyle.transform = 'translateX(-50%)';
                break;
            case 'bottom-left':
                oStyle.top = oRect.bottom + 'px';
                oStyle.left = oRect.left + 'px';
                break;
            case 'bottom-right':
                oStyle.left = oRect.right + 'px';
                oStyle.top = oRect.bottom + 'px';
                oStyle.transform = 'translateX(-100%)';
                break;
            case 'left-bottom':
                oStyle.left = oRect.left + 'px';
                oStyle.top = oRect.bottom + 'px';
                oStyle.transform = 'translateX(-100%) translateY(-100%)';
                break;
            case 'left-center':
                oStyle.left = oRect.left + 'px';
                oStyle.top = oRect.top + (oRect.height / 2) + 'px';
                oStyle.transform = 'translateX(-100%) translateY(-50%)';
                break;
            case 'left-top':
                oStyle.left = oRect.left + 'px';
                oStyle.top = oRect.top + 'px';
                oStyle.transform = 'translateX(-100%)';
                break;
            case 'right-bottom':
                oStyle.bottom = (window.innerHeight - oRect.bottom) + 'px';
                oStyle.left = oRect.right + 'px';
                break;
            case 'right-center':
                oStyle.left = oRect.right + 'px';
                oStyle.top = (oRect.bottom - (oRect.height / 2)) + 'px';
                oStyle.transform = 'translateY(-50%)';
                break;
            case 'right-top':
                oStyle.left = oRect.right + 'px';
                oStyle.top = oRect.top + 'px';
                break;
            case 'top-center':
                oStyle.bottom = (window.innerHeight - oRect.top) + 'px';
                oStyle.left = (oRect.right - (oRect.width / 2)) + 'px';
                oStyle.transform = 'translateX(-50%)';
                break;
            case 'top-right':
                oStyle.left = oRect.right + 'px';
                oStyle.top = oRect.top + 'px';
                oStyle.transform = 'translateX(-100%) translateY(-100%)';
                break;
            case 'top-left':
                oStyle.bottom = (window.innerHeight - oRect.top) + 'px';
                oStyle.left = oRect.left + 'px';
                break;
            // no default
        }
        // Set the style
        styleSet(oStyle);
    }, [parent, position]);
    // If there's nothing
    if (!style) {
        return null;
    }
    // Called whenever the portal is clicked
    const portalClick = (ev) => {
        // If we have no callback, do nothing
        if (!onClose) {
            return;
        }
        // If the click is not inside the content
        if (!contentRef.current?.contains(ev.target)) {
            // Notify the parent of the close attempt
            onClose();
        }
    };
    // Render
    return (React.createElement(Portal, { onClick: portalClick },
        React.createElement("div", { style: style, ref: contentRef }, children)));
}
// Valid props
DropDown.propTypes = {
    onClose: PropTypes.func,
    parent: PropTypes.any,
    position: PropTypes.oneOf([
        'bottom-center', 'bottom-left', 'bottom-right',
        'left-bottom', 'left-center', 'left-top',
        'right-bottom', 'right-center', 'right-top',
        'top-left', 'top-center', 'top-right', 'top-left'
    ])
};
