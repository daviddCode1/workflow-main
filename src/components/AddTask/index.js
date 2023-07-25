import React, { useState } from 'react';
import './AddTask.css';

import idGenerator from '../../utils/idGen.js';
const Index = ({ onTask, onCancel, subTask }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		let task2BCreated = null;
		// object stored if subtask is true 
		if (subTask) {
			task2BCreated = {
				id: idGenerator(),
				title: title,
				description: description,
				status: 'todo',
			};
		} else {
		// if not subtask - task created with following properties inclu subtasks array
			task2BCreated = {
				id: idGenerator(),
				title: title,
				description: description,
				status: 'todo',
				subTasks: [],
			};
		}

		onTask(task2BCreated);
	};
	return (
		<div className='add-task'>
			<h3 className='add-task__title'>
				{subTask ? 'Create Subtask' : 'Create Task'}
			</h3>
			<form
				action='/add-task'
				className='add-task__form'
				onSubmit={handleSubmit}
			>
				<div className='form-group'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						className='add-task__title'
						placeholder='Your task here'
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='title'>Description</label>
					<textarea
						type='text'
						className='add-task__description'
						placeholder='Your description here'
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				{/* <div className='form-group'>
					<label htmlFor='title'>Subtasks</label>
					<textarea
						type='text'
						className='add-task__description'
						placeholder='Your subtasks here'
					/>
				</div> */}
				<div className='add-task__actions'>
					<input
						type='submit'
						className='add-task__action add-task__action--submit'
						value='Submit'
					/>
					<input
						onClick={onCancel}
						type='button'
						className='add-task__action add-task__action--cancel'
						value='Cancel'
					/>
				</div>
			</form>
		</div>
	);
};

export default Index;
