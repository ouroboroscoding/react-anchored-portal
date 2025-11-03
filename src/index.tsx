/**
 * Anchored Portal
 *
 * Given an anchor point and a position, shows the provided children in a
 * floating element.
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2025-11-02
 */

// Ouroboros modules
import Portal from '@ouroboros/react-portal';

// NPM modules
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

// Types
export type AnchoredPortalProps = {
	anchor: HTMLElement | null,
	onClose: () => void,
	position: 'bottom-center' | 'bottom-left' | 'bottom-right' |
				'left-bottom' | 'left-center' | 'left-top' |
				'right-bottom' | 'right-center' | 'right-top' |
				'top-left' | 'top-center' | 'top-right' | 'top-left'
}

/**
 * Anchored Portal
 *
 * @name AnchoredPortal
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function AnchoredPortal({
	anchor = null,
	children,
	onClose,
	position = 'bottom-left'
}: React.PropsWithChildren<AnchoredPortalProps>) {

	// State
	const [ style, styleSet ] = useState<false | React.CSSProperties>(false);

	// Refs
	const contentRef = useRef<null | HTMLDivElement>(null);
	const mouseClickRef = useRef<null | ((ev: MouseEvent) => void)>(null);

	// Parent and Position effect
	useEffect(() => {

		// If we have no anchor
		if(!anchor) {

			// Remove the event listener and refs
			document.removeEventListener('mousedown', mouseClickRef.current);
			mouseClickRef.current = null;
			contentRef.current = null;

			// Clear style
			styleSet(false);
			return;
		}

		// Track mouse clicks
		mouseClickRef.current = (ev: MouseEvent) => {

			// If we have no callback, do nothing
			if(!onClose) {
				return;
			}

			// If the click is not inside the content
			if(contentRef.current &&
				!contentRef.current.contains(ev.target as Node) &&
				!anchor.contains(ev.target as Node)) {

				// Notify the parent of the close attempt
				onClose();
			}
		}

		// Add the event listener
		document.addEventListener('mousedown', mouseClickRef.current);

		// Init new style
		const oStyle: React.CSSProperties = {
			position: 'absolute',
			zIndex: 1000
		};

		// Get the position / dimensions of the element
		const oRect = (anchor as HTMLElement).getBoundingClientRect();

		// Set the styles based on the position requested
		switch(position) {
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

	}, [ anchor, onClose, position ]);

	// If there's nothing
	if(!style) {
		return null;
	}

	// Render
	return (
		<Portal>
			<div style={style} ref={contentRef}>
				{children}
			</div>
		</Portal>
	);
}

// Valid props
AnchoredPortal.propTypes = {
	anchor: PropTypes.element,
	onClose: PropTypes.func,
	position: PropTypes.oneOf([
		'bottom-center', 'bottom-left', 'bottom-right',
		'left-bottom', 'left-center', 'left-top',
		'right-bottom', 'right-center', 'right-top',
		'top-left', 'top-center', 'top-right', 'top-left'
	])
}