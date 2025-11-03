/**
 * Drop Down
 *
 * Shows a drop down menu
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2024-02-20
 */
import PropTypes from 'prop-types';
import React from 'react';
export type DropDownProps = {
    onClose: () => void;
    parent: HTMLElement | null;
    position: 'bottom-center' | 'bottom-left' | 'bottom-right' | 'left-bottom' | 'left-center' | 'left-top' | 'right-bottom' | 'right-center' | 'right-top' | 'top-left' | 'top-center' | 'top-right' | 'top-left';
};
/**
 * Drop Down
 *
 * @name DropDown
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function DropDown({ children, onClose, parent, position }: React.PropsWithChildren<DropDownProps>): React.JSX.Element | null;
declare namespace DropDown {
    var propTypes: {
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        parent: PropTypes.Requireable<any>;
        position: PropTypes.Requireable<string>;
    };
}
export default DropDown;
