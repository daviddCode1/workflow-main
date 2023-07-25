import React from 'react';
import './Modal.css';
const Index = ({ children, onCloseModal }) => {
	const handleStopClosing = (e) => {
		e.stopPropagation();
	};
	return (
		<div className='modal' onClick={onCloseModal}>
			<div className='modal__content' onClick={handleStopClosing}>
				{children}
			</div>
		</div>
	);
};

export default Index;
