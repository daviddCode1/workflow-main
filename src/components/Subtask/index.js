import React from 'react';
import './Subtask.css';
const Index = ({ subTask, onToggle }) => {
	return (
		// subtask 3 statuses (backlog, in-progress, completed) 
		// subtasks status dynamically determine task status
		<li className='sub-task'>
			<span className='sub-task__title'>{subTask.title}</span>
			<div className='sub-task__status-container'>
				<input
					type='radio'
					name={`status-button-${subTask.id}`}
					id={`todo-${subTask.id}`}
					className='status-button'
					onChange={(e) => onToggle(subTask.id, 'todo')}
					checked={subTask.status === 'todo' ? true : false}
				/>
				<label
					htmlFor={`todo-${subTask.id}`}
					className='staus-button-label staus-button-label--todo'
				>
					Todo
				</label>
				<input
					type='radio'
					name={`status-button-${subTask.id}`}
					id={`in-progress-${subTask.id}`}
					className='status-button'
					onChange={(e) => onToggle(subTask.id, 'in-progress')}
					checked={subTask.status === 'in-progress' ? true : false}
				/>
				<label
					htmlFor={`in-progress-${subTask.id}`}
					className='staus-button-label staus-button-label--in-progress'
				>
					In Progress
				</label>
				<input
					type='radio'
					name={`status-button-${subTask.id}`}
					id={`completed-${subTask.id}`}
					className='status-button'
					onChange={(e) => onToggle(subTask.id, 'completed')}
					checked={subTask.status === 'completed' ? true : false}
				/>
				<label
					htmlFor={`completed-${subTask.id}`}
					className='staus-button-label staus-button-label--completed'
				>
					Completed
				</label>
			</div>
		</li>
	);
};

export default Index;
